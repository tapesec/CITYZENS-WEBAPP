import actionTypes from './../../client/actions/actionTypes';

const SETTING_UP = 'SETTING_UP';
const EDITION = 'EDITION';
const TURNED_OFF = 'TURNED_OFF';

const initialState = {};

export default function edition(state = initialState, action) {
    let hotspot;

    switch (action.type) {
        case actionTypes.TOGGLE_EDITION_MODE:
            return {
                ...state,
                mode: EDITION,
            };
        case actionTypes.INIT_SETTING_UP_MODE:
            hotspot = {
                ...state.hotspot,
                type: action.payload.type,
                iconType: action.payload.iconType,
            };
            return {
                ...state,
                hotspot,
            };
        case actionTypes.NEW_MARKER_DROPPED:
            hotspot = {
                ...state.hotspot,
                position: action.payload.position,
            };
            return {
                ...state,
                hotspot,
                mode: SETTING_UP,
            };
        case actionTypes.REVERSED_GEOCODING_SUCCEDED:
            hotspot = {
                ...state.hotspot,
                address: action.payload.address,
            };
            return {
                ...state,
                hotspot,
            };
        case actionTypes.GEOCODING_SUCCEDED:
            hotspot = {
                ...state.hotspot,
                position: {
                    latitude: action.payload.position.latitude,
                    longitude: action.payload.position.longitude,
                },
            };
            return {
                ...state,
                hotspot,
                mode: SETTING_UP,
            };

        case actionTypes.CLEAR_HOTSPOT_EDITION:
            return {
                ...state,
                mode: TURNED_OFF,
                hotspot: {},
            };
        case actionTypes.SUBMIT_HOSTPOT_ADDRESS_MODAL:
            hotspot = {
                ...state.hotspot,
                ...action.payload.formData,
            };
            return {
                ...state,
                hotspot,
            };
        case actionTypes.SAVE_IN_STATE_SETTING_UP_HOTSPOT_FORM_DATA:
            hotspot = {
                ...state.hotspot,
                ...action.payload.formData,
            };
            return {
                ...state,
                hotspot,
            };
        case actionTypes.EDIT_HOTSPOT_MESSAGE:
            return {
                ...state,
                message: action.payload,
                mode: EDITION,
            };
        case actionTypes.EDIT_HOTSPOT:
            return {
                ...state,
                hotspot: action.payload.fieldsEditable,
                mode: EDITION,
            };
        case actionTypes.DISPLAY_SETTING_UP_HOTSPOT_MESSAGE_FORM:
            return {
                ...state,
                mode: SETTING_UP,
            };
        case actionTypes.CLEAR_HOTSPOT_MESSAGE_EDITION:
            return {
                ...state,
                message: {},
                mode: TURNED_OFF,
            };
        default:
            return state;
    }
}

export const currentHotspotEdition = state => state.edition.hotspot;

export const hotspotEdition = {
    getCurrentHotspotEdition: state => currentHotspotEdition(state),
    getAddress: state => currentHotspotEdition(state).address,
};

export const currentMessageEdition = state => state.edition.message;

export const messageEdition = {
    getCurrentMessageEdition: state => currentMessageEdition(state),
    isInProgress: state => !!currentMessageEdition(state).id,
};

export const getSettingUpMode = state => state.edition.mode;
