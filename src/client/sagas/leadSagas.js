import { takeLatest, call } from 'redux-saga/effects';
import actionTypes from '../actions/actionTypes';
import fetch from './../../shared/services/FetchWrapper';

export function* submitLead(action) {
    try {
        yield call([fetch, fetch.request], '/lead', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: action.payload.email }),
        });
    } catch (error) {
        // console.log(error);
    }
}

export default function* leadSagas() {
    yield [takeLatest(actionTypes.SUBMIT_LEAD, submitLead)];
}
