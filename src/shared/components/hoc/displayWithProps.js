import React from 'react';
import { connect } from 'react-redux';
import actions from './../../../client/actions';
import selectors from './../../../client/selectors';

const mapStateToProps = state => ({
    isOpen: selectors.modalIsOpen(state)
});

const mapDispatchToProps = dispatch => ({
    closeModal: () => {
        dispatch(actions.closeHotspotInSPAModal());
    },
});

const displayWithProps = ComponentToWrap =>
    connect(mapStateToProps, mapDispatchToProps)(
        props => (props.isOpen ? <ComponentToWrap {...props} /> : null),
    );

export default displayWithProps;
