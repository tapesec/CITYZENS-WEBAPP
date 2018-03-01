import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography } from 'rmwc/Typography';
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
) => {
    if (isLoading) return <div>Chargement …</div>;
    if (hasNetworkError) return <div>Une erreur est survenue …</div>;
    const handleSubmit = values => {
        closeModal();
        submitForm(values);
        openSettingUpHotspotModal();
    };
    return (
        <Fragment>
            <Typography tag="h2" theme="text-on-primary-background" use="subheading2">
                {"L'adresse est elle exacte ?"}
            </Typography>
            <AddressForm
                initialValues={initialValues}
                dismissModal={dismissModal}
                onSubmit={handleSubmit}
            />
        </Fragment>
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
}) => (
    <Modal
        open={open}
        onClose={dismissModal}
        gateway="HotspotModal"
        modalClass="AddressModal"
        backdropClass="AddressModal-backdrop">
        <div className="AddressContainer">
            <Typography tag="h2" theme="text-on-primary-background" use="display1">
                {"Nouveau point d'interêt"}
            </Typography>
            {displayAddressModalContent(
                isLoading,
                hasNetworkError,
                initialValues,
                dismissModal,
                submitForm,
                closeModal,
                openSettingUpHotspotModal,
            )}
        </div>
    </Modal>
);

AddressModal.propTypes = {
    open: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    hasNetworkError: PropTypes.bool.isRequired,
    initialValues: PropTypes.shape({
        address: PropTypes.string,
    }).isRequired,
    closeModal: PropTypes.func.isRequired,
    dismissModal: PropTypes.func.isRequired,
    submitForm: PropTypes.func.isRequired,
    openSettingUpHotspotModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    open: hotspotAddressModalState.isOpenHotspotAddressModal(state),
    hasNetworkError: hotspotAddressModalState.hasNetworkError(state),
    isLoading: hotspotAddressModalState.isLoading(state),
    initialValues: hotspotEdition.getCurrentHotspotEdition(state),
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
});

export default connect(mapStateToProps, mapActionToProps)(AddressModal);
