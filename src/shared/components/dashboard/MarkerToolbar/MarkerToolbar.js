import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PawnMarker from './../Map/ActionsPanel/PawnMarker';
import actions from '../../../../client/actions';
import constant from './../../../constants';

import './MarkerToolbar.scss';

const { HOTSPOT } = constant;

const transitionClasses = {
    entered: { className: 'entered', style: {} },
    entering: { className: 'entering', style: { paddingTop: '70px', boxSizing: 'border-box' } },
    exited: { className: 'exited', style: { paddingTop: '70px', boxSizing: 'border-box' } },
    exiting: { className: 'exiting', style: {} },
};

const MarkerToolbar = ({ state, openHotspotTypeDescription }) => {
    const openWallHotspotDescription = () => {
        openHotspotTypeDescription(true, HOTSPOT.TYPE.WALL_MESSAGE);
    };

    const openEventDescription = () => {
        openHotspotTypeDescription(true, HOTSPOT.TYPE.EVENT);
    };

    const openAlertDescription = () => {
        openHotspotTypeDescription(true, HOTSPOT.TYPE.ALERT);
    };

    return (
        <aside
            id="markerToolbar"
            style={{ ...transitionClasses[state].style }}
            className={`MarkerToolbar ${transitionClasses[state].className}`}>
            <div className="MarkerContent">
                <PawnMarker
                    title="Mur de message"
                    text="Déposez sur la carte un mur de message pour tenir au courant les
                                    citizens des dernières nouvelles de votre commerce ou
                                    association"
                    filename={HOTSPOT.WALL.AVATAR_ICON.DEFAULT}
                    iconType={HOTSPOT.ICON.WALL}
                    type={HOTSPOT.TYPE.WALL_MESSAGE}
                    clickAction={openWallHotspotDescription}
                />
                <PawnMarker
                    title="Evenement"
                    text="Déposez sur la carte un évenement, ce point a une durée limitée
                il disparaitra automatiquement à la date que vous aurez
                spécifié."
                    filename={HOTSPOT.EVENT.AVATAR_ICON.DEFAULT}
                    iconType={HOTSPOT.ICON.EVENT}
                    type={HOTSPOT.TYPE.EVENT}
                    clickAction={openEventDescription}
                />
                <PawnMarker
                    title="Accident de voie publique"
                    text="Vous constatez un accident de la circulation, d&apo;un véhicule
                        ou piéton ou même une perturbation de la circulation, signalez
                        le avec un court message."
                    filename={HOTSPOT.ALERT.AVATAR_ICON.ACCIDENT}
                    iconType={HOTSPOT.ICON.ACCIDENT}
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
};

const mapDispatchToProps = dispatch => ({
    openHotspotTypeDescription: (status, hotspotType) => {
        dispatch(actions.showHotspotTypeDescriptionModal(status, hotspotType));
    },
});

export default connect(() => ({}), mapDispatchToProps)(MarkerToolbar);
