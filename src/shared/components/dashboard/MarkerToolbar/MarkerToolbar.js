import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PawnMarker from './../Map/ActionsPanel/PawnMarker';
import actions from '../../../../client/actions';
import { hotspotEdition } from '../../../reducers/edition';
import { mapOverlayIsVisible } from '../../../reducers/componentsState';
import constant from './../../../constants';
import cancelHotspotCreationFlow from '../../lib/cancelHotspotCreationFlow';

import './MarkerToolbar.scss';

const { HOTSPOT, PAWN_MARKER } = constant;

const transitionClasses = {
    entered: { className: 'entered', style: {} },
    entering: { className: 'entering', style: { paddingTop: '70px', boxSizing: 'border-box' } },
    exited: { className: 'exited', style: { paddingTop: '70px', boxSizing: 'border-box' } },
    exiting: { className: 'exiting', style: {} },
};

const MarkerToolbar = ({
    state,
    openHotspotTypeDescription,
    isVisibleMapOverlay,
    turnOffMapOverlayVisibility,
    newSettingUpHotspot,
    clearHotspotEdition,
}) => {
    const openWallHotspotDescription = () => {
        cancelHotspotCreationFlow(
            isVisibleMapOverlay,
            newSettingUpHotspot.type,
            clearHotspotEdition,
            turnOffMapOverlayVisibility,
        );
        openHotspotTypeDescription(true, HOTSPOT.TYPE.WALL_MESSAGE);
    };

    const openEventDescription = () => {
        cancelHotspotCreationFlow(
            isVisibleMapOverlay,
            newSettingUpHotspot.type,
            clearHotspotEdition,
            turnOffMapOverlayVisibility,
        );
        openHotspotTypeDescription(true, HOTSPOT.TYPE.EVENT);
    };

    const openAlertDescription = () => {
        cancelHotspotCreationFlow(
            isVisibleMapOverlay,
            newSettingUpHotspot.type,
            clearHotspotEdition,
            turnOffMapOverlayVisibility,
        );
        openHotspotTypeDescription(true, HOTSPOT.TYPE.ALERT);
    };

    return (
        <aside
            id="markerToolbar"
            style={{ ...transitionClasses[state].style }}
            className={`MarkerToolbar ${transitionClasses[state].className}`}>
            <div className="MarkerContent">
                <PawnMarker
                    id={`${PAWN_MARKER.ID_PREFIX}${HOTSPOT.TYPE.WALL_MESSAGE}`}
                    title="Mur de message"
                    filename={HOTSPOT.WALL.AVATAR_ICON.DEFAULT}
                    iconType={HOTSPOT.ICON.WALL}
                    type={HOTSPOT.TYPE.WALL_MESSAGE}
                    clickAction={openWallHotspotDescription}
                />
                <PawnMarker
                    id={`${PAWN_MARKER.ID_PREFIX}${HOTSPOT.TYPE.EVENT}`}
                    title="Evenement"
                    filename={HOTSPOT.EVENT.AVATAR_ICON.DEFAULT}
                    iconType={HOTSPOT.ICON.EVENT}
                    type={HOTSPOT.TYPE.EVENT}
                    clickAction={openEventDescription}
                />
                <PawnMarker
                    id={`${PAWN_MARKER.ID_PREFIX}${HOTSPOT.TYPE.ALERT}`}
                    title="Point d'information"
                    filename={HOTSPOT.ALERT.AVATAR_ICON.DEFAULT}
                    type={HOTSPOT.TYPE.ALERT}
                    clickAction={openAlertDescription}
                />
            </div>
        </aside>
    );
};

MarkerToolbar.propTypes = {
    state: PropTypes.string.isRequired,
    openHotspotTypeDescription: PropTypes.func.isRequired,
    isVisibleMapOverlay: PropTypes.bool.isRequired,
    turnOffMapOverlayVisibility: PropTypes.func.isRequired,
    newSettingUpHotspot: PropTypes.shape({
        type: PropTypes.string,
    }).isRequired,
    clearHotspotEdition: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    newSettingUpHotspot: hotspotEdition.getCurrentHotspotEdition(state),
    isVisibleMapOverlay: mapOverlayIsVisible(state),
});

const mapDispatchToProps = dispatch => ({
    openHotspotTypeDescription: (status, hotspotType) => {
        dispatch(actions.showHotspotTypeDescriptionModal(status, hotspotType));
    },
    turnOffMapOverlayVisibility: () => {
        dispatch(actions.toggleMapOverlayVisibility(false));
    },
    clearHotspotEdition: () => {
        dispatch(actions.clearHotspotEdition());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MarkerToolbar);
