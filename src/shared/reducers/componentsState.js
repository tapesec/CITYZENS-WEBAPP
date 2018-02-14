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
        case actionTypes.OPEN_HOTSPOT_IN_SPA_MODAL:
            return {
                ...state,
                hotspotModal: {
                    contentIsLoading: true,
                    networkError: false,
                    currentHotspotId: action.payload.hotspotId,
                    open: true,
                },
            };
        case actionTypes.CLOSE_HOTSPOT_IN_SPA_MODAL:
            hotspotModal = {
                ...state.hotspotModal,
                currentHotspotId: undefined,
                networkError: false,
                open: false,
            };
            return {
                ...state,
                hotspotModal,
            };
        case actionTypes.OPEN_HOTSPOT_IN_UNIVERSAL_MODAL:
            return {
                ...state,
                hotspotModal: {
                    contentIsLoading: true,
                    networkError: false,
                    currentHotspotSlug: action.payload.slug,
                },
            };
        case actionTypes.CLOSE_HOTSPOT_IN_UNIVERSAL_MODAL:
            hotspotModal = {
                ...state.hotspotModal,
                currentHotspotSlug: undefined,
                networkError: false,
            };
            return {
                ...state,
                hotspotModal,
            };
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
        case actionTypes.FETCH_HOTSPOT_SUCCEDED:
            hotspotModal = {
                ...state.hotspotModal,
                contentIsLoading: false,
                networkError: false,
            };
            return {
                ...state,
                hotspotModal,
            };
        default:
            return state;
    }
}
