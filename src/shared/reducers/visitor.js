import actionTypes from '../../client/actions/actionTypes';

const initialState = {};

export default function visitor(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_GPS_POSITION:
            return { ...state, position: action.payload };
        default:
            return state;
    }
}

export const getVisitorPosition = state => state.visitor.position;
export const visitorIsStillLocated = state => {
    if (!state.visitor.position.timestamp) return false;
    return new Date().getTime() - state.visitor.position.timestamp < 60000;
};
export const visitorComeFromMobile = state => state.visitor.fromMobile;
