import constants from './../constants';

const generateTitleForMarker = hotspot => {
    const { HOTSPOT } = constants;

    if (hotspot.type === HOTSPOT.TYPE.ALERT) {
        if (hotspot.iconType === HOTSPOT.ICON.ACCIDENT) return HOTSPOT.ALERT.LABEL.ACCIDENT;
        if (hotspot.iconType === HOTSPOT.ICON.DESTRUCTION) return HOTSPOT.ALERT.LABEL.DESTRUCTION;
        if (hotspot.iconType === HOTSPOT.ICON.HANDICAP) return HOTSPOT.ALERT.LABEL.HANDICAP;
        if (hotspot.iconType === HOTSPOT.ICON.ROAD_WORKS) return HOTSPOT.ALERT.LABEL.ROAD_WORKS;
    }
    return hotspot.title;
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

export default {
    generateTitleForMarker,
    generateAvatarForAlertHotspot,
};
