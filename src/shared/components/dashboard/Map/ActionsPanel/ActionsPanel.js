import React, { Fragment } from 'react';
import { Fab } from 'rmwc/Fab';
import Typography from 'rmwc/Typography';
import { Tooltip } from 'react-tippy';
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
                    <Tooltip
                        arrow
                        html={
                            <div>
                                <Typography tag="h3" use="subheading2">
                                    Mur de message
                                </Typography>
                                <Typography tag="p" use="body2">
                                    Déposez sur la carte un mur de message pour tenir au courant les
                                    citizens des dernières nouvelles de votre commerce ou
                                    association
                                </Typography>
                            </div>
                        }
                        theme="light"
                        position="bottom"
                        trigger="mouseenter">
                        <img src={wallHotspotIcon} alt="Mur de message" />
                    </Tooltip>
                </div>
                <div className="column">
                    <Tooltip
                        arrow
                        html={
                            <div>
                                <Typography tag="h3" use="subheading2">
                                    Evenement
                                </Typography>
                                <Typography tag="p" use="body2">
                                    Déposez sur la carte un évenement, ce point a une durée limitée
                                    il disparaitra automatiquement à la date que vous aurez
                                    spécifié.
                                </Typography>
                            </div>
                        }
                        theme="light"
                        position="bottom"
                        trigger="mouseenter">
                        <img src={eventHotspotIcon} alt="Evenement" />
                    </Tooltip>
                </div>
                <div className="column">
                    <Tooltip
                        arrow
                        html={
                            <div>
                                <Typography tag="h3" use="subheading2">
                                    Accident de voie publique
                                </Typography>
                                <Typography tag="p" use="body2">
                                    Vous constatez un accident de la circulation, d'un véhicule ou
                                    piéton ou même une perturbation de la circulation, signalez le
                                    avec un court message.
                                </Typography>
                            </div>
                        }
                        theme="light"
                        position="right"
                        trigger="mouseenter">
                        <img src={AlertHotspotMarkerCarIcon} alt="Accident" />
                    </Tooltip>
                    <Tooltip
                        arrow
                        html={
                            <div>
                                <Typography tag="h3" use="subheading2">
                                    Dégradation ou vandalisme
                                </Typography>
                                <Typography tag="p" use="body2">
                                    Vous pouvez signaler avec un court message descriptif, une
                                    dégradation, usure ou acte de vandalisme dans la ville
                                </Typography>
                            </div>
                        }
                        theme="light"
                        position="right"
                        trigger="mouseenter">
                        <img src={AlertHotspotMarkerDestructIcon} alt="Degradation voie publique" />
                    </Tooltip>
                    <Tooltip
                        arrow
                        html={
                            <div>
                                <Typography tag="h3" use="subheading2">
                                    Equipement pour personne à mobilité réduite
                                </Typography>
                                <Typography tag="p" use="body2">
                                    Signalez sur la carte les équipements (rampe, place de parking
                                    ..) facilitant l'accès aux personnes à mobilité réduite.
                                </Typography>
                            </div>
                        }
                        theme="light"
                        position="right"
                        trigger="mouseenter">
                        <img src={AlertHotspotMarkerHandicapIcon} alt="Accessibilité handicapé" />
                    </Tooltip>
                </div>
            </div>
        </div>
    </Fragment>
);

export default ActionsPanel;
