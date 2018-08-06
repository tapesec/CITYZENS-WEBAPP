import actionTypes from '../../client/actions/actionTypes';

const initialState = {};

export default function map(state = initialState, action) {
    switch (action.type) {
        case actionTypes.CENTER_MAP_TO_POSITION:
        case actionTypes.MAP_MOVED:
            return {
                ...state,
                center: {
                    lat: action.payload.lat,
                    lng: action.payload.lng,
                },
            };
        default:
            return state;
    }
}
