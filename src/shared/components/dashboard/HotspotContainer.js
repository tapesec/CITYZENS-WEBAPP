import React from 'react';
import ReactModal2 from 'react-modal2';
import { connect } from 'react-redux';
import './HotspotContainer.scss';

const HotspotContainer = ({ history }) => (
    <ReactModal2
        // A callback that gets called whenever the `esc` key is pressed, or the
        // backdrop is clicked.
        onClose={() => {
            // closeHotspotContainer('/martignas');
            history.push('/martignas');
        }}
        // Enable/Disable calling `onClose` when the `esc` key is pressed.
        closeOnEsc
        // Enable/Disable calling `onClose` when the backdrop is clicked.
        closeOnBackdropClick
        backdropClassName="HotspotContainer-backdrop"
        modalClassName="HotspotContainer">
        <h1>test modal 2</h1>
    </ReactModal2>
);

export default connect()(HotspotContainer);
