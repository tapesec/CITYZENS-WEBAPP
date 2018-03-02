import { takeLatest, call, put, select } from 'redux-saga/effects';
import actionTypes from './../actions/actionTypes';
import actions from './../actions';
import cityzensApi from './../../shared/services/CityzensApi';
import { hotspotEdition } from './../../shared/reducers/edition';
import { getCityId, getCityName } from './../../shared/reducers/city';
import WallHotspotPayload from './../services/payloads/WallHotspotPayload';
import selectors from './../selectors';
import { getCityzenAccessToken } from './../../shared/reducers/authenticatedCityzen';

export function* fetchHotspots(action) {
    if (action && action.payload && action.payload.cityId) {
        const params = {
            insee: action.payload.cityId,
        };
        try {
            const response = yield call([cityzensApi, cityzensApi.getPublicHotspots], params);
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
            const hotspot = yield select(selectors.getHotspotBySlug, action.payload.slug);
            hotspotId = hotspot.id;
        }
        if (action && action.payload && action.payload.hotspotId) {
            // eslint-disable-next-line
            hotspotId = action.payload.hotspotId;
        }
        const response = yield call([cityzensApi, cityzensApi.getPublicHotspot], hotspotId);
        const syncedHotspot = yield response.json();
        yield put(actions.fetchHotspotSucceded(syncedHotspot));
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
        const payload = yield new WallHotspotPayload();
        payload.type = edition.type;
        payload.cityId = cityId;
        payload.title = edition.title;
        payload.scope = edition.scope;
        payload.position = edition.position;
        payload.address = { name: edition.address, city: cityName };
        payload.iconType = edition.iconType;
        payload.valid();
        return payload;
    } catch (error) {
        throw new Error('invalid payload');
    }
}

export function* persistHotspot(action) {
    try {
        const edition = yield select(hotspotEdition.getCurrentHotspotEdition);
        const payload = yield call(buildPayload, edition);
        const accessToken = yield select(getCityzenAccessToken);
        const response = yield call([cityzensApi, cityzensApi.postHotspots], accessToken, JSON.stringify(payload));
        const newHotspot = yield response.json();
        yield console.log(newHotspot, 'new hotspot', action); // eslint-disable-line
        yield put(actions.clearHotspotEdition());
    } catch (err) {
        // TODO
        console.log(err.message); // eslint-disable-line
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
