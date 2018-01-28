import { takeLatest, call, put, select } from 'redux-saga/effects';
import actionTypes from './../actions/actionTypes';
import actions from './../actions';
import cityzensApi from './../../shared/services/CityzensApi';
import selectors from './../selectors';

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

export function* fetchMessages(action) {
    if (action && action.payload && action.payload.slug) {
        try {
            const hotspot = yield select(selectors.getHotspotBySlug, action.payload.slug);
            const response = yield call([cityzensApi, cityzensApi.getMessages], hotspot.id);
            const syncedHotspot = yield response.json();
            yield put(actions.fetchMessagesSucceded(syncedHotspot));
        } catch (err) {
            let errorPayload;
            if (err.message) errorPayload = err.message;
            yield put(actions.fetchMessagesFailed(errorPayload));
        }
    }
}

export default function* messagesSagas() {
    yield [
        takeLatest(actionTypes.OPEN_HOTSPOT, fetchMessages),
    ];
}
