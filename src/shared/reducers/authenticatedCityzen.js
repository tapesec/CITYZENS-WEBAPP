import actionTypes from '../../client/actions/actionTypes';

const initialState = {};

export default function authenticatedCityzen(state = initialState, action) {
    switch (action.type) {
        case actionTypes.CITYZEN_FROM_API_UPDATED:
            return { ...state, profileFromApi: action.payload.updatedCityzenFromApi };
        default:
            return state;
    }
}

export const getCityzenProfileFromApi = state => state.authenticatedCityzen.profileFromApi;
export const getCityzenAccessToken = state => state.authenticatedCityzen.accessToken;
export const getCityzenProfile = state => state.authenticatedCityzen.profile;
export const getCityzenId = state =>
    getCityzenProfile(state) ? getCityzenProfile(state).id : undefined;
export const isAuthenticated = state =>
    !!getCityzenAccessToken(state) && !!getCityzenProfile(state);
export const getCityzenName = state =>
    isAuthenticated(state) ? getCityzenProfile(state).displayName : undefined;
