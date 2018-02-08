import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import { Typography } from 'rmwc/Typography';
import './../../../../../node_modules/react-tippy/dist/tippy.css';
import WallIcon from './../../../../server/assets/WallHotspotMarker.svg';
import EventIcon from './../../../../server/assets/EventHotspotMarker.svg';
import AccidentIcon from './../../../../server/assets/AlertHotspotMarkerCar.svg';
import DeteriorationIcon from './../../../../server/assets/AlertHotspotMarkerDestruct.svg';
import HandicapIcon from './../../../../server/assets/AlertHotspotMarkerHandicap.svg';

class Marker extends React.Component {

    static mapIconWithIconType(iconType) {
        const iconTypes = {
            WallIcon,
            EventIcon,
            AccidentIcon,
            DeteriorationIcon,
            HandicapIcon,
        };
        return iconTypes[iconType];
    }

    constructor(props) {
        super(props);
        this.state = {
            open: props.tooltipOpen,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.tooltipOpen,
        });
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
                style={{ width: 30, height: 30 }}
                onClick={() => {
                    setTimeout(() => {
                        this.props.focusHotspotMarker(this.props.id);
                    }, 50);
                }}>
                <Tooltip
                    position="top"
                    arrow="true"
                    trigger="click"
                    animateFill="true"
                    distance={83}
                    sticky="true"
                    open={this.state.open}
                    theme="light"
                    onRequestClose={() => {
                        this.props.unfocusHotspotMarker(this.props.id);
                    }}
                    html={
                        <div>
                            <p>
                                <Typography use="body1">{this.props.text}</Typography>
                            </p>
                        </div>
                    }>
                    <img style={style} src={Marker.mapIconWithIconType(this.props.iconType)} alt="Icone d'un point d'interêt" />
                </Tooltip>
            </div>
        );
    }
}

Marker.propTypes = {
    tooltipOpen: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    iconType: PropTypes.string.isRequired,
    focusHotspotMarker: PropTypes.func.isRequired,
    unfocusHotspotMarker: PropTypes.func.isRequired,
};

export default Marker;
