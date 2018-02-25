import React from 'react';
import PropTypes from 'prop-types';
import { Gateway } from 'react-gateway';
import ReactModal2 from 'react-modal2';

const Modal = ({ gateway, open, onClose, modalClass, backdropClass, children }) =>
    open ? (
        <Gateway into={gateway}>
            <ReactModal2
                onClose={onClose}
                closeOnEsc
                closeOnBackdropClick
                backdropClassName={backdropClass}
                modalClassName={modalClass}>
                {children}
            </ReactModal2>
        </Gateway>
    ) : null;

Modal.propTypes = {
    gateway: PropTypes.string.isRequired,
    open: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    modalClass: PropTypes.string.isRequired,
    backdropClass: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
    open: true,
};

export default Modal;
