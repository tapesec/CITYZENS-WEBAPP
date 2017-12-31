import React from 'react';
import { PersistentDrawerHeader } from 'rmwc/Drawer';
import logoSvg from './../../../../../server/assets/logo-cityzens.svg';

const style = {
    display: 'block',
    width: '123px',
    margin: 'auto',
    marginTop: '0',
};

const LeftSideMenuHeader = () => (
    <PersistentDrawerHeader>
        <img alt="logo de Cityzens" style={style} src={logoSvg} />
    </PersistentDrawerHeader>
);

export default LeftSideMenuHeader;
