import { takeLatest, select, call, put } from 'redux-saga/effects';
import { getCityzenAccessToken } from './../../../shared/reducers/authenticatedCityzen';
import actions from '../../actions';
import actionTypes from '../../actions/actionTypes';
import cityzensApi from './../../../shared/services/CityzensApi';
import { SNACKBAR } from './../../wording';
import { NOTIFICATION_MESSAGE } from './../../constants';

export function* saveSlideshowWidget(action) {
    const { hotspotId, picturesUrl } = action.payload;
    const accessToken = yield select(getCityzenAccessToken);
    try {
        yield put({
            type: actionTypes.DELETE_SLIDESHOW_IMAGE_REQUESTED,
        });
        const response = yield call(
            [cityzensApi, cityzensApi.patchHotspots],
            accessToken,
            JSON.stringify({ slideShow: picturesUrl }),
            hotspotId,
        );
        const newHotspot = yield response.json();
        yield put({
            type: actionTypes.DELETE_SLIDESHOW_IMAGE_ENDED,
        });
        yield put({
            type: actionTypes.NEW_HOTSPOT_SAVED,
            payload: { hotspot: newHotspot },
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
                SNACKBAR.ERROR.UPDATING_HOTSPOT_FAILED,
                NOTIFICATION_MESSAGE.LEVEL.ERROR,
            ),
        );
    }
}

export default function* slideshowWidgetSagas() {
    yield [takeLatest(actionTypes.SAVE_SLIDESHOWS_PICTURES, saveSlideshowWidget)];
}
