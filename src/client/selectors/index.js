import { getHits } from './../../shared/reducers/algolia';

const getHotspotsForSearchList = state => {
    if (getHits(state) && getHits(state).length > 0) {
        return getHits(state);
    }
    return Object.values(state.hotspots);
};

const getHotspotsForMap = state => Object.values(state.hotspots);

const getHotspotById = (state, id) => state.hotspots[id];

const getHotspotBySlug = (state, slug) =>
    Object.values(state.hotspots)
        .filter(hotspot => hotspot.slug === slug)
        .pop();

const getMarkerTooltipState = state => state.componentsState.map.markerTooltip;

const getCitySlug = state => state.city.slug;

const getHotspotContentLoading = state => state.componentsState.hotspotModal.contentIsLoading;
const getCurrentHotspotSlug = state => state.componentsState.hotspotModal.currentHotspotSlug;

const getReadableHotspot = state => {
    const hotspotSlug = getCurrentHotspotSlug(state);
    return getHotspotBySlug(state, hotspotSlug);
};

export default {
    getHotspotsForSearchList,
    getHotspotsForMap,
    getHotspotById,
    getHotspotBySlug,
    getMarkerTooltipState,
    getCitySlug,
    getHotspotContentLoading,
    getReadableHotspot,
};
