import { takeLatest, take, call, put } from 'redux-saga/effects';
import actionTypes from './../actions/actionTypes';
import actions from './../actions';
import cityzensApi from './../../shared/services/CityzensApi';

export function* fetchHotspots(action) {
    let params;
    if (action && action.payload && action.payload.north) {
        params = {
            north: action.payload.north,
            west: action.payload.west,
            south: action.payload.south,
            east: action.payload.east,
        };
    }
    try {
        const response = yield call([cityzensApi, cityzensApi.getPublicHotspots, params]);
        const hotspots = yield response.json();
        yield put(actions.fetchHotspotsInAreaSuccess(hotspots));
    } catch (err) {
        yield put(actions.fetchHotspotsInAreaError());
    }
}

export default function* hotspotsSagas() {
    yield [takeLatest(actionTypes.FETCH_HOTSPOTS_IN_AREA, fetchHotspots)];
}
