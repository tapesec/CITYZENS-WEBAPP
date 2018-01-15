import { takeLatest, take, call, put } from 'redux-saga/effects';
import actionTypes from './../actions/actionTypes';
import actions from './../actions';
import cityzensApi from './../../shared/services/CityzensApi';

export function* fetchHotspots(action) {
    if (action && action.payload && action.payload.lat && action.payload.lng) {
        try {
            const response = yield call([cityzensApi, cityzensApi.getPublicHotspots]);
            const hotspots = yield response.json();
            yield put(actions.fetchHotspotsInAreaSuccess(hotspots));
        } catch (err) {}
    }
}

export default function* hotspotsSagas() {
    yield [takeLatest(actionTypes.FETCH_HOTSPOTS_IN_AREA, fetchHotspots)];
}
