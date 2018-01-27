import actionTypes from './../../client/actions/actionTypes';

const initialState = {};

export default function componentsState(state = initialState, action) {
    let hotspotModal;

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
        case actionTypes.OPEN_HOTSPOT:
            return {
                ...state,
                hotspotModal: {
                    contentIsLoading: true,
                    networkError: false,
                    currentHotspotSlug: action.payload.slug,
                },
            };
        /* case actionTypes.FETCH_HOTSPOT_SUCCEDED:
            return {
                ...state,
                hotspotModal: {
                    contentIsLoading: false,
                    networkError: false,
                    currentHotspot: action.payload.hotspot,
                },
            }; */
        case actionTypes.FETCH_HOTSPOT_FAILED:
            hotspotModal = {
                ...state.hotspotModal,
                contentIsLoading: false,
                networkError: true,
            };
            return {
                ...state,
                hotspotModal,
            };
        default:
            return state;
    }
}
