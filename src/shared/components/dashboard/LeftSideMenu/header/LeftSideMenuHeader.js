import React from 'react';
import { DrawerHeader } from 'rmwc/Drawer';
import logoSvg from './../../../../../server/assets/logo-cityzens.svg';

import './LeftSideMenuHeader.scss';

const style = {
    display: 'block',
    width: '123px',
    margin: 'auto',
    marginTop: '0',
};

const LeftSideMenuHeader = () => (
    <DrawerHeader className="LeftSideMenuHeader">
        <img alt="logo de Cityzens" style={style} src={logoSvg} />
    </DrawerHeader>
);

export default LeftSideMenuHeader;
