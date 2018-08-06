import React from 'react';
import { connect } from 'react-redux';
import actions from './../../../client/actions';

const mapDispatchToProps = dispatch => ({
    openHotspotInUniversalModal: slug => {
        dispatch(actions.openHotspotInUniversalModal(slug));
    },
});

const loadWithSlug = ComponentToWrap =>
    connect(
        null,
        mapDispatchToProps,
    )(props => {
        const loadHotspot = () => {
            props.openHotspotInUniversalModal(props.match.params.hotspotSlug);
        };
        return <ComponentToWrap {...props} loadHotspot={loadHotspot} />;
    });

export default loadWithSlug;
