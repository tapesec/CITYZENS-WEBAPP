import { takeLatest, call, put, select } from 'redux-saga/effects';
import actionTypes from './../actions/actionTypes';
import actions from './../actions';
import cityzensApi from './../../shared/services/CityzensApi';
import { hotspotEdition } from './../../shared/reducers/edition';
import { getCityId, getCityName } from './../../shared/reducers/city';
import WallHotspotPayload from './../services/payloads/WallHotspotPayload';
import EventHotspotPayload from '../services/payloads/EventHotspotPayload';
import selectors from './../selectors';
import { getCityzenAccessToken } from './../../shared/reducers/authenticatedCityzen';
import { SNACKBAR } from './../wording';
import { NOTIFICATION_MESSAGE } from './../constants';
import sharedConstants from './../../shared/constants';
import { persistMessage, fetchMessages } from './messagesSagas';

const { HOTSPOT, EDITION_MODE: { SETTING_UP } } = sharedConstants;

export function* fetchHotspots(action) {
    if (action && action.payload && action.payload.cityId) {
        const params = {
            insee: action.payload.cityId,
        };
        try {
            const accessToken = yield select(getCityzenAccessToken);
            const response = yield call(
                [cityzensApi, cityzensApi.getHotspots],
                accessToken,
                params,
            );
            const hotspots = yield response.json();
            yield put(actions.fetchHotspotsByCitySuccess(hotspots));
        } catch (err) {
            yield put(actions.fetchHotspotsByCityError());
        }
    }
}

export function* fetchHotspot(action) {
    try {
        let hotspotId;
        let hotspot;
        if (action && action.payload && action.payload.slug) {
            hotspot = yield select(selectors.getHotspotBySlug, action.payload.slug);
            hotspotId = hotspot.id;
        }
        if (action && action.payload && action.payload.hotspotId) {
            // eslint-disable-next-line
            hotspotId = action.payload.hotspotId;
        }
        const accessToken = yield select(getCityzenAccessToken);
        const response = yield call([cityzensApi, cityzensApi.getHotspot], accessToken, hotspotId);
        const syncedHotspot = yield response.json();
        yield put(actions.fetchHotspotSucceded(syncedHotspot));
        if (hotspot.type === HOTSPOT.TYPE.WALL_MESSAGE) {
            yield call(fetchMessages, { payload: { hotspotId } });
        }
    } catch (err) {
        let errorPayload;
        if (err.message) errorPayload = err.message;
        yield put(actions.fetchHotspotFailed(errorPayload));
    }
}

export function* buildPayload(edition) {
    try {
        const cityId = yield select(getCityId);
        const cityName = yield select(getCityName);
        let hotspotPayload;
        if (edition.type === HOTSPOT.TYPE.WALL_MESSAGE) {
            hotspotPayload = yield new WallHotspotPayload();
        }
        if (edition.type === HOTSPOT.TYPE.EVENT) {
            hotspotPayload = yield new EventHotspotPayload();
            hotspotPayload.description = edition.description;
            hotspotPayload.dateEnd = edition.dateEnd;
        }
        hotspotPayload.type = edition.type;
        hotspotPayload.cityId = cityId;
        hotspotPayload.title = edition.title;
        hotspotPayload.scope = edition.scope;
        hotspotPayload.position = edition.position;
        hotspotPayload.address = { name: edition.address, city: cityName };
        hotspotPayload.iconType = edition.iconType;
        hotspotPayload.valid();
        return hotspotPayload.payload;
    } catch (error) {
        throw new Error('invalid Hotspot payload');
    }
}

export function* persistWallHotspot(edition, accessToken) {
    const hotspotPayload = yield call(buildPayload, edition);
    const response = yield call(
        [cityzensApi, cityzensApi.postHotspots],
        accessToken,
        JSON.stringify(hotspotPayload),
    );
    const newHotspot = yield response.json();
    const persistMessageParams = {
        payload: {
            settingUpMode: SETTING_UP,
            hotspotId: newHotspot.id,
            title: edition.messageTitle,
            body: edition.messageBody,
        },
    };
    yield call(persistMessage, persistMessageParams);
    return newHotspot;
}

export function* persistEventHotspot(edition, accessToken) {
    const hotspotPayload = yield call(buildPayload, edition);
    const response = yield call(
        [cityzensApi, cityzensApi.postHotspots],
        accessToken,
        JSON.stringify(hotspotPayload),
    );
    const newHotspot = yield response.json();
    return newHotspot;
}

export function* persistHotspot() {
    let newHotspot;
    try {
        const edition = yield select(hotspotEdition.getCurrentHotspotEdition);
        const accessToken = yield select(getCityzenAccessToken);

        if (edition.type === HOTSPOT.TYPE.WALL_MESSAGE) {
            newHotspot = yield call(persistWallHotspot, edition, accessToken);
        }
        if (edition.type === HOTSPOT.TYPE.EVENT) {
            newHotspot = yield call(persistEventHotspot, edition, accessToken);
        }
        yield put({
            type: actionTypes.NEW_HOTSPOT_SAVED,
            payload: { hotspot: newHotspot },
        });
        yield put(actions.clearHotspotEdition());
        yield put(
            actions.displayMessageToScreen(
                SNACKBAR.INFO.HOTSPOT_SAVED_SUCCESSFULLY,
                NOTIFICATION_MESSAGE.LEVEL.INFO,
            ),
        );
    } catch (err) {
        yield put(actions.clearHotspotEdition());
        yield put(
            actions.displayMessageToScreen(
                SNACKBAR.ERROR.SAVING_HOTSPOT_FAILED,
                NOTIFICATION_MESSAGE.LEVEL.ERROR,
            ),
        );
    }
}

export default function* hotspotsSagas() {
    yield [
        takeLatest(actionTypes.FETCH_HOTSPOTS_BY_CITY, fetchHotspots),
        takeLatest(actionTypes.OPEN_HOTSPOT_IN_SPA_MODAL, fetchHotspot),
        takeLatest(actionTypes.OPEN_HOTSPOT_IN_UNIVERSAL_MODAL, fetchHotspot),
        takeLatest(actionTypes.POST_SETTING_UP_HOTSPOT_FORM_DATA, persistHotspot),
    ];
}
