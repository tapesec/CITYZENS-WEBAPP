import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from './../../lib/Modal';
import WallHotspotForm from './WallHotspotForm';
import EventHotspotForm from './EventHotspotForm';
import AlertHotspotForm from './AlertHotspotForm';
import actions from './../../../../client/actions';
import { getSettingUpMode, hotspotEdition } from './../../../reducers/edition';
import { settingUpHotspotModalState } from './../../../reducers/componentsState';
import constants from './../../../constants';

import './SettingUpHotspot.scss';

const { HOTSPOT } = constants;

const displayFormForSelectedHotspotType = ({
    initialValues,
    handleSubmit,
    dismissModal,
    settingUpMode,
}) => {
    const hotspotType = initialValues.type;
    if (hotspotType === HOTSPOT.TYPE.WALL_MESSAGE) {
        return (
            <WallHotspotForm
                initialValues={initialValues}
                dismissModal={dismissModal}
                onSubmit={handleSubmit}
            />
        );
    }
    if (hotspotType === HOTSPOT.TYPE.EVENT) {
        return (
            <EventHotspotForm
                settingUpMode={settingUpMode}
                initialValues={initialValues}
                dismissModal={dismissModal}
                onSubmit={handleSubmit}
            />
        );
    }
    if (hotspotType === HOTSPOT.TYPE.ALERT) {
        return (
            <AlertHotspotForm
                settingUpMode={settingUpMode}
                initialValues={initialValues}
                dismissModal={dismissModal}
                onSubmit={handleSubmit}
            />
        );
    }
    return null;
};

displayFormForSelectedHotspotType.propTypes = {
    initialValues: PropTypes.shape({}).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    dismissModal: PropTypes.func.isRequired,
    settingUpMode: PropTypes.string.isRequired,
};

const SettingUpHotspotModal = ({
    open,
    dismissModal,
    settingUpMode,
    initialValues,
    submitForm,
    closeModal,
}) => {
    const handleSubmit = values => {
        submitForm(settingUpMode, values);
        closeModal();
    };

    return (
        <Modal
            open={open}
            gateway="HotspotModal"
            onClose={() => {}}
            modalClass="HotspotContainer"
            backdropClass="HotspotContainer-backdrop">
            <section className="SettingUpHotspotContainer">
                {displayFormForSelectedHotspotType({
                    dismissModal,
                    settingUpMode,
                    initialValues,
                    handleSubmit,
                })}
            </section>
        </Modal>
    );
};

SettingUpHotspotModal.propTypes = {
    open: PropTypes.bool.isRequired,
    dismissModal: PropTypes.func.isRequired,
    settingUpMode: PropTypes.string.isRequired,
    initialValues: PropTypes.shape({}).isRequired,
    submitForm: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    open: settingUpHotspotModalState.isOpenSettingUpHotspotModal(state),
    settingUpMode: getSettingUpMode(state),
    initialValues: hotspotEdition.getCurrentHotspotEdition(state),
});

const mapDispatchToProps = dispatch => ({
    closeModal: () => {
        dispatch(actions.closeSettingUpHotspotModal());
    },
    dismissModal: () => {
        dispatch(actions.closeSettingUpHotspotModal());
        dispatch(actions.clearHotspotEdition());
    },
    submitForm: (settingUpMode, formData) => {
        dispatch(actions.saveInStateSettingUpHotspotFormData(formData));
        dispatch(actions.postSettingUpHotspotFormData(settingUpMode));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(SettingUpHotspotModal);
