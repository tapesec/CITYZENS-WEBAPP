import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from './../../lib/Modal';
import MediaHotspotForm from './MediaHotspotForm';
import AlertHotspotForm from './AlertHotspotForm';
import actions from './../../../../client/actions';
import { getSettingUpMode, hotspotEdition } from './../../../reducers/edition';
import { settingUpHotspotModalState } from './../../../reducers/componentsState';
import { visitorComeFromMobile } from '../../../reducers/visitor';
import constants from './../../../constants';
import { SNACKBAR } from './../../../../client/wording';
import { NOTIFICATION_MESSAGE } from './../../../../client/constants';

import './SettingUpHotspot.scss';

const { HOTSPOT } = constants;

const SettingUpHotspotModal = ({
    open,
    dismissModal,
    settingUpMode,
    initialValues,
    submitForm,
    closeModal,
    fromMobile,
    displayMessageToScreen,
    removeImage,
}) => {
    const handleSubmit = values => {
        submitForm(settingUpMode, values);
        closeModal();
    };

    const displayFormForSelectedHotspotType = () => {
        const hotspotType = initialValues.type;
        if (hotspotType === HOTSPOT.TYPE.MEDIA) {
            return (
                <MediaHotspotForm
                    settingUpMode={settingUpMode}
                    initialValues={initialValues}
                    dismissModal={dismissModal}
                    onSubmit={handleSubmit}
                    fromMobile={fromMobile}
                    displayMessageToScreen={displayMessageToScreen}
                    removeImage={removeImage}
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
                    fromMobile={fromMobile}
                    displayMessageToScreen={displayMessageToScreen}
                    removeImage={removeImage}
                />
            );
        }
        return null;
    };

    return (
        <Modal
            open={open}
            gateway="HotspotModal"
            onClose={() => {}}
            modalClass="HotspotContainer"
            backdropClass="HotspotContainer-backdrop">
            <section
                className="SettingUpHotspotContainer"
                style={{ overflow: 'auto', height: '100%' }}>
                {displayFormForSelectedHotspotType()}
            </section>
        </Modal>
    );
};

SettingUpHotspotModal.propTypes = {
    open: PropTypes.bool.isRequired,
    fromMobile: PropTypes.bool.isRequired,
    dismissModal: PropTypes.func.isRequired,
    settingUpMode: PropTypes.string.isRequired,
    initialValues: PropTypes.shape({}).isRequired,
    submitForm: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    displayMessageToScreen: PropTypes.func.isRequired,
    removeImage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    open: settingUpHotspotModalState.isOpenSettingUpHotspotModal(state),
    settingUpMode: getSettingUpMode(state),
    initialValues: hotspotEdition.getCurrentHotspotEdition(state),
    fromMobile: visitorComeFromMobile(state),
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
    displayMessageToScreen: () => {
        dispatch(
            actions.displayMessageToScreen(
                SNACKBAR.ERROR.UPDATING_HOTSPOT_FAILED,
                NOTIFICATION_MESSAGE.LEVEL.ERROR,
            ),
        );
    },
    removeImage: handle => {
        dispatch(actions.removeImageWithHandle(handle));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(SettingUpHotspotModal);
