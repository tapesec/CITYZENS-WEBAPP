import constants from './../constants';

const generateTitleForMarker = hotspot => {
    const { HOTSPOT } = constants;
    const currentHotspot = hotspot._highlightResult || hotspot; // eslint-disable-line no-underscore-dangle

    if (hotspot.type === HOTSPOT.TYPE.ALERT) {
        if (hotspot.iconType === HOTSPOT.ICON.ACCIDENT) return HOTSPOT.ALERT.LABEL.ACCIDENT;
        if (hotspot.iconType === HOTSPOT.ICON.DESTRUCTION) return HOTSPOT.ALERT.LABEL.DESTRUCTION;
        if (hotspot.iconType === HOTSPOT.ICON.HANDICAP) return HOTSPOT.ALERT.LABEL.HANDICAP;
        if (hotspot.iconType === HOTSPOT.ICON.ROAD_WORKS) return HOTSPOT.ALERT.LABEL.ROAD_WORKS;
    }
    return currentHotspot.title.value || currentHotspot.title;
};

const generateAvatarForAlertHotspot = hotspot => {
    const { HOTSPOT } = constants;

    if (hotspot.type === HOTSPOT.TYPE.ALERT) {
        if (hotspot.iconType === HOTSPOT.ICON.ACCIDENT) return HOTSPOT.ALERT.AVATAR_ICON.ACCIDENT;
        if (hotspot.iconType === HOTSPOT.ICON.DESTRUCTION)
            return HOTSPOT.ALERT.AVATAR_ICON.DESTRUCTION;
        if (hotspot.iconType === HOTSPOT.ICON.HANDICAP) return HOTSPOT.ALERT.AVATAR_ICON.HANDICAP;
        if (hotspot.iconType === HOTSPOT.ICON.ROAD_WORKS)
            return HOTSPOT.ALERT.AVATAR_ICON.ROAD_WORKS;
    }
    return hotspot.title;
};

/**
 * @param number distance in meter
 */
const formatDistance = distance => {
    if (distance > 1000) {
        return `${Number.parseFloat(distance / 1000).toFixed(1)} Km`;
    }
    return `${distance} m`;
};

export default {
    generateTitleForMarker,
    generateAvatarForAlertHotspot,
    formatDistance,
};
