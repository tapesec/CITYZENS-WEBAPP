import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';

const duration = 300;

// eslint-disable-next-line
const Drawer = ({ in: inProp, children }) => (
    <Transition in={inProp} timeout={duration}>
        {children}
    </Transition>
);

Drawer.propTypes = {
    children: PropTypes.func.isRequired,
};

export default Drawer;
