import constants from './../constants';

const generateTitleForMarker = (hotspot) => {
    const { HOTSPOT, MARKER } = constants;

    if (hotspot.type === HOTSPOT.TYPE.ALERT) {
        if (hotspot.iconType === HOTSPOT.ICON.ACCIDENT) return MARKER.LABEL.ACCIDENT;
        if (hotspot.iconType === HOTSPOT.ICON.DESTRUCTION) return MARKER.LABEL.DESTRUCTION;
        if (hotspot.iconType === HOTSPOT.ICON.HANDICAP) return MARKER.LABEL.HANDICAP;
    }
    return hotspot.title;
}

export default {
    generateTitleForMarker,
}
