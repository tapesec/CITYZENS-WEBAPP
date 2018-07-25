import { createSelector } from 'reselect';
import { getHits } from './../../shared/reducers/algolia';

// components state

const modalIsOpen = state => state.componentsState.hotspotModal.open;

const getHotspotsForSearchList = state => {
    if (getHits(state) && getHits(state).length > 0) {
        return getHits(state);
    }
    return Object.values(state.hotspots);
};

const getHotspotsForMap = createSelector(
    state => state.hotspots,
    hotspots => Object.values(hotspots),
);

const getMarkerTooltipState = state => state.componentsState.map.markerTooltip;

const getCitySlug = state => state.city.slug;

const getHotspotContentLoading = state => state.componentsState.hotspotModal.contentIsLoading;

export default {
    getHotspotsForSearchList,
    getHotspotsForMap,
    getMarkerTooltipState,
    getCitySlug,
    getHotspotContentLoading,
    // components state
    modalIsOpen,
};
