import { takeLatest, take, call, put } from 'redux-saga/effects';
import actionTypes from './../actions/actionTypes';
import actions from './../actions';
import cityzensApi from './../../shared/services/CityzensApi';

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

export default function* hotspotsSagas() {
    yield [takeLatest(actionTypes.FETCH_HOTSPOTS_BY_CITY, fetchHotspots)];
}
