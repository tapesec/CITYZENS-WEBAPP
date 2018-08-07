import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DrawerHeader } from 'rmwc/Drawer';
import ImageCDN from '../../../lib/ImageCDN';

import './LeftSideMenuHeader.scss';

const styleCDN = {
    display: 'block',
    width: '123px',
    margin: 'auto',
    marginTop: '0',
};

const logoFilenameId = 'LEcgoqx5RieLXUxo6qup';

const LeftSideMenuHeader = ({ dense }) => (
    <DrawerHeader className={`LeftSideMenuHeader ${dense ? 'dense' : ''}`}>
        {dense ? (
            <h1 className="cityzens-title">CITYZENS</h1>
        ) : (
            <Link to="/">
                <ImageCDN
                    alt="logo de Cityzens"
                    style={styleCDN}
                    process
                    processParam="output=format:jpg/resize=w:250,fit:clip/compress"
                    filename={logoFilenameId}
                />
            </Link>
        )}
    </DrawerHeader>
);

LeftSideMenuHeader.propTypes = {
    dense: PropTypes.bool.isRequired,
};
export default LeftSideMenuHeader;
