import keyby from 'lodash.keyby';
import { createSelector } from 'reselect';
import actionTypes from './../../client/actions/actionTypes';

const HOTSPOT_TYPES = {
    MEDIA: 'Media',
    Alert: 'Alert',
};

const ZERO_COMMENTS = 0;

const initialState = {};

export default function hotspots(state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_HOTSPOTS_BY_CITY_SUCCESS:
            return { ...state, ...keyby(action.payload.hotspots, 'id') };
        case actionTypes.FETCH_HOTSPOT_SUCCEDED:
        case actionTypes.NEW_HOTSPOT_SAVED:
            return { ...state, [action.payload.hotspot.id]: action.payload.hotspot };
        default:
            return state;
    }
}

const getCurrentHotspotSlug = state => state.componentsState.hotspotModal.currentHotspotSlug;
const getCurrentHotspotId = state => state.componentsState.hotspotModal.currentHotspotId;

const sortMessagesByDate = messagesList =>
    messagesList.sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

const getHotspotBySlug = (state, slug) =>
    Object.values(state.hotspots)
        .filter(hotspot => hotspot.slug === slug && hotspot.type !== HOTSPOT_TYPES.Alert)
        .pop();

export const getHotspotById = (state, id) => state.hotspots[id];

const getCommentsCount = state => state.commentsCount;

const filterMessagesByHotspotId = createSelector(
    state => state.messages,
    (state, hotspotId) => hotspotId,
    (messages, hotspotId) =>
        Object.values(messages).filter(message => message.hotspotId === hotspotId),
);

const getMessagesWithCommentsCount = createSelector(
    [filterMessagesByHotspotId, getCommentsCount],
    (filteredMessages, commentsCount) =>
        filteredMessages.map(
            message =>
                commentsCount[message.id]
                    ? { ...message, commentsCount: commentsCount[message.id] }
                    : { ...message, commentsCount: ZERO_COMMENTS },
        ),
);

export const getReadableHotspot = state => {
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
            messages: sortMessagesByDate(getMessagesWithCommentsCount(state, hotspot.id)),
        };
    }
    return hotspot;
};
