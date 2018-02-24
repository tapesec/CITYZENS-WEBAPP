import { takeLatest, call, put } from 'redux-saga/effects';
import GoogleMapsLoader from 'google-maps';
import config from './../../shared/config';
import actionTypes from './../actions/actionTypes';
import GeocoderWrapper from './../services/GeocoderWrapper';

GoogleMapsLoader.KEY = config.google.mapApiKey;
GoogleMapsLoader.LANGUAGE = 'fr';
GoogleMapsLoader.LIBRARIES = ['geocoder'];

const geocoderAsyncLoader = () =>
    new Promise(resolve => {
        GoogleMapsLoader.load(google => {
            const geocode = new GeocoderWrapper(google);
            resolve(geocode);
        });
    });

export function* reverseGeocoding(action) {
    try {
        const { payload } = action;
        const geocode = yield call(geocoderAsyncLoader);
        yield put({ type: actionTypes.GEOCODING_STARTED });
        const address = yield call([geocode, geocode.getAddressByCoords], payload);
        yield put({ type: actionTypes.GEOCODING_SUCCEDED, payload: { address } });
    } catch (error) {
        yield put({ type: actionTypes.GEOCODING_FAILED });
    }
}

export default function* geocodingSagas() {
    yield takeLatest(actionTypes.NEW_MARKER_DROPPED, reverseGeocoding);
}
