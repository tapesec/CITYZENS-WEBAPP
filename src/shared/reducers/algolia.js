import actionTypes from '../../client/actions/actionTypes';

const initialState = {};

export default function algolia(state = initialState, action) {
    switch (action.type) {
        case actionTypes.DISPLAY_HITS:
            return action.payload.prediction;
        default:
            return state;
    }
}
export const getHits = state => state.algolia.hits;
