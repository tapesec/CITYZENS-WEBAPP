import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'rmwc/Icon';
import config from './../../config';

import './ImageCDN.scss';

const ImageCDN = props => (
    <div
        className="ImageCDN"
        role="button"
        onKeyUp={props.onClick}
        tabIndex={-1}
        onClick={props.onClick}>
        {props.iconAction ? (
            <div className="overlay">
                <Icon strategy="ligature">{props.iconAction}</Icon>
            </div>
        ) : null}
        {props.loading ? (
            <div className="overlay">
                <div className="loading-message">Suppression en cours...</div>
            </div>
        ) : null}
        {/** */}
        <img
            src={`${config.fileStack.baseContentUrl}${props.filename}?policy=${
                config.fileStack.security.policy
            }&signature=${config.fileStack.security.signature}`}
            alt={props.alt}
            style={props.style}
            className={props.className}
        />
    </div>
);

ImageCDN.propTypes = {
    alt: PropTypes.string.isRequired,
    filename: PropTypes.string.isRequired,
    iconAction: PropTypes.string,
    onClick: PropTypes.func,
    loading: PropTypes.bool,
    style: PropTypes.shape({}),
    className: PropTypes.string,
};

ImageCDN.defaultProps = {
    iconAction: undefined,
    onClick: () => {},
    style: {},
    loading: false,
    className: '',
};

export default ImageCDN;
