import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography } from 'rmwc/Typography';
import actions from '../../../../client/actions/';
import { getHotspotTypeDescriptionModal } from '../../../reducers/componentsState';
import Modal from './../../lib/Modal';
import SubmitButtons from './../../lib/submitButtons/SubmitButtons';
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
            return (
                <Fragment>
                    <Typography tag="h1" use="headline4" theme="text-secondary-on-background">
                        Mur de message
                    </Typography>
                    <p>Vous pouvez écrire des messages</p>
                    <SubmitButtons
                        submitLabel="Je place le point sur la carte"
                        cancelLabel="Fermer"
                        submitAction={() => {
                            validAndInitDropMarkerMode(hotspotType, HOTSPOT.ICON.WALL);
                        }}
                        cancelAction={cancelModal}
                        submitIcon="add_location"
                        cancelIcon="close"
                    />
                </Fragment>
            );
        }
        if (hotspotType === HOTSPOT.TYPE.EVENT) {
            return (
                <Fragment>
                    <h1>Point à durée limitée</h1>
                    <p>Décrivez l{"'"}évènement</p>
                    <SubmitButtons
                        submitLabel="Je place le point sur la carte"
                        cancelLabel="Fermer"
                        submitAction={() => {
                            validAndInitDropMarkerMode(hotspotType, HOTSPOT.ICON.EVENT);
                        }}
                        cancelAction={cancelModal}
                        submitIcon="add_location"
                        cancelIcon="close"
                    />
                </Fragment>
            );
        }
        if (hotspotType === HOTSPOT.TYPE.ALERT) {
            return (
                <Fragment>
                    <h1>Signalez une information sur la carte</h1>
                    <p>Que se passe t{"'"}il ?</p>
                    <SubmitButtons
                        submitLabel="Je place le point sur la carte"
                        cancelLabel="Fermer"
                        submitAction={() => {
                            validAndInitDropMarkerMode(hotspotType, HOTSPOT.ICON.ALERT);
                        }}
                        cancelAction={cancelModal}
                        submitIcon="add_location"
                        cancelIcon="close"
                    />
                </Fragment>
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
