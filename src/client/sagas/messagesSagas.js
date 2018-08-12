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

export function* fetchCountComments(hotspotId, messages) {
    try {
        const messagesIds = messages.map(message => message.id).join(',');
        const response = yield call(
            [cityzensApi, cityzensApi.countComments],
            hotspotId,
            messagesIds,
        );
        const countedMessages = yield response.json();
        yield put({ type: actionTypes.COMMENTS_COUNT_FETCHED, payload: { countedMessages } });
    } catch (error) {
        // eslint-disable-next-line
        console.log(error);
    }
}

export function* fetchMessages(params) {
    if (params && params.payload && params.payload.hotspotId) {
        try {
            const response = yield call(
                [cityzensApi, cityzensApi.getMessages],
                params.payload.hotspotId,
            );
            const messages = yield response.json();
            yield put(actions.fetchMessagesSucceded(messages));
            yield call(fetchCountComments, params.payload.hotspotId, messages);
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

export function* deleteMessage(action) {
    try {
        const { messageId, hotspotId, parentId } = action.payload;
        const accessToken = yield select(getCityzenAccessToken);
        yield call([cityzensApi, cityzensApi.deleteMessage], accessToken, hotspotId, messageId);
        if (action.type === actionTypes.DELETE_HOTSPOT_MESSAGE)
            yield put({ type: actionTypes.HOTSPOT_MESSAGE_DELETED, payload: { messageId } });
        else
            yield put({
                type: actionTypes.HOTSPOT_COMMENT_DELETED,
                payload: { messageId, parentId },
            });
        yield put(
            actions.displayMessageToScreen(
                SNACKBAR.INFO.DELETE_SUCCESS,
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

export function* persistMessage(action, options = { initial: false }) {
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
        if (!options.initial) {
            yield put(
                actions.displayMessageToScreen(
                    SNACKBAR.INFO.CONTRIBUTION_THANKS,
                    NOTIFICATION_MESSAGE.LEVEL.INFO,
                ),
            );
        }
    } catch (err) {
        yield put(
            actions.displayMessageToScreen(
                SNACKBAR.ERROR.GENERIC_FAIL,
                NOTIFICATION_MESSAGE.LEVEL.ERROR,
            ),
        );
        console.log(err.message); // eslint-disable-line
    }
}

export default function* messagesSagas() {
    yield [
        takeLatest(actionTypes.POST_EDITION_MESSAGE_FORM_DATA, persistMessage),
        takeLatest(actionTypes.DELETE_HOTSPOT_MESSAGE, deleteMessage),
        takeLatest(actionTypes.DELETE_MESSAGE_COMMENT, deleteMessage),
    ];
}
