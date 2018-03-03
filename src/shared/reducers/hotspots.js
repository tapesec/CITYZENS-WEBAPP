import keyby from 'lodash.keyby';
import actionTypes from './../../client/actions/actionTypes';

const initialState = {};

export default function hotspots(state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_HOTSPOTS_BY_CITY_SUCCESS:
            return { ...state, ...keyby(action.payload.hotspots, 'id') };
        case actionTypes.FETCH_HOTSPOT_SUCCEDED:
        case actionTypes.NEW_HOTSPOT_SAVED:
            return { ...state, [action.payload.hotspot.id]: action.payload.hotspot };
        default:
            return state;
    }
}
