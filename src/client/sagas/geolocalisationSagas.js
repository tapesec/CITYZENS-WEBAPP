import { takeLatest, call, put, select, fork, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { getCity } from '../../shared/reducers/city';
// import { getVisitorPosition } from '../../shared/reducers/visitor';
import actionTypes from './../actions/actionTypes';
import GeocoderWrapper from './../services/GeocoderWrapper';
import actions from '../actions';

const REDUX_SAGA_LOCATION_ACTION_REQUEST = 'REDUX_SAGA_LOCATION_ACTION_REQUEST';

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

export function* watchCurrentPosition() {
    yield put({ type: REDUX_SAGA_LOCATION_ACTION_REQUEST });
    const channel = eventChannel(emitter => {
        // eslint-disable-next-line no-undef
        const watchID = window.navigator.geolocation.watchPosition(
            position => {
                // eslint-disable-next-line no-console
                console.log(position, 'position --->');
                emitter({
                    coords: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    },
                    timestamp: position.timestamp,
                });
            },
            error => {
                // eslint-disable-next-line no-console
                console.log(error, 'error ------>');
                emitter(error);
            },
            { maximumAge: 30000, timeout: 27000 /* , enableHighAccuracy: true */ },
        );

        return () => {
            // eslint-disable-next-line no-undef
            window.navigator.geolocation.clearWatch(watchID);
        };
    });
    while (true) {
        const position = yield take(channel);
        if (position.coords && position.coords.latitude) {
            yield put({
                type: actionTypes.SET_GPS_POSITION,
                payload: {
                    coords: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    },
                    timestamp: position.timestamp,
                },
            });
        }
    }
}

export default function* geocodingSagas() {
    yield takeLatest(actionTypes.NEW_MARKER_DROPPED, reverseGeocoding);
    yield takeLatest(actionTypes.GEOCODING_STARTED, geocoding);
    // yield takeLatest(actionTypes.INIT_HOTSPOT_FROM_MY_POSITION, geolocalizeHotspot);
    yield fork(watchCurrentPosition);
}
