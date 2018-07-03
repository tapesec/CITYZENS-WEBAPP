import keyby from 'lodash.keyby';
import actionTypes from './../../client/actions/actionTypes';

const initialState = {};

export default function messages(state = initialState, action) {
    let newState;
    switch (action.type) {
        case actionTypes.FETCH_MESSAGES_SUCCEDED:
            return { ...state, ...keyby(action.payload.messages, 'id') };
        case actionTypes.NEW_MESSAGE_SAVED:
            return { ...state, [action.payload.message.id]: action.payload.message };
        case actionTypes.HOTSPOT_MESSAGE_DELETED:
            newState = { ...state };
            delete newState[action.payload.messageId];
            return newState;
        default:
            return state;
    }
}
