import React from 'react';
import { Gateway } from 'react-gateway';
import ReactModal2 from 'react-modal2';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import './HotspotContainer.scss';

const HotspotContainer = ({ history }) => (
    <Gateway into="modal">
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
            <h1>title modal</h1>
        </ReactModal2>
    </Gateway>
);

export default connect()(HotspotContainer);
