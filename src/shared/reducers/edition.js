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
        case actionTypes.NEW_MARKER_DROPPED:
            hotspot = {
                ...state.hotspot,
                type: action.payload.type,
                iconType: action.payload.iconType,
                position: action.payload.position,
            };
            return {
                ...state,
                hotspot,
                mode: SETTING_UP,
            };
        case actionTypes.GEOCODING_SUCCEDED:
            hotspot = {
                ...state.hotspot,
                address: action.payload.address,
            };
            return {
                ...state,
                hotspot,
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
        default:
            return state;
    }
}

export const currentHotspotEdition = state => state.edition.hotspot;

export const hotspotEdition = {
    getCurrentHotspotEdition: state => currentHotspotEdition(state),
    getAddress: state => currentHotspotEdition(state).address,
};

export const getSettingUpMode = state => state.edition.mode;
