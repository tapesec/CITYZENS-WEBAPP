import { takeLatest, call, put, select } from 'redux-saga/effects';
import MessagePayload from './../services/payloads/MessagePayload';
import actionTypes from './../actions/actionTypes';
import actions from './../actions';
import cityzensApi from './../../shared/services/CityzensApi';
import { getCityzenAccessToken } from './../../shared/reducers/authenticatedCityzen';
import { SNACKBAR } from './../wording';
import { NOTIFICATION_MESSAGE } from './../constants';
import sharedConstant from './../../shared/constants';

const { SETTING_UP } = sharedConstant.EDITION_MODE;

export function* fetchComments(params) {
    if (params && params.payload && params.payload.hotspotId) {
        try {
            const response = yield call(
                [cityzensApi, cityzensApi.getComments],
                params.payload.hotspotId,
                params.payload.messageId,
            );
            const fetchedComments = yield response.json();
            yield put(actions.fetchMessagesSucceded(fetchedComments));
        } catch (err) {
            let errorPayload;
            if (err.message) errorPayload = err.message;
            yield put(actions.fetchMessagesFailed(errorPayload));
        }
    }
}

export const buildCommentPayload = commentData => {
    const commentPayload = new MessagePayload();
    commentPayload.body = commentData.body;
    commentPayload.parentId = commentData.parentId;
    commentPayload.valid();
    return commentPayload.payload;
};

export function* persistComment(action) {
    const { settingUpMode } = action.payload;
    try {
        if (settingUpMode === SETTING_UP) {
            const accessToken = yield select(getCityzenAccessToken);
            const { hotspotId } = action.payload;
            const commentPayload = yield call(buildCommentPayload, action.payload.formData);
            const response = yield call(
                [cityzensApi, cityzensApi.postMessages],
                accessToken,
                hotspotId,
                JSON.stringify(commentPayload),
            );
            const newComment = yield response.json();
            yield put({ type: actionTypes.NEW_COMMENT_SAVED, payload: { comment: newComment } });
            yield put(
                actions.displayMessageToScreen(
                    SNACKBAR.INFO.MESSAGE_SAVED_SUCCESSFULLY,
                    NOTIFICATION_MESSAGE.LEVEL.INFO,
                ),
            );
        }
    } catch (err) {
        yield put(
            actions.displayMessageToScreen(
                SNACKBAR.ERROR.SAVING_MESSAGE_FAILED,
                NOTIFICATION_MESSAGE.LEVEL.ERROR,
            ),
        );
        console.log(err.message); // eslint-disable-line
    }
}

export default function* commentsSagas() {
    yield [takeLatest(actionTypes.PERSIST_MESSAGE_COMMENT, persistComment)];
}
