const initialState = {};

export default function city(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
export const getCity = state => state.city;
export const getCityId = state => state.city.insee;
export const getCityName = state => state.city.name;
