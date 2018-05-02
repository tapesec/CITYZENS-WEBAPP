import React from 'react';
import { Tooltip } from 'react-tippy';
import Typography from 'rmwc/Typography';
import PropTypes from 'prop-types';
import ImageCDN from '../../../lib/ImageCDN';

import './PawnMarker.scss';

class PawnMarker extends React.Component {
    componentDidMount() {}

    render() {
        const { title, text, filename, type, iconType, clickAction } = this.props;
        return (
            <div
                role="button"
                tabIndex={-1}
                className="PawnMarker"
                data-type="pawnMarker"
                data-icon-type={iconType}
                data-hotspot-type={type}>
                <Tooltip
                    arrow
                    html={
                        <div>
                            <Typography tag="h3" use="subheading2">
                                {title}
                            </Typography>
                            <Typography tag="p" use="body2">
                                {text}
                            </Typography>
                        </div>
                    }
                    theme="light"
                    position="right"
                    trigger="mouseenter">
                    <ImageCDN
                        style={{ width: '50px' }}
                        filename={filename.split('/')[3]}
                        dataType="pawnMarker"
                        data-icon-type={iconType}
                        data-hotspot-type={type}
                        alt={title}
                        onClick={clickAction}
                    />
                </Tooltip>
            </div>
        );
    }
}

PawnMarker.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    filename: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    iconType: PropTypes.string.isRequired,
    clickAction: PropTypes.func.isRequired,
};

export default PawnMarker;
