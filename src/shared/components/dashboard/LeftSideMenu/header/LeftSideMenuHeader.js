import React from 'react';
import { DrawerHeader } from 'rmwc/Drawer';
import ImageCDN from '../../../lib/ImageCDN';

import './LeftSideMenuHeader.scss';

const style = {
    display: 'block',
    width: '123px',
    margin: 'auto',
    marginTop: '0',
};

const LeftSideMenuHeader = () => (
    <DrawerHeader className="LeftSideMenuHeader">
        <ImageCDN alt="logo de Cityzens" style={style} filename="TlFeYNnVSSOsm4TT6h6v" />
    </DrawerHeader>
);

export default LeftSideMenuHeader;
