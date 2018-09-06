import actionTypes from './../../client/actions/actionTypes';

const initialState = {};

export default function cityzens(state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_CITYZEN_PROFILE_SUCCESS:
            return { ...state, [action.payload.cityzen.id]: action.payload.cityzen };
        default:
            return state;
    }
}

export const getCityzenProfile = (state, userId) => state.cityzens[userId];
