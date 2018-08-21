import { takeLatest, call } from 'redux-saga/effects';
import actionTypes from '../actions/actionTypes';
import config from './../../shared/config/';

export function* track(action) {
    try {
        /* gtag('event', 'submit', {
            event_category: 'lead',
            event_label: 'email',
        }); */
        if (config.google.trackingEnabled) {
            // eslint-disable-next-line
            yield call(gtag, 'event', action.payload.params.action, {
                event_category: action.payload.params.category,
                event_label: action.payload.params.label,
            });
        }
    } catch (error) {
        // console.log(error);
    }
}

export default function* googleAnalyticsSagas() {
    yield [takeLatest(actionTypes.TRACK_EVENT, track)];
}
