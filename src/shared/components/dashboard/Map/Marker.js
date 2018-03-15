import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Tooltip } from 'react-tippy';
import { Typography } from 'rmwc/Typography';
import { Icon } from 'rmwc/Icon';
import constants from './../../../constants';
import WallIcon from './../../../../server/assets/WallHotspotMarker.svg';
import EventIcon from './../../../../server/assets/EventHotspotMarker.svg';
import AccidentIcon from './../../../../server/assets/AlertHotspotMarkerCar.svg';
import DestructionIcon from './../../../../server/assets/AlertHotspotMarkerDestruct.svg';
import HandicapIcon from './../../../../server/assets/AlertHotspotMarkerHandicap.svg';

import './../../../../../node_modules/react-tippy/dist/tippy.css';
import './Marker.scss';

class Marker extends React.Component {
    static mapIconWithIconType(iconType) {
        const iconTypes = {
            WallIcon,
            EventIcon,
            AccidentIcon,
            DestructionIcon,
            HandicapIcon,
        };
        return iconTypes[iconType];
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
            width: MARKER_WIDTH,
            height: MARKER_HEIGHT,
            left: -MARKER_WIDTH / 2,
            top: -MARKER_HEIGHT,
        };
        // eslint-disable-next-line
        if (this.props.$hover) {
            style.cursor = 'pointer';
        }

        return (
            <div
                tabIndex={0}
                role="button"
                style={{ width: 30, height: 30 }}
                onClick={this.focusHotspotMarker}
                onKeyDown={this.focusHotspotMarker}>
                <Tooltip
                    position="top"
                    arrow="true"
                    trigger="click"
                    animateFill="true"
                    distance={83}
                    sticky="true"
                    open={this.state.open}
                    theme="light"
                    interactive
                    onRequestClose={() => {
                        this.props.unfocusHotspotMarker(this.props.hotspotId);
                    }}
                    html={
                        <Typography
                            className="marker-tooltip"
                            theme="text-primary-on-light"
                            use="body1"
                            tag="p"
                            onClick={this.openHotspot}>
                            <span>{this.props.text}</span>
                            <Icon strategy="component">visibility</Icon>
                        </Typography>
                    }>
                    <img
                        style={style}
                        src={Marker.mapIconWithIconType(this.props.iconType)}
                        alt="Icone d'un point d'interêt"
                    />
                </Tooltip>
            </div>
        );
    }
}

Marker.propTypes = {
    tooltipOpen: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    hotspotId: PropTypes.string.isRequired,
    iconType: PropTypes.string.isRequired,
    focusHotspotMarker: PropTypes.func.isRequired,
    unfocusHotspotMarker: PropTypes.func.isRequired,
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
