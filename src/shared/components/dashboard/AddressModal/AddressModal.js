import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddressForm from './AddressForm';
import actions from './../../../../client/actions';
import { hotspotAddressModalState } from './../../../reducers/componentsState';
import { hotspotEdition } from './../../../reducers/edition';
import Modal from './../../lib/Modal';

import './AddressModal.scss';

const displayAddressModalContent = (
    isLoading,
    hasNetworkError,
    initialValues,
    dismissModal,
    submitForm,
    closeModal,
    openSettingUpHotspotModal,
    modalContent,
    geocode,
    geocoding,
    geocodingFailed,
) => {
    if (isLoading) return <div>Chargement …</div>;
    if (hasNetworkError) return <div>Une erreur est survenue …</div>;
    const handleSubmit = values => {
        closeModal();
        submitForm(values);
        openSettingUpHotspotModal();
    };
    return (
        <AddressForm
            initialValues={initialValues}
            dismissModal={dismissModal}
            onSubmit={handleSubmit}
            subtitle={modalContent.subtitle}
            inputLabel={modalContent.inputLabel}
            geocode={geocode}
            geocoding={geocoding}
            geocodingFailed={geocodingFailed}
        />
    );
};

const AddressModal = ({
    open,
    closeModal,
    dismissModal,
    isLoading,
    hasNetworkError,
    initialValues,
    submitForm,
    openSettingUpHotspotModal,
    modalContent,
    geocode,
    geocoding,
    geocodingFailed,
}) => (
    <Modal
        open={open}
        onClose={dismissModal}
        gateway="HotspotModal"
        modalClass="AddressModal"
        backdropClass="AddressModal-backdrop">
        <div className="AddressContainer">
            {displayAddressModalContent(
                isLoading,
                hasNetworkError,
                initialValues,
                dismissModal,
                submitForm,
                closeModal,
                openSettingUpHotspotModal,
                modalContent,
                geocode,
                geocoding,
                geocodingFailed,
            )}
        </div>
    </Modal>
);

AddressModal.propTypes = {
    open: PropTypes.bool.isRequired,
    modalContent: PropTypes.shape({}).isRequired,
    isLoading: PropTypes.bool.isRequired,
    hasNetworkError: PropTypes.bool.isRequired,
    initialValues: PropTypes.shape({
        address: PropTypes.string,
    }).isRequired,
    closeModal: PropTypes.func.isRequired,
    dismissModal: PropTypes.func.isRequired,
    submitForm: PropTypes.func.isRequired,
    openSettingUpHotspotModal: PropTypes.func.isRequired,
    geocode: PropTypes.func.isRequired,
    geocoding: PropTypes.bool.isRequired,
    geocodingFailed: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    open: hotspotAddressModalState.isOpenHotspotAddressModal(state),
    modalContent: hotspotAddressModalState.getHotspotAddressModalContent(state),
    hasNetworkError: hotspotAddressModalState.hasNetworkError(state),
    isLoading: hotspotAddressModalState.isLoading(state),
    initialValues: hotspotEdition.getCurrentHotspotEdition(state),
    geocoding: hotspotAddressModalState.geocoding(state),
    geocodingFailed: hotspotAddressModalState.geocodingFailed(state),
});

const mapActionToProps = dispatch => ({
    closeModal: () => {
        dispatch(actions.closeHotspotAddressModal());
    },
    dismissModal: () => {
        dispatch(actions.closeHotspotAddressModal());
        dispatch(actions.clearHotspotEdition());
    },
    submitForm: formData => {
        dispatch(actions.submitHotspotAddressModal(formData));
    },
    openSettingUpHotspotModal: () => {
        dispatch(actions.openSettingUpHotspotModal());
    },
    geocode: formData => {
        dispatch(actions.geocode(formData));
    },
});

export default connect(
    mapStateToProps,
    mapActionToProps,
)(AddressModal);
