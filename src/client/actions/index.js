import actionTypes from './actionTypes';

const toggleLeftSideMenuVisibility = () => ({
    type: actionTypes.TOGGLE_LEFT_SIDE_MENU_VISIBILITY,
});

const hotspotSearchKeyPress = searchValue => ({
    type: actionTypes.HOTSPOT_SEARCH_KEY_PRESS,
    payload: {
        searchValue,
    },
});

export default {
    toggleLeftSideMenuVisibility,
    hotspotSearchKeyPress,
};
