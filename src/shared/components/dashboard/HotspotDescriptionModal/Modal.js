import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../../../../client/actions/';
import { getHotspotTypeDescriptionModal } from '../../../reducers/componentsState';
import Modal from './../../lib/Modal';
import Content from './Content';
import constants from '../../../constants/';

import './Modal.scss';

const { HOTSPOT, PAWN_MARKER } = constants;

const HotspotDescriptionModal = ({
    dismissModal,
    hotspotTypeDescriptionModal,
    turnOnMapOverlayVisibility,
    initHotspotCreationMode,
    clearHotspotEdition,
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
                    submitAction={() => {
                        validAndInitDropMarkerMode(hotspotType, HOTSPOT.ICON.WALL);
                    }}
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
                    submitAction={() => {
                        validAndInitDropMarkerMode(hotspotType, HOTSPOT.ICON.EVENT);
                    }}
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
                    submitAction={() => {
                        validAndInitDropMarkerMode(hotspotType, HOTSPOT.ICON.ALERT);
                    }}
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
    turnOnMapOverlayVisibility: PropTypes.func.isRequired,
    initHotspotCreationMode: PropTypes.func.isRequired,
    clearHotspotEdition: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    hotspotTypeDescriptionModal: getHotspotTypeDescriptionModal(state),
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
});

export default connect(mapStateToProps, mapDispatchToProps)(HotspotDescriptionModal);
