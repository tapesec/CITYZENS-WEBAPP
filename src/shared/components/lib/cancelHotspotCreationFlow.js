import constants from '../../constants';

const cancelHotspotCreationFlowIfInitialized = (
    mapOverlayIsVisible,
    hotspotType,
    clearHotspotEdition,
    turnOffMapOverlayVisibility,
) => {
    if (mapOverlayIsVisible) {
        if (typeof window !== 'undefined') {
            // eslint-disable-next-line no-undef
            const markerToolBarIcon = window.document.getElementById(
                `${constants.PAWN_MARKER.ID_PREFIX}${hotspotType}`,
            );
            markerToolBarIcon.classList.remove('selected');
        }
        clearHotspotEdition();
        turnOffMapOverlayVisibility();
    }
};

export default cancelHotspotCreationFlowIfInitialized;
