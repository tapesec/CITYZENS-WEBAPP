import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Fab } from 'rmwc/Fab';
import { isAuthenticated } from './../../../../reducers/authenticatedCityzen';
import constant from './../../../../constants';
import PawnMarker from './PawnMarker';
import wallHotspotIcon from './../../../../../server/assets/WallHotspotMarker.svg';
import eventHotspotIcon from './../../../../../server/assets/EventHotspotMarker.svg';
import AlertHotspotMarkerCarIcon from './../../../../../server/assets/AlertHotspotMarkerCar.svg';
import AlertHotspotMarkerDestructIcon from './../../../../../server/assets/AlertHotspotMarkerDestruct.svg';
import AlertHotspotMarkerHandicapIcon from './../../../../../server/assets/AlertHotspotMarkerHandicap.svg';

import './ActionsPanel.scss';

const { HOTSPOT } = constant;

const toggleActionsPanelButton = visible =>
    visible ? (
        <Fab className="addHotspotAction">
            location_on<strong>+</strong>
        </Fab>
    ) : (
        <Fab className="addHotspotAction" exited>
            location_on<strong>+</strong>
        </Fab>
    );

const ActionsPanel = ({ actionsPanelButtonVisible }) => (
    <Fragment>
        {toggleActionsPanelButton(actionsPanelButtonVisible)}
        <div className="ActionsPanel">
            <div className="row">
                <div className="column">
                    <PawnMarker
                        title="Mur de message"
                        text="Déposez sur la carte un mur de message pour tenir au courant les
                                    citizens des dernières nouvelles de votre commerce ou
                                    association"
                        img={wallHotspotIcon}
                        iconType={HOTSPOT.ICON.WALL}
                        type={HOTSPOT.TYPE.WALL_MESSAGE}
                    />
                </div>
                <div className="column">
                    <PawnMarker
                        title="Evenement"
                        text="Déposez sur la carte un évenement, ce point a une durée limitée
                        il disparaitra automatiquement à la date que vous aurez
                        spécifié."
                        img={eventHotspotIcon}
                        iconType={HOTSPOT.ICON.EVENT}
                        type={HOTSPOT.TYPE.EVENT}
                    />
                </div>
                <div className="column">
                    <PawnMarker
                        title="Accident de voie publique"
                        text="Vous constatez un accident de la circulation, d&apo;un véhicule
                        ou piéton ou même une perturbation de la circulation, signalez
                        le avec un court message."
                        img={AlertHotspotMarkerCarIcon}
                        iconType={HOTSPOT.ICON.ACCIDENT}
                        type={HOTSPOT.TYPE.ALERT}
                    />
                    <PawnMarker
                        title="Dégradation ou vandalisme"
                        text="Vous pouvez signaler avec un court message descriptif, une
                        dégradation, usure ou acte de vandalisme dans la ville"
                        img={AlertHotspotMarkerDestructIcon}
                        iconType={HOTSPOT.ICON.DESTRUCTION}
                        type={HOTSPOT.TYPE.ALERT}
                    />
                    <PawnMarker
                        title="Equipement pour personne à mobilité réduite"
                        text="Signalez sur la carte les équipements (rampe, place de parking
                            ..) facilitant l&apo;accès aux personnes à mobilité réduite."
                        img={AlertHotspotMarkerHandicapIcon}
                        iconType={HOTSPOT.ICON.HANDICAP}
                        type={HOTSPOT.TYPE.ALERT}
                    />
                </div>
            </div>
        </div>
    </Fragment>
);

ActionsPanel.propTypes = {
    actionsPanelButtonVisible: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    actionsPanelButtonVisible: isAuthenticated(state),
});

export default connect(mapStateToProps)(ActionsPanel);
