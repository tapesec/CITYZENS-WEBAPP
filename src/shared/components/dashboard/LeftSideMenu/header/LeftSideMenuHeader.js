import React from 'react';
import PropTypes from 'prop-types';
import { DrawerHeader } from 'rmwc/Drawer';
import ImageCDN from '../../../lib/ImageCDN';

import './LeftSideMenuHeader.scss';

const styleCDN = {
    display: 'block',
    width: '123px',
    margin: 'auto',
    marginTop: '0',
};

const LeftSideMenuHeader = ({ dense }) => (
    <DrawerHeader className={`LeftSideMenuHeader ${dense ? 'dense' : ''}`}>
        {dense ? (
            <h1 className="cityzens-title">CITYZENS</h1>
        ) : (
            <ImageCDN alt="logo de Cityzens" style={styleCDN} filename="TlFeYNnVSSOsm4TT6h6v" />
        )}
    </DrawerHeader>
);

LeftSideMenuHeader.propTypes = {
    dense: PropTypes.bool.isRequired,
};
export default LeftSideMenuHeader;
