import { takeLatest, call } from 'redux-saga/effects';
import actionTypes from '../actions/actionTypes';

export function* track(action) {
    try {
        /* gtag('event', 'submit', {
            event_category: 'lead',
            event_label: 'email',
        }); */
        // eslint-disable-next-line
        yield call(gtag, 'event', action.payload.params.action, {
            event_category: action.payload.params.category,
            event_label: action.payload.params.label,
        });
    } catch (error) {
        // console.log(error);
    }
}

export default function* analytics() {
    yield [takeLatest(actionTypes.TRACK_EVENT, track)];
}
