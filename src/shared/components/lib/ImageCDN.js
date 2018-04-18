import React from 'react';
import PropTypes from 'prop-types';
import config from './../../config';

const ImageCDN = props => (
    <img src={`${config.fileStack.baseContentUrl}${props.filename}`} alt={props.alt} {...props} />
);

ImageCDN.propTypes = {
    alt: PropTypes.string.isRequired,
    filename: PropTypes.string.isRequired,
};

export default ImageCDN;
