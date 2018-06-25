import { takeLatest, call, put, select } from 'redux-saga/effects';
import actionTypes from './../actions/actionTypes';
import actions from './../actions';
import cityzensApi from './../../shared/services/CityzensApi';
import { hotspotEdition } from './../../shared/reducers/edition';
import { getCityId, getCityName } from './../../shared/reducers/city';
import MediaHotspotPayload from './../services/payloads/WallHotspotPayload';
import AlertHotspotPayload from '../services/payloads/AlertHotspotPayload';
import { getCityzenAccessToken } from './../../shared/reducers/authenticatedCityzen';
import { getVisitorPosition } from '../../shared/reducers/visitor';
import { SNACKBAR } from './../wording';
import { NOTIFICATION_MESSAGE } from './../constants';
import sharedConstants from './../../shared/constants';
import { persistMessage, fetchMessages } from './messagesSagas';
import { reverseGeocoding } from './geolocalisationSagas';

const {
    HOTSPOT,
    EDITION_MODE: { SETTING_UP },
} = sharedConstants;

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
        if (action && action.payload && action.payload.slug) {
            hotspotId = action.payload.slug;
        }
        if (action && action.payload && action.payload.hotspotId) {
            // eslint-disable-next-line
            hotspotId = action.payload.hotspotId;
        }
        const accessToken = yield select(getCityzenAccessToken);
        const response = yield call([cityzensApi, cityzensApi.getHotspot], accessToken, hotspotId);
        const syncedHotspot = yield response.json();
        yield put(actions.fetchHotspotSucceded(syncedHotspot));
        if (syncedHotspot.type === HOTSPOT.TYPE.MEDIA) {
            yield call(fetchMessages, { payload: { hotspotId: syncedHotspot.id } });
        }
    } catch (err) {
        let errorPayload;
        if (err.message) errorPayload = err.message;
        yield put(actions.fetchHotspotFailed(errorPayload));
    }
}

export function* buildMediaHotspotPayload(edition) {
    try {
        const cityId = yield select(getCityId);
        const cityName = yield select(getCityName);
        const hotspotPayload = yield new MediaHotspotPayload();
        hotspotPayload.type = edition.type;
        hotspotPayload.cityId = cityId;
        hotspotPayload.title = edition.title;
        hotspotPayload.scope = edition.scope;
        hotspotPayload.position = edition.position;
        hotspotPayload.address = { name: edition.address, city: cityName };
        hotspotPayload.avatarIconUrl = edition.avatarIconUrl;
        hotspotPayload.valid();
        return hotspotPayload.payload;
    } catch (error) {
        throw new Error(error.message);
    }
}

export function* buildAlertHotspotPayload(edition) {
    try {
        const cityId = yield select(getCityId);
        const cityName = yield select(getCityName);
        const hotspotPayload = yield new AlertHotspotPayload();
        hotspotPayload.type = edition.type;
        hotspotPayload.cityId = cityId;
        hotspotPayload.position = edition.position;
        hotspotPayload.address = { name: edition.address, city: cityName };
        hotspotPayload.message = edition.messageBody;
        hotspotPayload.pictureDescription = edition.alertHotspotImgLocation;
        hotspotPayload.valid();
        return hotspotPayload.payload;
    } catch (error) {
        throw new Error(error.message);
    }
}

export function* persistMediaHotspot(edition, accessToken) {
    const hotspotPayload = yield call(buildMediaHotspotPayload, edition);
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

export function* persistAlertHotspot(edition, accessToken) {
    const hotspotPayload = yield call(buildAlertHotspotPayload, edition);
    const response = yield call(
        [cityzensApi, cityzensApi.postHotspots],
        accessToken,
        JSON.stringify(hotspotPayload),
    );
    const newHotspot = yield response.json();
    return newHotspot;
}

export function* persistHotspot(action) {
    let newHotspot;

    try {
        const { settingUpMode } = action.payload;
        const edition = yield select(hotspotEdition.getCurrentHotspotEdition);
        const accessToken = yield select(getCityzenAccessToken);

        if (edition.type === HOTSPOT.TYPE.MEDIA) {
            newHotspot = yield call(persistMediaHotspot, edition, accessToken);
        }
        if (edition.type === HOTSPOT.TYPE.ALERT) {
            newHotspot = yield call(persistAlertHotspot, edition, accessToken);
        }
        yield put({
            type: actionTypes.NEW_HOTSPOT_SAVED,
            payload: { hotspot: newHotspot },
        });
        yield put(actions.clearHotspotEdition());
        yield put(
            actions.displayMessageToScreen(
                settingUpMode === SETTING_UP
                    ? SNACKBAR.INFO.HOTSPOT_SAVED_SUCCESSFULLY
                    : SNACKBAR.INFO.HOTSPOT_UPDATED_SUCCESSFULLY,
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

export function* postViewUp(action) {
    try {
        const accessToken = yield select(getCityzenAccessToken);
        const { hotspotId } = action.payload;
        yield call([cityzensApi, cityzensApi.postHotspotsViews], accessToken, hotspotId);
    } catch (error) {
        console.log(error); // eslint-disable-line
    }
}

export function* postAlertExist(action) {
    const { poll, hotspotId } = action.payload;
    try {
        const accessToken = yield select(getCityzenAccessToken);
        const response = yield call(
            [cityzensApi, cityzensApi.postPertinence],
            accessToken,
            hotspotId,
            JSON.stringify({ agree: poll }),
        );
        const updatedHotspot = yield response.json();
        yield put({
            type: actionTypes.NEW_HOTSPOT_SAVED,
            payload: { hotspot: updatedHotspot },
        });
        yield put(
            actions.displayMessageToScreen(
                SNACKBAR.INFO.ALERT_POLL_RECEIVED,
                NOTIFICATION_MESSAGE.LEVEL.INFO,
            ),
        );
    } catch (error) {
        yield put(
            actions.displayMessageToScreen(
                SNACKBAR.ERROR.ALERT_POLL_FAILED,
                NOTIFICATION_MESSAGE.LEVEL.ERROR,
            ),
        );
    }
}

function* uploadHotspotAvatarIcon(action) {
    const { hotspotId, avatarIconUrl } = action.payload;
    try {
        const accessToken = yield select(getCityzenAccessToken);
        const response = yield call(
            [cityzensApi, cityzensApi.patchHotspots],
            accessToken,
            JSON.stringify({ avatarIconUrl }),
            hotspotId,
        );
        const updatedHotspot = yield response.json();
        yield put({
            type: actionTypes.NEW_HOTSPOT_SAVED,
            payload: { hotspot: updatedHotspot },
        });
        yield put(
            actions.displayMessageToScreen(
                SNACKBAR.INFO.HOTSPOT_UPDATED_SUCCESSFULLY,
                NOTIFICATION_MESSAGE.LEVEL.INFO,
            ),
        );
    } catch (error) {
        yield put(
            actions.displayMessageToScreen(
                SNACKBAR.ERROR.UPDATING_HOTSPOT_FAILED,
                NOTIFICATION_MESSAGE.LEVEL.ERROR,
            ),
        );
    }
}

function* uploadAlertHotspotImg(action) {
    const { hotspotId, imgUrl } = action.payload;
    try {
        const accessToken = yield select(getCityzenAccessToken);
        const response = yield call(
            [cityzensApi, cityzensApi.patchHotspots],
            accessToken,
            JSON.stringify({ alertHotspotImgLocation: imgUrl }),
            hotspotId,
        );
        const updatedHotspot = yield response.json();
        yield put({
            type: actionTypes.NEW_HOTSPOT_SAVED,
            payload: { hotspot: updatedHotspot },
        });
        yield put(
            actions.displayMessageToScreen(
                SNACKBAR.INFO.ALERT_HOTSPOT_IMG_UPDATED_SUCCESSFULLY,
                NOTIFICATION_MESSAGE.LEVEL.INFO,
            ),
        );
    } catch (error) {
        yield put(
            actions.displayMessageToScreen(
                SNACKBAR.ERROR.UPDATING_HOTSPOT_FAILED,
                NOTIFICATION_MESSAGE.LEVEL.ERROR,
            ),
        );
    }
}

export function* initHotspotCreationFromMyPosition() {
    const position = yield select(getVisitorPosition);
    if (position.timestamp) {
        yield call(reverseGeocoding, { payload: { position: position.coords } });
        yield put({ type: actionTypes.SET_POSITION_TO_EDITED_HOTSPOT, payload: { position } });
        yield put(actions.openSettingUpHotspotModal());
    }
}

export default function* hotspotsSagas() {
    yield [
        takeLatest(actionTypes.FETCH_HOTSPOTS_BY_CITY, fetchHotspots),
        takeLatest(actionTypes.OPEN_HOTSPOT_IN_SPA_MODAL, fetchHotspot),
        takeLatest(actionTypes.OPEN_HOTSPOT_IN_UNIVERSAL_MODAL, fetchHotspot),
        takeLatest(actionTypes.POST_SETTING_UP_HOTSPOT_FORM_DATA, persistHotspot),
        takeLatest(actionTypes.HOTSPOT_VIEW_UP, postViewUp),
        takeLatest(actionTypes.ALERT_STILL_EXIST, postAlertExist),
        takeLatest(actionTypes.HOTSPOT_AVATAR_UPLOADED, uploadHotspotAvatarIcon),
        takeLatest(actionTypes.ALERT_HOTSPOT_IMAGE_UPLOADED, uploadAlertHotspotImg),
        takeLatest(actionTypes.INIT_HOTSPOT_FROM_MY_POSITION, initHotspotCreationFromMyPosition),
    ];
}
