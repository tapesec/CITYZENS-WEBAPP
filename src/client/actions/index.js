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

const fetchHotspotsInArea = (north, west, south, east) => ({
    type: actionTypes.FETCH_HOTSPOTS_IN_AREA,
    payload: {
        north,
        west,
        south,
        east,
    },
});

const fetchHotspotsInAreaSuccess = hotspots => ({
    type: actionTypes.FETCH_HOTSPOTS_IN_AREA_SUCCESS,
    payload: {
        hotspots,
    },
});

export default {
    toggleLeftSideMenuVisibility,
    hotspotSearchKeyPress,
    leftSideMenuDidMount,
    displayHits,
    algoliaError,
    fetchHotspotsInArea,
    fetchHotspotsInAreaSuccess,
};
