import actionTypes from './actionTypes';

const toggleLeftSideMenuVisibility = () => ({
    type: actionTypes.TOGGLE_LEFT_SIDE_MENU_VISIBILITY,
});

const leftSideMenuDidMount = () => ({
    type: actionTypes.LEFT_SIDE_MENU_DID_MOUNT,
});

const hotspotSearchKeyPress = searchValue => ({
    type: actionTypes.HOTSPOT_SEARCH_KEY_PRESS,
    payload: {
        searchValue,
    },
});

const displayHits = prediction => ({
    type: actionTypes.DISPLAY_HITS,
    payload: {
        prediction,
    },
});

const algoliaError = () => ({
    type: actionTypes.ALGOLIA_ERROR,
});

const fetchHotspotsByCity = cityId => ({
    type: actionTypes.FETCH_HOTSPOTS_BY_CITY,
    payload: {
        cityId,
    },
});

const fetchHotspotsByCitySuccess = hotspots => ({
    type: actionTypes.FETCH_HOTSPOTS_BY_CITY_SUCCESS,
    payload: {
        hotspots,
    },
});

const fetchHotspotsByCityError = () => ({
    type: actionTypes.FETCH_HOTSPOTS_BY_CITY_ERROR,
});

const focusHotspotInSearchList = hotspotId => ({
    type: actionTypes.FOCUS_HOTSPOT_IN_SEARCH_LIST,
    payload: {
        hotspotId,
    },
});

const focusHotspotInMap = hotspotId => ({
    type: actionTypes.FOCUS_HOTSPOT_IN_MAP,
    payload: {
        hotspotId,
    },
});

const unfocusHotspotInMap = hotspotId => ({
    type: actionTypes.UNFOCUS_HOTSPOT_IN_MAP,
    payload: {
        hotspotId,
    },
});

const centerMapToPosition = (lat, lng) => ({
    type: actionTypes.CENTER_MAP_TO_POSITION,
    payload: {
        lat,
        lng,
    },
});

const openHotspotInSPAModal = hotspotId => ({
    type: actionTypes.OPEN_HOTSPOT_IN_SPA_MODAL,
    payload: {
        hotspotId,
    },
});

const closeHotspotInSPAModal = () => ({
    type: actionTypes.CLOSE_HOTSPOT_IN_SPA_MODAL,
});

const openHotspotInUniversalModal = slug => ({
    type: actionTypes.OPEN_HOTSPOT_IN_UNIVERSAL_MODAL,
    payload: {
        slug,
    },
});

const closeHotspotInUniversalModal = () => ({
    type: actionTypes.CLOSE_HOTSPOT_IN_UNIVERSAL_MODAL,
});

const openHotspotAddressModal = () => ({
    type: actionTypes.OPEN_HOSTPOT_ADDRESS_MODAL,
});

const submitHotspotAddressModal = formData => ({
    type: actionTypes.SUBMIT_HOSTPOT_ADDRESS_MODAL,
    payload: {
        formData,
    },
});

const closeHotspotAddressModal = () => ({
    type: actionTypes.CLOSE_HOSTPOT_ADDRESS_MODAL,
});

const openSettingUpHotspotModal = () => ({
    type: actionTypes.OPEN_SETTING_UP_HOTSPOT_MODAL,
});

const saveInStateSettingUpHotspotFormData = formData => ({
    type: actionTypes.SAVE_IN_STATE_SETTING_UP_HOTSPOT_FORM_DATA,
    payload: {
        formData,
    },
});

const postSettingUpHotspotFormData = settingUpMode => ({
    type: actionTypes.POST_SETTING_UP_HOTSPOT_FORM_DATA,
    payload: {
        settingUpMode,
    },
});

const editMessageHotspot = (id, title, body, pinned) => ({
    type: actionTypes.EDIT_HOTSPOT_MESSAGE,
    payload: {
        id,
        title,
        body,
        pinned,
    },
});

const editEventHotspot = fieldsEditable => ({
    type: actionTypes.EDIT_HOTSPOT,
    payload: {
        fieldsEditable,
    },
});

const postEditionMessageFormData = (settingUpMode, formData) => ({
    type: actionTypes.POST_EDITION_MESSAGE_FORM_DATA,
    payload: {
        settingUpMode,
        hotspotId: formData.hotspotId,
        messageId: formData.id,
        title: formData.title,
        body: formData.body,
        pinned: formData.pinned,
    },
});

const clearHotspotMessageEdition = () => ({
    type: actionTypes.CLEAR_HOTSPOT_MESSAGE_EDITION,
});

const displaySettingUpHotspotMessageForm = () => ({
    type: actionTypes.DISPLAY_SETTING_UP_HOTSPOT_MESSAGE_FORM,
});

const closeSettingUpHotspotModal = () => ({
    type: actionTypes.CLOSE_SETTING_UP_HOTSPOT_MODAL,
});

const clearHotspotEdition = () => ({
    type: actionTypes.CLEAR_HOTSPOT_EDITION,
});

const fetchHotspotSucceded = hotspot => ({
    type: actionTypes.FETCH_HOTSPOT_SUCCEDED,
    payload: {
        hotspot,
    },
});

const fetchHotspotFailed = err => ({
    type: actionTypes.FETCH_HOTSPOT_FAILED,
    payload: {
        err,
    },
});

const fetchMessagesSucceded = messages => ({
    type: actionTypes.FETCH_MESSAGES_SUCCEDED,
    payload: {
        messages,
    },
});

const fetchMessagesFailed = err => ({
    type: actionTypes.FETCH_MESSAGES_FAILED,
    payload: {
        err,
    },
});

const mapMoved = (lat, lng) => ({
    type: actionTypes.MAP_MOVED,
    payload: {
        lat,
        lng,
    },
});

const newMarkerDropped = (position, type, iconType) => ({
    type: actionTypes.NEW_MARKER_DROPPED,
    payload: {
        position,
        type,
        iconType,
    },
});

const redirectTo = path => ({
    type: actionTypes.REDIRECT_TO,
    payload: {
        path,
    },
});

const displayMessageToScreen = (message, level) => ({
    type: actionTypes.DISPLAY_MESSAGE_TO_SCREEN,
    payload: {
        message,
        level,
    },
});

const messageToScreenOnDisapear = () => ({
    type: actionTypes.MESSAGE_TO_SCREEN_ON_DISAPEAR,
});

const hotspotViewUp = hotspotId => ({
    type: actionTypes.HOTSPOT_VIEW_UP,
    payload: {
        hotspotId,
    },
});

const resetMarkerPreviewMode = () => ({
    type: actionTypes.RESET_MARKER_PREVIEW_MODE,
});

const alertStillExist = (hotspotId, boolean) => ({
    type: actionTypes.ALERT_STILL_EXIST,
    payload: {
        hotspotId,
        poll: boolean,
    },
});

const hotspotAvatarUploaded = (hotspotId, avatarIconUrl) => ({
    type: actionTypes.HOTSPOT_AVATAR_UPLOADED,
    payload: {
        hotspotId,
        avatarIconUrl,
    },
});

const alertHotspotImageUploaded = (hotspotId, imgUrl) => ({
    type: actionTypes.ALERT_HOTSPOT_IMAGE_UPLOADED,
    payload: {
        hotspotId,
        imgUrl,
    },
});

const selectWidgetToConfigure = (hotspotId, widgetName) => ({
    type: actionTypes.SELECT_WIDGET_TO_CONFIGURE,
    payload: {
        hotspotId,
        widgetName,
    },
});

const unselectWidgetToConfigure = () => ({
    type: actionTypes.UNSELECT_WIDGET_TO_CONFIGURE,
});

const saveSlideshowWidget = (hotspotId, picturesUrl) => ({
    type: actionTypes.SAVE_SLIDESHOWS_PICTURES,
    payload: {
        hotspotId,
        picturesUrl,
    },
});

const showHotspotTypeDescriptionModal = (status, hotspotType) => ({
    type: actionTypes.SHOW_HOTSPOT_TYPE_DESCRIPTION_MODAL,
    payload: {
        open: status,
        hotspotType,
    },
});

const toggleDropMarkerMod = () => ({
    type: actionTypes.TOGGLE_DROP_MARKER_MOD,
});

export default {
    toggleLeftSideMenuVisibility,
    hotspotSearchKeyPress,
    leftSideMenuDidMount,
    displayHits,
    algoliaError,
    fetchHotspotsByCity,
    fetchHotspotsByCitySuccess,
    fetchHotspotsByCityError,
    focusHotspotInSearchList,
    focusHotspotInMap,
    unfocusHotspotInMap,
    centerMapToPosition,
    openHotspotInSPAModal,
    closeHotspotInSPAModal,
    openHotspotInUniversalModal,
    closeHotspotInUniversalModal,
    openHotspotAddressModal,
    submitHotspotAddressModal,
    closeHotspotAddressModal,
    openSettingUpHotspotModal,
    saveInStateSettingUpHotspotFormData,
    postSettingUpHotspotFormData,
    postEditionMessageFormData,
    editMessageHotspot,
    editEventHotspot,
    clearHotspotMessageEdition,
    displaySettingUpHotspotMessageForm,
    closeSettingUpHotspotModal,
    clearHotspotEdition,
    fetchHotspotSucceded,
    fetchHotspotFailed,
    fetchMessagesSucceded,
    fetchMessagesFailed,
    mapMoved,
    newMarkerDropped,
    redirectTo,
    displayMessageToScreen,
    messageToScreenOnDisapear,
    hotspotViewUp,
    resetMarkerPreviewMode,
    alertStillExist,
    hotspotAvatarUploaded,
    alertHotspotImageUploaded,
    selectWidgetToConfigure,
    unselectWidgetToConfigure,
    saveSlideshowWidget,
    showHotspotTypeDescriptionModal,
    toggleDropMarkerMod,
};
