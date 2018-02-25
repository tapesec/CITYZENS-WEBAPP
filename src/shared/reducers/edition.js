import actionTypes from './../../client/actions/actionTypes';

const initialState = {};

export default function edition(state = initialState, action) {
    let hotspot;

    switch (action.type) {
        case actionTypes.GEOCODING_SUCCEDED:
            return {
                ...state,
                hotspot: {
                    address: action.payload.address,
                },
            };
        case actionTypes.DISMISS_HOSTPOT_ADDRESS_MODAL:
            return {
                ...state,
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
        default:
            return state;
    }
}

export const currentHotspotEdition = state => state.edition.hotspot;

export const hotspotEdition = {
    getCurrentHotspotEdition: state => currentHotspotEdition(state),
    getAddress: state => currentHotspotEdition(state).address,
};
