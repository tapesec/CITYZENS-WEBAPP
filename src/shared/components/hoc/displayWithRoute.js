import React from 'react';
import { connect } from 'react-redux';
import actions from './../../../client/actions';
import selectors from '../../../client/selectors';

const mapStateToProps = state => ({
    citySlug: selectors.getCitySlug(state),
});

const mapDispatchToProps = dispatch => ({
    closeModalInUniversalModal: () => {
        dispatch(actions.closeHotspotInUniversalModal());
    },
});

const displayWithRoutes = ComponentToWrap =>
    connect(mapStateToProps, mapDispatchToProps)(props => {
        const closeModal = () => {
            props.history.push(`/${props.citySlug}`);
            props.closeModalInUniversalModal();
        };
        return <ComponentToWrap {...props} closeModal={closeModal} />;
    });

export default displayWithRoutes;
