import Transition from 'react-transition-group/Transition';
import React from 'react';

const duration = 300;

const Drawer = ({ in: inProp, children }) => (
  <Transition in={inProp} timeout={duration}>
    {children}
  </Transition>
);

export default Drawer;
