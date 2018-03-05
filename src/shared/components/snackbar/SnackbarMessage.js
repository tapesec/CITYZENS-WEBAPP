import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from 'rmwc/Snackbar';
import Icon from 'rmwc/Icon';
import { connect } from 'react-redux';
import { displaySnackbar, snackbarMessage } from './../../reducers/componentsState';
import actions from './../../../client/actions';

import './SnackbarMessage.scss';

const SnackbarMessage = ({ visible, onDisapear, snackbarMessage: { message, level } }) => {
    const displayIcon = () =>
        level === 'error' ? (
            <Icon strategy="ligature">report_problem</Icon>
        ) : (
            <Icon strategy="ligature">info_outline</Icon>
        );

    const messageContent = () => (
        <div>
            {displayIcon()}
            <span className="message-content">{message}</span>
        </div>
    );
    return (
        <Snackbar
            show={visible}
            onHide={onDisapear}
            message={messageContent()}
            multiline
            actionText="Action"
            style={
                level === 'error' ? { backgroundColor: '#a71212' } : { backgroundColor: '#009688' }
            }
            className="SnackbarMessage"
        />
    );
};

SnackbarMessage.propTypes = {
    visible: PropTypes.bool.isRequired,
    snackbarMessage: PropTypes.shape({
        message: PropTypes.string,
        level: PropTypes.string,
    }).isRequired,
    onDisapear: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    visible: displaySnackbar(state),
    snackbarMessage: snackbarMessage(state),
});

const dispatchToScreen = dispatch => ({
    onDisapear: () => {
        dispatch(actions.messageToScreenOnDisapear());
    },
});

export default connect(mapStateToProps, dispatchToScreen)(SnackbarMessage);
