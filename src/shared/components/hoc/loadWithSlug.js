import React from 'react';
import { connect } from 'react-redux';
import actions from './../../../client/actions';

const mapDispatchToProps = dispatch => ({
    openHotspot: slug => {
        dispatch(actions.openHotspot(slug));
    },
});

const loadWithSlug = ComponentToWrap =>
    connect(null, mapDispatchToProps)(props => {
        const loadHotspot = () => {
            props.openHotspot(props.match.params.hotspotSlug);
        };
        return <ComponentToWrap {...props} loadHotspot={loadHotspot} />;
    });

export default loadWithSlug;
