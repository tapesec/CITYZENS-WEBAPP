import React from 'react';
import PropTypes from 'prop-types';
import ImageCDN from '../../../../lib/ImageCDN';

const imageStyle = {
    boxSizing: 'border-box',
    borderRadius: '5px',
    width: '100%',
    marginBottom: '10px',
};

const AlertImage = ({ imageLocation }) => (
    <ImageCDN
        process
        processParam="resize=height:200,w:600,fit:crop,align:center/compress"
        filename={imageLocation}
        style={imageStyle}
        alt="lieu du hotspot"
    />
);

AlertImage.propTypes = {
    imageLocation: PropTypes.string.isRequired,
};

export default AlertImage;
