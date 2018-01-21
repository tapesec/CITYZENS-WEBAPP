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

const mapMoved = (lat, lng) => ({
    type: actionTypes.MAP_MOVED,
    payload: {
        lat,
        lng,
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
    mapMoved,
};
