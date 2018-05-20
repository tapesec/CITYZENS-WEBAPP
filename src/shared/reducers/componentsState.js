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
                    markerTooltip: {
                        show: false,
                    },
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
                content: {
                    subtitle: action.payload.subtitle,
                    inputLabel: action.payload.inputLabel,
                },
            };
            return {
                ...state,
                geocodeModal,
            };
        case actionTypes.CLOSE_HOSTPOT_ADDRESS_MODAL:
            geocodeModal = {
                ...state.geocodeModal,
                open: false,
                content: {
                    subtitle: '',
                    inputLabel: '',
                },
                contentIsLoading: false,
                networkError: false,
            };
            return {
                ...state,
                geocodeModal,
            };
        case actionTypes.REVERSED_GEOCODING_STARTED:
            geocodeModal = {
                ...state.geocodeModal,
                contentIsLoading: true,
            };
            return {
                ...state,
                geocodeModal,
            };
        case actionTypes.REVERSED_GEOCODING_SUCCEDED:
            geocodeModal = {
                ...state.geocodeModal,
                contentIsLoading: false,
            };
            return {
                ...state,
                geocodeModal,
            };
        case actionTypes.REVERSED_GEOCODING_FAILED:
            geocodeModal = {
                ...state.geocodeModal,
                networkError: true,
            };
            return {
                ...state,
                geocodeModal,
            };
        case actionTypes.GEOCODING_STARTED:
            geocodeModal = {
                ...state.geocodeModal,
                geocoding: true,
                geocodingFailed: false,
            };
            return {
                ...state,
                geocodeModal,
            };
        case actionTypes.GEOCODING_SUCCEDED:
            geocodeModal = {
                ...state.geocodeModal,
                geocoding: false,
                geocodingFailed: false,
            };
            return {
                ...state,
                geocodeModal,
            };
        case actionTypes.GEOCODING_FAILED:
            geocodeModal = {
                ...state.geocodeModal,
                geocodingFailed: true,
                geocoding: false,
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
        case actionTypes.DISPLAY_MESSAGE_TO_SCREEN:
            return {
                ...state,
                snackbar: {
                    visible: true,
                    level: action.payload.level,
                    message: action.payload.message,
                },
            };
        case actionTypes.MESSAGE_TO_SCREEN_ON_DISAPEAR:
            return {
                ...state,
                snackbar: {
                    visible: false,
                },
            };
        case actionTypes.CLEAR_HOTSPOT_EDITION:
            return {
                ...state,
                markerPreview: {
                    enabled: false,
                },
            };
        case actionTypes.RESET_MARKER_PREVIEW_MODE:
            return {
                ...state,
                markerPreview: {
                    enabled: true,
                },
            };
        case actionTypes.SELECT_WIDGET_TO_CONFIGURE:
            return {
                ...state,
                widget: {
                    name: action.payload.widgetName,
                    hotspotId: action.payload.hotspotId,
                },
            };
        case actionTypes.UNSELECT_WIDGET_TO_CONFIGURE:
            return {
                ...state,
                widget: {},
            };
        case actionTypes.DELETE_SLIDESHOW_IMAGE_REQUESTED:
            return {
                ...state,
                onLoad: {
                    removingSlideshowImage: true,
                },
            };
        case actionTypes.DELETE_SLIDESHOW_IMAGE_ENDED:
            return {
                ...state,
                onLoad: {
                    removingSlideshowImage: false,
                },
            };
        case actionTypes.SHOW_HOTSPOT_TYPE_DESCRIPTION_MODAL:
            return {
                ...state,
                hotspotTypeDescriptionModal: {
                    open: action.payload.open,
                    hotspotType: action.payload.hotspotType,
                },
            };
        case actionTypes.TOGGLE_DROP_MARKER_MOD:
            return {
                ...state,
                dropMarkerMapOverlay: {
                    visible: action.payload.visible,
                },
            };
        default:
            return state;
    }
}

const getHotspotAddressModalState = state => state.componentsState.geocodeModal;
const isOpenHotspotAddressModal = state => getHotspotAddressModalState(state).open;
const getHotspotAddressModalContent = state => getHotspotAddressModalState(state).content;
const hasNetworkError = state => getHotspotAddressModalState(state).networkError;
const isLoading = state => getHotspotAddressModalState(state).contentIsLoading;
const geocoding = state => getHotspotAddressModalState(state).geocoding;
const geocodingFailed = state => getHotspotAddressModalState(state).geocodingFailed;

export const hotspotAddressModalState = {
    getHotspotAddressModalState,
    isOpenHotspotAddressModal,
    getHotspotAddressModalContent,
    hasNetworkError,
    isLoading,
    geocoding,
    geocodingFailed,
};

const getSettingUpHotspotModalState = state => state.componentsState.settingUpHotspotModal;
const isOpenSettingUpHotspotModal = state => getSettingUpHotspotModalState(state).open;

export const settingUpHotspotModalState = {
    getSettingUpHotspotModalState,
    isOpenSettingUpHotspotModal,
};

export const displaySnackbar = state => state.componentsState.snackbar.visible;
export const snackbarMessage = state => ({
    message: state.componentsState.snackbar.message,
    level: state.componentsState.snackbar.level,
});

export const getMarkerPreviewModeStatus = state => state.componentsState.markerPreview.enabled;

export const selectWidgetCurrentlyEdited = state => state.componentsState.widget;
export const widgetIsBeingEdited = state => state.componentsState.widget.name !== undefined;

export const componentIsLoading = {
    removingSlideshowImage: state => state.componentsState.onLoad.removingSlideshowImage,
};

export const getHotspotTypeDescriptionModal = state =>
    state.componentsState.hotspotTypeDescriptionModal;

export const mapOverlayIsVisible = state => state.componentsState.dropMarkerMapOverlay.visible;
