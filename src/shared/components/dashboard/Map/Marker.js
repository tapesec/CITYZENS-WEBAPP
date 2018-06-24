import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Typography } from 'rmwc/Typography';
import ImageCDN from '../../lib/ImageCDN';
import constants from './../../../constants';

import './Marker.scss';

class Marker extends React.Component {
    static mapIconWithIconType(type) {
        const iconTypes = {
            Media: '5lkJTLUSCGxTZL3X3Bgw',
            Alert: 'kZce2J14SxGiGAy2cDNQ',
        };
        return iconTypes[type];
    }

    constructor(props) {
        super(props);
        this.state = {
            open: props.tooltipOpen,
        };
        this.openHotspot = this.openHotspot.bind(this);
        this.focusHotspotMarker = this.focusHotspotMarker.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.tooltipOpen,
        });
    }

    openHotspot() {
        const { HOTSPOT } = constants;
        const { type, openHotspotInSPAModal, citySlug, hotspotSlug, hotspotId } = this.props;
        if (type === HOTSPOT.TYPE.ALERT) {
            openHotspotInSPAModal(hotspotId);
            return;
        }
        this.props.history.push(`/${citySlug}/${hotspotSlug}`);
    }

    focusHotspotMarker() {
        setTimeout(() => {
            this.props.focusHotspotMarker(this.props.hotspotId);
        }, 50);
    }

    render() {
        const MARKER_WIDTH = 52;
        const MARKER_HEIGHT = 83;
        const style = {
            position: 'absolute',
            left: -MARKER_WIDTH / 2,
            top: -MARKER_HEIGHT,
        };
        // eslint-disable-next-line
        return (
            <div
                className="Marker"
                data-type="map-marker"
                tabIndex={0}
                role="button"
                onClick={this.focusHotspotMarker}
                onKeyDown={this.focusHotspotMarker}
                style={style}>
                <div className={`marker-tooltip ${this.state.open ? 'focused' : ''}`}>
                    <div className="tooltip-content">
                        <Typography
                            theme="text-primary-on-light"
                            use="caption"
                            tag="p"
                            onClick={this.openHotspot}>
                            <span className="title">{this.props.text}</span>
                            <br />
                            <span className="open-advice">(Appuyez pour ouvrir)</span>
                        </Typography>
                    </div>
                    <div className="tooltip-arrow" />
                </div>
                <ImageCDN
                    onClick={this.openHotspot}
                    filename={Marker.mapIconWithIconType(this.props.type)}
                    dataType="map-marker"
                    alt="point GPS"
                />
            </div>
        );
    }
}

Marker.propTypes = {
    tooltipOpen: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    hotspotId: PropTypes.string.isRequired,
    focusHotspotMarker: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    openHotspotInSPAModal: PropTypes.func.isRequired,
    citySlug: PropTypes.string.isRequired,
    hotspotSlug: PropTypes.string,
    // eslint-disable-next-line
    history: ReactRouterPropTypes.history.isRequired,
};

Marker.defaultProps = {
    hotspotSlug: undefined,
};

export default Marker;
