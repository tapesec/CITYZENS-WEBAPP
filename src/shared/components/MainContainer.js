import React from 'react';
import PropTypes from 'prop-types';
import SnackbarMessage from './snackbar/SnackbarMessage';

import './MainContainer.scss';

const MainContainer = props => (
    <div className="MainContainer">
        {props.children}
        <SnackbarMessage />
    </div>
);

MainContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainContainer;
