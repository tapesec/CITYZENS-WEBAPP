import React from 'react';
import PropTypes from 'prop-types';
import { Elevation } from 'rmwc/Elevation';

const elevationStyle = {
    margin: '1px 1px 0 1px',
    width: '100%',
};

const imageStyle = {
    boxSizing: 'border-box',
    border: '5px solid white',
    width: '100%',
};

const AlertImage = ({ imageLocation }) => (
    <Elevation z="4" style={elevationStyle}>
        <img
            src={`https://process.filestackapi.com/resize=height:200,w:600,fit:crop,align:center/
                ${imageLocation.split('/')[3]}`}
            style={imageStyle}
            alt="lieu du hotspot"
        />
    </Elevation>
);

AlertImage.propTypes = {
    imageLocation: PropTypes.string.isRequired,
};

export default AlertImage;
