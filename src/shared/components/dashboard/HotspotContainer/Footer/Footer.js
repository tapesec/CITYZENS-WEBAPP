import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'rmwc/Typography';
import { Icon } from 'rmwc/Icon';

const Footer = ({ views }) => (
    <Typography
        theme="primary-bg text-primary-on-background"
        className="HotspotContainerFooter"
        use="caption"
        tag="footer">
        <div>
            <Icon strategy="component">mouse</Icon>
            <span>{views} vues</span>
        </div>
        <div>
            <Icon strategy="component">accessibility</Icon>
            <span>3 abonnés</span>
        </div>
        <div>
            <Icon strategy="component">group</Icon>
            <span>2 membres</span>
        </div>
    </Typography>
);

Footer.propTypes = {
    views: PropTypes.number.isRequired,
};

export default Footer;
