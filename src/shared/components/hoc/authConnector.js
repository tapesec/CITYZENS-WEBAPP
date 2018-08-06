import React from 'react';
import { connect } from 'react-redux';
import { isAuthenticated, getCityzenName } from '../../../shared/reducers/authenticatedCityzen';

const mapStateToProps = state => ({
    isAuthenticated: isAuthenticated(state),
    authenticatedCityzenName: getCityzenName(state),
});

const authConnector = ComponentToWrap =>
    connect(mapStateToProps)(props => <ComponentToWrap {...props} />);

export default authConnector;
