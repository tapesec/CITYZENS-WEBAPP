const initialState = {};

export default function authenticatedCityzen(state = initialState) {
    return state;
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
