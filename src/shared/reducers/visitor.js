import actionTypes from './../../client/actions/actionTypes';

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
    // eslint-disable-next-line no-console
    console.log(
        'visitor is still located ?',
        state.visitor.position.timestamp,
        state.visitor.position.timestamp - new Date().getTime() < 60000,
    );
    return (
        state.visitor.position.timestamp &&
        state.visitor.position.timestamp - new Date().getTime() < 60000
    );
};
export const visitorComeFromMobile = state => state.visitor.fromMobile;
