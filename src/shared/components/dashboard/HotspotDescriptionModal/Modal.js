import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getHotspotTypeDescriptionModal } from '../../../reducers/componentsState';
import Modal from './../../lib/Modal';
import constants from '../../../constants/';

import './Modal.scss';

const { HOTSPOT } = constants;

const HotspotDescriptionModal = ({ dismissModal, hotspotTypeDescriptionModal }) => {
    const displayDescriptionContent = () => {
        if (hotspotTypeDescriptionModal.hotspotType === HOTSPOT.TYPE.WALL_MESSAGE) {
            return (
                <Fragment>
                    <h1>Mur de message</h1>
                    <p>Vous pouvez écrire des messages</p>
                </Fragment>
            );
        }
        return null;
    };
    return (
        <Modal
            open={hotspotTypeDescriptionModal.open}
            onClose={dismissModal}
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
};

const mapStateToProps = state => ({
    hotspotTypeDescriptionModal: getHotspotTypeDescriptionModal(state),
});

export default connect(mapStateToProps, () => ({}))(HotspotDescriptionModal);
