import constants from '../constants';

const generateTitleForMarker = hotspot => {
    const { HOTSPOT } = constants;
    const currentHotspot = hotspot._highlightResult || hotspot; // eslint-disable-line no-underscore-dangle

    if (hotspot.type === HOTSPOT.TYPE.ALERT) {
        return HOTSPOT.ALERT.MARKER_TITLE.DEFAULT;
    }
    return currentHotspot.title.value || currentHotspot.title;
};

const generateAvatarForAlertHotspot = hotspot => {
    const { HOTSPOT } = constants;

    if (hotspot.type === HOTSPOT.TYPE.ALERT) {
        return HOTSPOT.ALERT.AVATAR_ICON.DEFAULT;
    }
    return hotspot.imageDescriptionLocation;
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
