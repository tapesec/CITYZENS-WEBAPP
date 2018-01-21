import actionTypes from './../../client/actions/actionTypes';

const initialState = {};

export default function componentState(state = initialState, action) {
    switch (action.type) {
        case actionTypes.TOGGLE_LEFT_SIDE_MENU_VISIBILITY:
            return { ...state, leftSideMenu: { open: !state.leftSideMenu.open } };
        case actionTypes.FOCUS_HOTSPOT_IN_SEARCH_LIST:
        case actionTypes.FOCUS_HOTSPOT_IN_MAP:
            return {
                ...state,
                map: {
                    markerTooltip: {
                        hotspotId: action.payload.hotspotId,
                        show: true,
                    },
                },
            };
        case actionTypes.UNFOCUS_HOTSPOT_IN_MAP:
            return {
                ...state,
                map: {
                    markerTooltip: {},
                },
            };
        default:
            return state;
    }
}
