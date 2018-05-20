import { takeLatest, call, put, select } from 'redux-saga/effects';
import { getCity } from '../../shared/reducers/city';
import actionTypes from './../actions/actionTypes';
import GeocoderWrapper from './../services/GeocoderWrapper';
import actions from '../actions';

export function* reverseGeocoding(action) {
    try {
        const {
            payload: {
                position: { latitude, longitude },
            },
        } = action;
        const geocode = new GeocoderWrapper(google); // eslint-disable-line
        yield put({ type: actionTypes.REVERSED_GEOCODING_STARTED });
        const result = yield call([geocode, geocode.getAddressByCoords], {
            lat: latitude,
            lng: longitude,
        });
        const address = `${result.address_components[0].long_name} ${
            result.address_components[1].long_name
        }`;
        yield put({ type: actionTypes.REVERSED_GEOCODING_SUCCEDED, payload: { address } });
    } catch (error) {
        yield put({ type: actionTypes.REVERSED_GEOCODING_FAILED });
    }
}

export function* geocoding(action) {
    try {
        const city = yield select(getCity);
        const { address } = action.payload;
        const geocode = new GeocoderWrapper(google); // eslint-disable-line
        const result = yield call([geocode, geocode.getCoordsByAddress], address, city.postalCode);
        const position = {
            latitude: result.geometry.location.lat(),
            longitude: result.geometry.location.lng(),
        };
        yield put({ type: actionTypes.GEOCODING_SUCCEDED, payload: { position } });
        yield put(actions.closeHotspotAddressModal());
        yield put(actions.submitHotspotAddressModal(action.payload));
        yield put(actions.openSettingUpHotspotModal());
    } catch (error) {
        yield put({ type: actionTypes.GEOCODING_FAILED });
    }
}

export default function* geocodingSagas() {
    yield takeLatest(actionTypes.NEW_MARKER_DROPPED, reverseGeocoding);
    yield takeLatest(actionTypes.GEOCODING_STARTED, geocoding);
}
