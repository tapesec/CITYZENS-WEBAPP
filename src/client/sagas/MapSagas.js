import { takeLatest, select, put } from 'redux-saga/effects';
import { getHotspotById } from '../../shared/reducers/hotspots';
import actionTypes from './../actions/actionTypes';
import actions from './../actions';

export function* focusMapToHotspotPosition(action) {
    const hotspot = yield select(getHotspotById, action.payload.hotspotId);
    if (hotspot)
        yield put(
            actions.centerMapToPosition(hotspot.position.latitude, hotspot.position.longitude),
        );
}

export default function* mapSagas() {
    yield [takeLatest(actionTypes.FOCUS_HOTSPOT_IN_SEARCH_LIST, focusMapToHotspotPosition)];
}
