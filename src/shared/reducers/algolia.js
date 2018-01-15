import actionTypes from '../../client/actions/actionTypes';

const initialState = {};

export default function algolia(state = initialState, action) {
    switch (action.type) {
        case actionTypes.DISPLAY_HITS:
            return { ...action.payload.prediction, networkError: false };
        case actionTypes.ALGOLIA_ERROR:
            return { ...state, networkError: true }
        default:
            return state;
    }
}
export const getHits = state => {
    if (state.algolia.query !== '') {
        return state.algolia.hits;
    }
    return [];
}
