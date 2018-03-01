import { takeLatest, call, put } from 'redux-saga/effects';
import actionTypes from './../actions/actionTypes';
import GeocoderWrapper from './../services/GeocoderWrapper';

export function* reverseGeocoding(action) {
    try {
        const { payload: { position: { latitude, longitude } } } = action;
        const geocode = new GeocoderWrapper(google); // eslint-disable-line
        yield put({ type: actionTypes.GEOCODING_STARTED });
        const address = yield call([geocode, geocode.getAddressByCoords], {
            lat: latitude,
            lng: longitude,
        });
        yield put({ type: actionTypes.GEOCODING_SUCCEDED, payload: { address } });
    } catch (error) {
        yield put({ type: actionTypes.GEOCODING_FAILED });
    }
}

export default function* geocodingSagas() {
    yield takeLatest(actionTypes.NEW_MARKER_DROPPED, reverseGeocoding);
}
