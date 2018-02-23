import React, { Fragment } from 'react';
import { Fab } from 'rmwc/Fab';
import PawnMarker from './PawnMarker';
import wallHotspotIcon from './../../../../../server/assets/WallHotspotMarker.svg';
import eventHotspotIcon from './../../../../../server/assets/EventHotspotMarker.svg';
import AlertHotspotMarkerCarIcon from './../../../../../server/assets/AlertHotspotMarkerCar.svg';
import AlertHotspotMarkerDestructIcon from './../../../../../server/assets/AlertHotspotMarkerDestruct.svg';
import AlertHotspotMarkerHandicapIcon from './../../../../../server/assets/AlertHotspotMarkerHandicap.svg';
import './ActionsPanel.scss';

const ActionsPanel = () => (
    <Fragment>
        <Fab className="addHotspotAction">
            location_on<strong>+</strong>
        </Fab>
        <div className="ActionsPanel">
            <div className="row">
                <div className="column">
                    <PawnMarker
                        title="Mur de message"
                        text="Déposez sur la carte un mur de message pour tenir au courant les
                                    citizens des dernières nouvelles de votre commerce ou
                                    association"
                        img={wallHotspotIcon}
                    />
                </div>
                <div className="column">
                    <PawnMarker
                        title="Evenement"
                        text="Déposez sur la carte un évenement, ce point a une durée limitée
                        il disparaitra automatiquement à la date que vous aurez
                        spécifié."
                        img={eventHotspotIcon}
                    />
                </div>
                <div className="column">
                    <PawnMarker
                        title="Accident de voie publique"
                        text="Vous constatez un accident de la circulation, d&apo;un véhicule
                        ou piéton ou même une perturbation de la circulation, signalez
                        le avec un court message."
                        img={AlertHotspotMarkerCarIcon}
                    />
                    <PawnMarker
                        title="Dégradation ou vandalisme"
                        text="Vous pouvez signaler avec un court message descriptif, une
                        dégradation, usure ou acte de vandalisme dans la ville"
                        img={AlertHotspotMarkerDestructIcon}
                    />
                    <PawnMarker
                        title="Equipement pour personne à mobilité réduite"
                        text="Signalez sur la carte les équipements (rampe, place de parking
                            ..) facilitant l&apo;accès aux personnes à mobilité réduite."
                        img={AlertHotspotMarkerHandicapIcon}
                    />
                </div>
            </div>
        </div>
    </Fragment>
);

export default ActionsPanel;
