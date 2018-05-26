import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../../../../client/actions/';
import { getHotspotTypeDescriptionModal } from '../../../reducers/componentsState';
import { visitorIsStillLocated } from '../../../reducers/visitor';
import Modal from './../../lib/Modal';
import Content from './Content';
import constants from '../../../constants/';

import './Modal.scss';

const { HOTSPOT, PAWN_MARKER } = constants;
const KNOWN_ADDRESS_LABEL = "Je connais l'adresse du point";
const KNOWN_ADDRESS_ICON = 'add_location';
const DROP_MARKER_LABEL = 'Je place le point sur la carte';
const DROP_MARKER_ICON = 'map';
const MY_POSITION_LABEL = 'Je place un point depuis ma position';
const MY_POSITION_ICON = 'gps_fixed';

const HotspotDescriptionModal = ({
    dismissModal,
    hotspotTypeDescriptionModal,
    turnOnMapOverlayVisibility,
    initHotspotCreationMode,
    clearHotspotEdition,
    openHotspotAddressModal,
    initHotspotFromMyPosition,
    visitorIsLocated,
}) => {
    const validAndInitDropMarkerMode = (hotspotType, iconType) => {
        // eslint-disable-next-line no-undef
        const selectPawnMarkerDom = window.document.getElementById(
            `${PAWN_MARKER.ID_PREFIX}${hotspotType}`,
        );
        selectPawnMarkerDom.classList.add('selected');
        turnOnMapOverlayVisibility();
        initHotspotCreationMode(hotspotType, iconType);
        dismissModal(true);
    };

    const validAndOpenAdressModal = (hotspotType, iconType) => {
        initHotspotCreationMode(hotspotType, iconType);
        dismissModal(true);
        openHotspotAddressModal({
            subtitle: 'A quelle adresse doit se trouver le point ?',
            inputLabel: "Saisissez l'adresse ici",
        });
    };

    const createHotspotFromMyPosition = (hotspotType, iconType) => {
        initHotspotCreationMode(hotspotType, iconType);
        dismissModal(true);
        initHotspotFromMyPosition();
    };

    const cancelModal = () => {
        clearHotspotEdition();
        dismissModal(true);
    };

    const displayDescriptionContent = () => {
        const { hotspotType } = hotspotTypeDescriptionModal;
        if (hotspotType === HOTSPOT.TYPE.WALL_MESSAGE) {
            const description = `Ce point vous permet de placer dans votre ville toutes sortes d'informations. Un
            accident, des dégradations, des équipements d'accésibilité pour les
            personnes à mobilités réduite ou même des travaux.`;
            return (
                <Content
                    title="Mur de messages"
                    icon={HOTSPOT.WALL.AVATAR_ICON.DEFAULT}
                    description={description}
                    submitActions={[
                        {
                            func: () => {
                                // validAndInitDropMarkerMode(hotspotType, HOTSPOT.ICON.EVENT);
                                validAndOpenAdressModal(hotspotType, HOTSPOT.ICON.WALL);
                            },
                            label: KNOWN_ADDRESS_LABEL,
                            icon: KNOWN_ADDRESS_ICON,
                        },
                        {
                            func: () => {
                                validAndInitDropMarkerMode(hotspotType, HOTSPOT.ICON.WALL);
                            },
                            label: DROP_MARKER_LABEL,
                            icon: DROP_MARKER_ICON,
                        },
                        {
                            func: () => {
                                createHotspotFromMyPosition(hotspotType, HOTSPOT.ICON.WALL);
                            },
                            label: `${MY_POSITION_LABEL} ${
                                !visitorIsLocated ? '(Pas de GPS)' : ''
                            }`,
                            icon: MY_POSITION_ICON,
                            disabled: !visitorIsLocated,
                        },
                    ]}
                    cancelAction={cancelModal}
                />
            );
        }
        if (hotspotType === HOTSPOT.TYPE.EVENT) {
            const description = `Choisissez ce point si vous organisez un évenement culturel, sportifs ou autres. Vous pouvez définir une date de fin et le point disparaitra automatiquement de la carte.`;
            return (
                <Content
                    title="Evenement avec fin programmée"
                    description={description}
                    icon={HOTSPOT.EVENT.AVATAR_ICON.DEFAULT}
                    submitActions={[
                        {
                            func: () => {
                                validAndOpenAdressModal(hotspotType, HOTSPOT.ICON.EVENT);
                            },
                            label: KNOWN_ADDRESS_LABEL,
                            icon: KNOWN_ADDRESS_ICON,
                        },
                        {
                            func: () => {
                                validAndInitDropMarkerMode(hotspotType, HOTSPOT.ICON.EVENT);
                            },
                            label: DROP_MARKER_LABEL,
                            icon: DROP_MARKER_ICON,
                        },
                        {
                            func: () => {
                                createHotspotFromMyPosition(hotspotType, HOTSPOT.ICON.EVENT);
                            },
                            label: `${MY_POSITION_LABEL} ${
                                !visitorIsLocated ? '(Pas de GPS)' : ''
                            }`,
                            icon: MY_POSITION_ICON,
                            disabled: !visitorIsLocated,
                        },
                    ]}
                    cancelAction={cancelModal}
                />
            );
        }
        if (hotspotType === HOTSPOT.TYPE.ALERT) {
            const description = `Ce point vous permet de placer dans votre ville toutes sortes d'informations. Un
            accident, des dégradations, des équipements d'accésibilité pour les
            personnes à mobilités réduite ou même des travaux.`;
            return (
                <Content
                    title="Signalez une information sur la carte"
                    icon={HOTSPOT.ALERT.AVATAR_ICON.ACCIDENT}
                    description={description}
                    submitActions={[
                        {
                            func: () => {
                                validAndOpenAdressModal(hotspotType, HOTSPOT.ICON.ALERT);
                            },
                            label: KNOWN_ADDRESS_LABEL,
                            icon: KNOWN_ADDRESS_ICON,
                        },
                        {
                            func: () => {
                                validAndInitDropMarkerMode(hotspotType, HOTSPOT.ICON.ALERT);
                            },
                            label: DROP_MARKER_LABEL,
                            icon: DROP_MARKER_ICON,
                        },
                        {
                            func: () => {
                                createHotspotFromMyPosition(hotspotType, HOTSPOT.ICON.ALERT);
                            },
                            label: `${MY_POSITION_LABEL} ${
                                !visitorIsLocated ? '(Pas de GPS)' : ''
                            }`,
                            icon: MY_POSITION_ICON,
                            disabled: !visitorIsLocated,
                        },
                    ]}
                    cancelAction={cancelModal}
                />
            );
        }
        return null;
    };

    return (
        <Modal
            open={hotspotTypeDescriptionModal.open}
            onClose={cancelModal}
            gateway="HotspotModal"
            modalClass="HotspotDescriptionModal"
            backdropClass="HotspotDescription-backdrop">
            <div className="container">{displayDescriptionContent()}</div>
        </Modal>
    );
};

HotspotDescriptionModal.propTypes = {
    dismissModal: PropTypes.func.isRequired,
    hotspotTypeDescriptionModal: PropTypes.shape({
        open: PropTypes.bool.isRequired,
        hotspotType: PropTypes.string,
    }).isRequired,
    visitorIsLocated: PropTypes.bool.isRequired,
    turnOnMapOverlayVisibility: PropTypes.func.isRequired,
    initHotspotCreationMode: PropTypes.func.isRequired,
    clearHotspotEdition: PropTypes.func.isRequired,
    openHotspotAddressModal: PropTypes.func.isRequired,
    initHotspotFromMyPosition: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    hotspotTypeDescriptionModal: getHotspotTypeDescriptionModal(state),
    visitorIsLocated: visitorIsStillLocated(state),
});

const mapDispatchToProps = dispatch => ({
    dismissModal: status => {
        dispatch(actions.showHotspotTypeDescriptionModal(!status, ''));
    },
    turnOnMapOverlayVisibility: () => {
        dispatch(actions.toggleMapOverlayVisibility(true));
    },
    initHotspotCreationMode: (hotspotType, iconType) => {
        dispatch(actions.initSettingUpMode(hotspotType, iconType));
    },
    clearHotspotEdition: () => {
        dispatch(actions.clearHotspotEdition());
    },
    openHotspotAddressModal: modalParams => {
        dispatch(actions.openHotspotAddressModal(modalParams));
    },
    initHotspotFromMyPosition: () => {
        dispatch(actions.initHotspotFromMyPosition());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HotspotDescriptionModal);
