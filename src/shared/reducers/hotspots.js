import keyby from 'lodash.keyby';
import actionTypes from './../../client/actions/actionTypes';

const initialState = {};

export default function hotspots(state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_HOTSPOTS_BY_CITY_SUCCESS:
            return { ...state, ...keyby(action.payload.hotspots, 'id') };
        default:
            return state;
    }
}
