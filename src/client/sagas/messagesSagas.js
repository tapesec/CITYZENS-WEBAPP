import { takeLatest, call, put, select } from 'redux-saga/effects';
import MessagePayload from './../services/payloads/MessagePayload';
import selectors from './../selectors';
import actionTypes from './../actions/actionTypes';
import actions from './../actions';
import cityzensApi from './../../shared/services/CityzensApi';
import { getCityzenAccessToken } from './../../shared/reducers/authenticatedCityzen';
import { SNACKBAR } from './../wording';
import { NOTIFICATION_MESSAGE } from './../constants';

export function* fetchMessages(action) {
    if (action && action.payload && action.payload.slug) {
        try {
            const hotspot = yield select(selectors.getHotspotBySlug, action.payload.slug);
            const response = yield call([cityzensApi, cityzensApi.getMessages], hotspot.id);
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
        messagePayload.valid();
        return messagePayload.payload;
    } catch (error) {
        throw new Error('Invalid message payload');
    }
};

export function* persistMessage(action) {
    try {
        const { hotspotId } = action.payload;
        const messagePayload = yield call(buildMessagePayload, action.payload);
        const accessToken = yield select(getCityzenAccessToken);
        const response = yield call(
            [cityzensApi, cityzensApi.postMessages],
            accessToken,
            hotspotId,
            JSON.stringify(messagePayload),
        );
        const newMessage = response.json();
        yield put({ type: actionTypes.NEW_MESSAGE_SAVED, payload: { message: newMessage } });
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

export default function* messagesSagas() {
    yield [
        takeLatest(actionTypes.OPEN_HOTSPOT_IN_UNIVERSAL_MODAL, fetchMessages),
        takeLatest(actionTypes.SAVE_NEW_HOTSPOT_MESSAGE, persistMessage),
    ];
}
