import { takeLatest, call, put, select } from 'redux-saga/effects';
import MessagePayload from './../services/payloads/MessagePayload';
import actionTypes from './../actions/actionTypes';
import actions from './../actions';
import cityzensApi from './../../shared/services/CityzensApi';
import { getCityzenAccessToken } from './../../shared/reducers/authenticatedCityzen';
import { SNACKBAR } from './../wording';
import { NOTIFICATION_MESSAGE } from './../constants';
import sharedConstant from './../../shared/constants';

const { EDITION, SETTING_UP } = sharedConstant.EDITION_MODE;

export function* fetchMessages(params) {
    if (params && params.payload && params.payload.hotspotId) {
        try {
            const response = yield call(
                [cityzensApi, cityzensApi.getMessages],
                params.payload.hotspotId,
            );
            const syncedHotspot = yield response.json();
            yield put(actions.fetchMessagesSucceded(syncedHotspot));
        } catch (err) {
            let errorPayload;
            if (err.message) errorPayload = err.message;
            yield put(actions.fetchMessagesFailed(errorPayload));
        }
    }
}

export const buildMessagePayload = messageData => {
    try {
        const messagePayload = new MessagePayload();
        messagePayload.title = messageData.title;
        messagePayload.body = messageData.body;
        messagePayload.pinned = messageData.pinned;
        messagePayload.valid();
        return messagePayload.payload;
    } catch (error) {
        throw new Error('Invalid message payload');
    }
};

export function* persistMessage(action) {
    const { settingUpMode } = action.payload;
    try {
        const accessToken = yield select(getCityzenAccessToken);
        let response;
        if (settingUpMode === EDITION) {
            const { messageId, hotspotId } = action.payload;
            const messagePayload = yield call(buildMessagePayload, action.payload);
            response = yield call(
                [cityzensApi, cityzensApi.patchMessages],
                accessToken,
                hotspotId,
                messageId,
                JSON.stringify(messagePayload),
            );
        }
        if (settingUpMode === SETTING_UP) {
            const { hotspotId } = action.payload;
            const messagePayload = yield call(buildMessagePayload, action.payload);
            response = yield call(
                [cityzensApi, cityzensApi.postMessages],
                accessToken,
                hotspotId,
                JSON.stringify(messagePayload),
            );
        }
        const newMessage = yield response.json();
        yield put(actions.clearHotspotMessageEdition());
        yield put({ type: actionTypes.NEW_MESSAGE_SAVED, payload: { message: newMessage } });
        yield put(
            actions.displayMessageToScreen(
                SNACKBAR.INFO.MESSAGE_SAVED_SUCCESSFULLY,
                NOTIFICATION_MESSAGE.LEVEL.INFO,
            ),
        );
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

export function* persistComment() {
    const { settingUpMode } = action.payload;
    if (settingUpMode === SETTING_UP) {
        const { parentId } = action.payload;
        const messagePayload = yield call(buildMessagePayload, action.payload);
        response = yield call(
            [cityzensApi, cityzensApi.patchMessages],
            accessToken,
            hotspotId,
            messageId,
            JSON.stringify(messagePayload),
        );
    }
}

export default function* commentsSagas() {
    yield [takeLatest(actionTypes.PERSIST_MESSAGE_COMMENT, persistComment)];
}
