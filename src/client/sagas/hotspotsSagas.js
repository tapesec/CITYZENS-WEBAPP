import { takeLatest, take, call, put } from 'redux-saga/effects';
import actionTypes from './../actions/actionTypes';

export function* fetchHotspots() {
    
}

export default function* algoliaSearchSagas() {
    yield [takeLatest(actionTypes.LEFT_SIDE_MENU_DID_MOUNT, fetchHotspots)];
}
