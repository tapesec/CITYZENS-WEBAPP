import keyby from 'lodash.keyby';
import { createSelector } from 'reselect';
import actionTypes from '../../client/actions/actionTypes';

const initialState = {};

export default function comments(state = initialState, action) {
    let newState;
    switch (action.type) {
        case actionTypes.FETCH_MESSAGE_COMMENTS_SUCCEDED:
            return { ...state, ...keyby(action.payload.comments, 'id') };
        case actionTypes.NEW_COMMENT_SAVED:
            return { ...state, [action.payload.comment.id]: action.payload.comment };
        case actionTypes.HOTSPOT_COMMENT_DELETED:
            newState = { ...state };
            delete newState[action.payload.messageId];
            return newState;
        default:
            return state;
    }
}
export const getMessageComments = createSelector(
    (state, parentId) => ({ comments: state.comments, parentId }),
    results =>
        Object.values(results.comments).filter(comment => comment.parentId === results.parentId),
);
