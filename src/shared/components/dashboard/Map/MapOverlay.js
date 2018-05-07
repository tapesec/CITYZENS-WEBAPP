import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from 'rmwc/Icon';
import { Typography } from 'rmwc/Typography';
import { mapOverlayIsVisible } from '../../../reducers/componentsState';

import './MapOverlay.scss';

const transitionStyles = {
    entered: 'entered',
    entering: 'entering',
    exited: 'exited',
    exiting: 'exiting',
};

const MapOverlay = ({ state, isVisible }) =>
    isVisible ? (
        <div className={`MapOverlay ${transitionStyles[state]}`}>
            <section className="action-section-description">
                <aside className="action-icon">
                    <Icon strategy="ligature">add_location</Icon>
                </aside>
                <article className="action-label-description">
                    <Typography tag="p" use="body1">
                        Cliquez / touchez sur la carte le lieu où doit être posé le point
                    </Typography>
                </article>
            </section>
        </div>
    ) : null;

MapOverlay.propTypes = {
    state: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired,
};

// mapOverlayIsVisible
const mapStateToProps = state => ({
    isVisible: mapOverlayIsVisible(state),
});
export default connect(mapStateToProps)(MapOverlay);
