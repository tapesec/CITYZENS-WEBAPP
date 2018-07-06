import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'rmwc/Typography';
import Icon from 'rmwc/Icon';
import ImageCDN from '../../../../../lib/ImageCDN';

const HotspotHeader = ({ title, address, views, hotspotIcon }) => (
    <header
        style={{
            padding: '5px',
            backgroundColor: 'white',
            marginBottom: '10px',
            borderRadius: '5px',
            display: 'flex',
            alignItems: 'center',
        }}>
        <ImageCDN
            process
            processParam="output=format:png/resize=w:60,fit:clip/circle"
            style={{ width: '60px' }}
            alt="icone d'un point d'information"
            filename={hotspotIcon}
        />
        <div style={{ marginLeft: '10px' }}>
            <Typography tag="h1" use="body1" theme="text-primary-on-background">
                {title}
            </Typography>
            <Icon
                theme="text-secondary-on-background"
                style={{ verticalAlign: 'middle' }}
                strategy="ligature">
                location_on
            </Icon>{' '}
            <Typography tag="span" use="body2" theme="text-primary-on-background">
                {address}
            </Typography>
            <Typography
                style={{ marginLeft: '28px' }}
                tag="div"
                use="caption"
                theme="text-secondary-on-background">
                {views} vues
            </Typography>
        </div>
    </header>
);

HotspotHeader.propTypes = {
    title: PropTypes.string,
    address: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
    hotspotIcon: PropTypes.string.isRequired,
};

HotspotHeader.defaultProps = {
    title: undefined,
};

export default HotspotHeader;
