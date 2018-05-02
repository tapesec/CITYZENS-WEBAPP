import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'rmwc/Icon';
import { Typography } from 'rmwc/Typography';

import './MapOverlay.scss';

const transitionStyles = {
    entered: 'entered',
    entering: 'entering',
    exited: 'exited',
    exiting: 'exiting',
};

const MapOverlay = ({ state }) => (
    <div className={`MapOverlay ${transitionStyles[state]}`}>
        <section className="action-section-description">
            <aside className="action-icon" style={{ marginRight: '5px' }}>
                <Icon strategy="ligature">add_location</Icon>
            </aside>
            <article className="action-label-description">
                <Typography tag="p" use="subheading2">
                    Cliquez / touchez sur la carte le lieu où doit être posé le point
                </Typography>
            </article>
        </section>
    </div>
);

MapOverlay.propTypes = {
    state: PropTypes.string.isRequired,
};

export default MapOverlay;
