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

const unfocusHotspotInMap = () => ({
    type: actionTypes.UNFOCUS_HOTSPOT_IN_MAP,
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

const openHotspotAddressModal = modalParams => ({
    type: actionTypes.OPEN_HOSTPOT_ADDRESS_MODAL,
    payload: {
        subtitle: modalParams.subtitle,
        inputLabel: modalParams.inputLabel,
    },
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

const deleteHotspotMessage = (hotspotId, messageId) => ({
    type: actionTypes.DELETE_HOTSPOT_MESSAGE,
    payload: {
        hotspotId,
        messageId,
    },
});

const deleteMessageComment = (hotspotId, messageId, parentId) => ({
    type: actionTypes.DELETE_MESSAGE_COMMENT,
    payload: {
        hotspotId,
        messageId,
        parentId,
    },
});

const fetchMessageComments = (hotspotId, messageId) => ({
    type: actionTypes.FETCH_MESSAGE_COMMENTS,
    payload: {
        hotspotId,
        messageId,
    },
});

const persistMessageComment = (settingUpMode, formData, hotspotId) => ({
    type: actionTypes.PERSIST_MESSAGE_COMMENT,
    payload: {
        settingUpMode,
        formData,
        hotspotId,
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

const newMarkerDropped = position => ({
    type: actionTypes.NEW_MARKER_DROPPED,
    payload: {
        position,
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

const initSettingUpMode = type => ({
    type: actionTypes.INIT_SETTING_UP_MODE,
    payload: {
        type,
    },
});

const toggleMapOverlayVisibility = visible => ({
    type: actionTypes.TOGGLE_DROP_MARKER_MOD,
    payload: {
        visible,
    },
});

const geocode = value => ({
    type: actionTypes.GEOCODING_STARTED,
    payload: {
        address: value.address,
    },
});

const initHotspotFromMyPosition = () => ({
    type: actionTypes.INIT_HOTSPOT_FROM_MY_POSITION,
});

const removeImageWithHandle = imgHandle => ({
    type: actionTypes.REMOVE_IMAGE_WITH_HANDLE,
    payload: {
        imgHandle,
    },
});

const submitLead = email => ({
    type: actionTypes.SUBMIT_LEAD,
    payload: {
        email,
    },
});

const trackEvent = params => ({
    type: actionTypes.TRACK_EVENT,
    payload: {
        params,
    },
});

const fetchCityzenProfile = userId => ({
    type: actionTypes.FETCH_CITYZEN_PROFILE,
    payload: {
        userId,
    },
});

const submitProfile = (userId, formValues) => ({
    type: actionTypes.SUBMIT_CITYZEN_PROFILE,
    payload: {
        userId,
        formValues,
    },
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
    deleteHotspotMessage,
    deleteMessageComment,
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
    alertStillExist,
    hotspotAvatarUploaded,
    alertHotspotImageUploaded,
    selectWidgetToConfigure,
    unselectWidgetToConfigure,
    saveSlideshowWidget,
    showHotspotTypeDescriptionModal,
    toggleMapOverlayVisibility,
    initSettingUpMode,
    geocode,
    initHotspotFromMyPosition,
    removeImageWithHandle,
    persistMessageComment,
    fetchMessageComments,
    submitLead,
    trackEvent,
    fetchCityzenProfile,
    submitProfile,
};
