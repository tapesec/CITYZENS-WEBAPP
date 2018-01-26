import React from 'react';
import PropTypes from 'prop-types';
import { Gateway } from 'react-gateway';
import ReactModal2 from 'react-modal2';
import { connect } from 'react-redux';
import selectors from './../../../client/selectors';
import './HotspotContainer.scss';

const HotspotContainer = ({ history, citySlug }) => (
    <Gateway into="modal">
        <ReactModal2
            // A callback that gets called whenever the `esc` key is pressed, or the
            // backdrop is clicked.
            onClose={() => {
                history.push(`/${citySlug}`);
            }}
            // Enable/Disable calling `onClose` when the `esc` key is pressed.
            closeOnEsc
            // Enable/Disable calling `onClose` when the backdrop is clicked.
            closeOnBackdropClick
            backdropClassName="HotspotContainer-backdrop"
            modalClassName="HotspotContainer">
            <h1>title modal</h1>
        </ReactModal2>
    </Gateway>
);

HotspotContainer.propTypes = {
    // eslint-disable-next-line
    history: PropTypes.object.isRequired,
    citySlug: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
    citySlug: selectors.getCitySlug(state)
});

export default connect(mapStateToProps)(HotspotContainer);
