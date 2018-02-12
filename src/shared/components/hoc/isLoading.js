import React from 'react';
import { connect } from 'react-redux';
import selectors from '../../../client/selectors';

const mapStateToProps = state => ({
    contentIsLoading: selectors.getHotspotContentLoading(state),
});

const isLoading = ComponentToWrap =>
    connect(mapStateToProps)(props => <ComponentToWrap {...props} />);

export default isLoading;
