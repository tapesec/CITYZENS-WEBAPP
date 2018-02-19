const initialState = {};

export default function authenticatedCityzen(state = initialState) {
    return state;
}

export const getCityzenAccessToken = state => state.authenticatedCityzen.accessToken;
export const getCityzenProfile = state => state.authenticatedCityzen.profile;
export const isAuthenticated = state => (!!getCityzenAccessToken(state) && !!getCityzenProfile(state));
export const getCityzenName = state => isAuthenticated(state)? getCityzenProfile(state).displayName : undefined;
