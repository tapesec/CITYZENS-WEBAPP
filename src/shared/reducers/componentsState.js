import actionTypes from './../../client/actions/actionTypes';

const initialState = {};

export default function componentsState(state = initialState, action) {
    let hotspotModal;
    let geocodeModal;
    let settingUpHotspotModal;

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
        case actionTypes.OPEN_HOSTPOT_ADDRESS_MODAL:
            geocodeModal = {
                ...state.geocodeModal,
                open: true,
            };
            return {
                ...state,
                geocodeModal,
            };
        case actionTypes.CLOSE_HOSTPOT_ADDRESS_MODAL:
            geocodeModal = {
                open: false,
                contentIsLoading: false,
                networkError: false,
            };
            return {
                ...state,
                geocodeModal,
            };
        case actionTypes.GEOCODING_STARTED:
            geocodeModal = {
                ...state.geocodeModal,
                contentIsLoading: true,
            };
            return {
                ...state,
                geocodeModal,
            };
        case actionTypes.GEOCODING_SUCCEDED:
            geocodeModal = {
                ...state.geocodeModal,
                contentIsLoading: false,
            };
            return {
                ...state,
                geocodeModal,
            };
        case actionTypes.GEOCODING_FAILED:
            geocodeModal = {
                ...state.geocodeModal,
                networkError: true,
            };
            return {
                ...state,
                geocodeModal,
            };

        case actionTypes.OPEN_SETTING_UP_HOTSPOT_MODAL:
            settingUpHotspotModal = {
                ...state.settingUpHotspotModal,
                open: true,
            };
            return {
                ...state,
                settingUpHotspotModal,
            };
        case actionTypes.CLOSE_SETTING_UP_HOTSPOT_MODAL:
            settingUpHotspotModal = {
                ...state.settingUpHotspotModal,
                open: false,
            };
            return {
                ...state,
                settingUpHotspotModal,
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

const getHotspotAddressModalState = state => state.componentsState.geocodeModal;
const isOpenHotspotAddressModal = state => getHotspotAddressModalState(state).open;
const hasNetworkError = state => getHotspotAddressModalState(state).networkError;
const isLoading = state => getHotspotAddressModalState(state).contentIsLoading;

export const hotspotAddressModalState = {
    getHotspotAddressModalState,
    isOpenHotspotAddressModal,
    hasNetworkError,
    isLoading,
};

const getSettingUpHotspotModalState = state => state.componentsState.settingUpHotspotModal;
const isOpenSettingUpHotspotModal = state => getSettingUpHotspotModalState(state).open;

export const settingUpHotspotModalState = {
    getSettingUpHotspotModalState,
    isOpenSettingUpHotspotModal,
};
