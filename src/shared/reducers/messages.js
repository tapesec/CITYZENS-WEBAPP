import keyby from 'lodash.keyby';
import actionTypes from './../../client/actions/actionTypes';

const initialState = {};

export default function messages(state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_MESSAGES_SUCCEDED:
            return { ...state, ...keyby(action.payload.messages, 'id') };
        case actionTypes.NEW_MESSAGE_SAVED:
            return { ...state, ...keyby(action.payload.message, 'id') };
        default:
            return state;
    }
}
