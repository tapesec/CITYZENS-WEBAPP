import { createSelector } from 'reselect';
import { getHits } from './../../shared/reducers/algolia';

const HOTSPOT_TYPES = {
    MEDIA: 'Media',
    Alert: 'Alert',
};

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

const getHotspotById = (state, id) => state.hotspots[id];

const getMessagesByHotspotId = (state, hotspotId) =>
    Object.values(state.messages).filter(message => message.hotspotId === hotspotId);

const sortMessagesByDate = messagesList =>
    messagesList.sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

const getHotspotBySlug = (state, slug) =>
    Object.values(state.hotspots)
        .filter(hotspot => hotspot.slug === slug && hotspot.type !== HOTSPOT_TYPES.Alert)
        .pop();

const getMarkerTooltipState = state => state.componentsState.map.markerTooltip;

const getCitySlug = state => state.city.slug;

const getHotspotContentLoading = state => state.componentsState.hotspotModal.contentIsLoading;
const getCurrentHotspotSlug = state => state.componentsState.hotspotModal.currentHotspotSlug;
const getCurrentHotspotId = state => state.componentsState.hotspotModal.currentHotspotId;

const getReadableHotspot = state => {
    let hotspot;
    const hotspotSlug = getCurrentHotspotSlug(state);
    const hotspotId = getCurrentHotspotId(state);
    if (hotspotSlug) {
        hotspot = getHotspotBySlug(state, hotspotSlug);
    }
    if (hotspotId) {
        hotspot = getHotspotById(state, hotspotId);
    }
    if (hotspot && hotspot.type === HOTSPOT_TYPES.MEDIA) {
        hotspot = {
            ...hotspot,
            messages: sortMessagesByDate(getMessagesByHotspotId(state, hotspot.id)),
        };
    }
    return hotspot;
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
    // components state
    modalIsOpen,
};
