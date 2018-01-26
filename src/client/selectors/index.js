import { getHits } from './../../shared/reducers/algolia';

const getHotspotsForSearchList = state => {
    if (getHits(state) && getHits(state).length > 0) {
        return getHits(state);
    }
    return Object.values(state.hotspots);
};

const getHotspotsForMap = state => Object.values(state.hotspots);

const getHotspotById = (state, id) => state.hotspots[id];

const getMarkerTooltipState = state => state.componentsState.map.markerTooltip;

const getCitySlug = state => state.city.slug;

export default {
    getHotspotsForSearchList,
    getHotspotsForMap,
    getHotspotById,
    getMarkerTooltipState,
    getCitySlug,
};
