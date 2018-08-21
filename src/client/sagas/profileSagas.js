import { takeLatest, call, select, put } from 'redux-saga/effects';
import { SNACKBAR } from '../wording';
import { NOTIFICATION_MESSAGE } from '../constants';
import actionTypes from '../actions/actionTypes';
import cityzensApi from './../../shared/services/CityzensApi';
import { getCityzenAccessToken } from './../../shared/reducers/authenticatedCityzen';
import actions from '../../client/actions';

export function* updateProfile(action) {
    try {
        const accessToken = yield select(getCityzenAccessToken);
        const { payload } = action;
        const response = yield call(
            [cityzensApi, cityzensApi.patchCityzen],
            accessToken,
            payload.userId,
            JSON.stringify(payload.formValues),
        );
        const updatedCityzenFromApi = yield response.json();
        yield put({
            type: actionTypes.CITYZEN_FROM_API_UPDATED,
            payload: { updatedCityzenFromApi },
        });
        yield put(
            actions.displayMessageToScreen(
                SNACKBAR.INFO.UPDATE_SUCCESS,
                NOTIFICATION_MESSAGE.LEVEL.INFO,
            ),
        );
    } catch (error) {
        yield put(
            actions.displayMessageToScreen(
                SNACKBAR.ERROR.GENERIC_FAIL,
                NOTIFICATION_MESSAGE.LEVEL.ERROR,
            ),
        );
    }
}

export default function* profileSagas() {
    yield [takeLatest(actionTypes.SUBMIT_CITYZEN_PROFILE, updateProfile)];
}
