import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import { Typography } from 'rmwc/Typography';
import './../../../../../node_modules/react-tippy/dist/tippy.css';
import wallHotspotIcon from './../../../../server/assets/WallHotspotMarker.svg';

class Marker extends React.Component {
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
                    <img style={style} src={wallHotspotIcon} alt="Icone d'un point d'interêt" />
                </Tooltip>
            </div>
        );
    }
}

Marker.propTypes = {
    tooltipOpen: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    focusHotspotMarker: PropTypes.func.isRequired,
    unfocusHotspotMarker: PropTypes.func.isRequired,
};

export default Marker;
