import actionTypes from './../../client/actions/actionTypes';

const initialState = {};

export default function hotspots(state = initialState, action) {
    switch (action.type) {
        case actionTypes.TOGGLE_LEFT_SIDE_MENU_VISIBILITY:
            return { ...state, leftSideMenu: { open: !state.leftSideMenu.open } };
        default:
            return state;
    }
}
