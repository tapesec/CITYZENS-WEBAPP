import React from 'react';
import { Tooltip } from 'react-tippy';
import Typography from 'rmwc/Typography';
import PropTypes from 'prop-types';

import './PawnMarker.scss';

const PawnMarker = props => {
    const { title, text, img, type, iconType } = props;

    return (
        <div
            data-type="draggablePawnMarker"
            data-icon-type={iconType}
            data-hotspot-type={type}
            data-img={img}>
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
                position="bottom"
                trigger="mouseenter">
                <span
                    data-type="draggablePawnMarker"
                    data-icon-type={iconType}
                    data-hotspot-type={type}
                    data-img={img}>
                    <img
                        src={img}
                        onDragStart={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            return false;
                        }}
                        className="pawn-img"
                        data-type="draggablePawnMarker"
                        data-icon-type={iconType}
                        data-hotspot-type={type}
                        alt={title}
                    />
                </span>
            </Tooltip>
        </div>
    );
};

PawnMarker.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    iconType: PropTypes.string.isRequired,
};

export default PawnMarker;
