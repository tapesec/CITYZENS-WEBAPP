import actionTypes from '../../client/actions/actionTypes';

const initialState = {};
const ZERO_COMMENTS = 0;

export default function commentsCount(state = initialState, action) {
    let oldCommentCount;
    let newState;
    switch (action.type) {
        case actionTypes.COMMENTS_COUNT_FETCHED:
            return { ...state, ...action.payload.countedMessages };
        case actionTypes.NEW_COMMENT_SAVED:
            oldCommentCount = state[action.payload.comment.parentId]
                ? state[action.payload.comment.parentId]
                : ZERO_COMMENTS;
            return { ...state, [action.payload.comment.parentId]: oldCommentCount + 1 };
        case actionTypes.HOTSPOT_COMMENT_DELETED:
            oldCommentCount = state[action.payload.parentId];
            return { ...state, [action.payload.parentId]: oldCommentCount - 1 };
        case actionTypes.DELETE_HOTSPOT_MESSAGE:
            newState = { ...state };
            delete newState[action.payload.messageId];
            return newState;
        default:
            return state;
    }
}
