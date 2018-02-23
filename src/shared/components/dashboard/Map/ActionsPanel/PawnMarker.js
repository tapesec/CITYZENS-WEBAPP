import React from 'react';
import { Tooltip } from 'react-tippy';
import Typography from 'rmwc/Typography';
import PropTypes from 'prop-types';

import './PawnMarker.scss';

const PawnMarker = props => {
    const { title, text, img } = props;

    return (
        <div data-type="draggablePawnMarker" data-img={img}>
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
                <span data-type="draggablePawnMarker" data-img={img}>
                    <img
                        src={img}
                        className="pawn-img"
                        data-type="draggablePawnMarker"
                        style={{}}
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
};

export default PawnMarker;
