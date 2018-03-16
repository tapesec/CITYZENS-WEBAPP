import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Fab } from 'rmwc/Fab';
import actions from './../../../../client/actions';
import { messageEdition } from './../../../reducers/edition';
import WallHotspot from './HotspotViewMod/WallHotspot';
import EventHotspot from './HotspotViewMod/EventHotspot';
import AlertHotspot from './HotspotViewMod/AlertHotspot';
import Modal from './../../lib/Modal';
import constant from './../../../constants';
import selectors from '../../../../client/selectors';

import './HotspotContainer.scss';

class HotspotContainer extends React.Component {
    constructor() {
        super();
        this.displayContent.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        if (this.props.loadHotspot) this.props.loadHotspot();
    }

    displayContent() {
        const { readableHotspot, contentIsLoading, clearHotspotMessageEdition } = this.props;
        const { HOTSPOT } = constant;
        if (!readableHotspot) {
            return <p>Loading …</p>;
        }

        if (readableHotspot.type === HOTSPOT.TYPE.EVENT) {
            return <EventHotspot loading={contentIsLoading} hotspot={readableHotspot} />;
        }
        if (readableHotspot.type === HOTSPOT.TYPE.WALL_MESSAGE) {
            return (
                <WallHotspot
                    loading={contentIsLoading}
                    hotspot={readableHotspot}
                    clearHotspotMessageEdition={clearHotspotMessageEdition}
                />
            );
        }
        return <AlertHotspot loading={contentIsLoading} hotspot={readableHotspot} />;
    }

    closeModal() {
        const {
            closeModal,
            hotspotMessageEditionIsInProgress,
            clearHotspotMessageEdition,
        } = this.props;
        if (hotspotMessageEditionIsInProgress) {
            clearHotspotMessageEdition();
        }
        closeModal();
    }

    render() {
        return (
            <Modal
                gateway="HotspotModal"
                onClose={this.closeModal}
                modalClass="HotspotContainer"
                backdropClass="HotspotContainer-backdrop">
                <Fab
                    onClick={this.closeModal}
                    className="closeModal"
                    mini
                    theme={['primary-bg', 'text-icon-on-primary']}>
                    clear
                </Fab>
                {this.displayContent()}
            </Modal>
        );
    }
}

HotspotContainer.propTypes = {
    closeModal: PropTypes.func.isRequired,
    loadHotspot: PropTypes.func,
    contentIsLoading: PropTypes.bool.isRequired,
    readableHotspot: PropTypes.shape({
        type: PropTypes.string.isRequired,
    }),
    hotspotMessageEditionIsInProgress: PropTypes.bool.isRequired,
    clearHotspotMessageEdition: PropTypes.func.isRequired,
};

HotspotContainer.defaultProps = {
    readableHotspot: undefined,
    loadHotspot: undefined,
};

const mapStateToProps = state => ({
    citySlug: selectors.getCitySlug(state),
    readableHotspot: selectors.getReadableHotspot(state),
    hotspotMessageEditionIsInProgress: messageEdition.isInProgress(state),
});

const mapDispatchToProps = dispatch => ({
    clearHotspotMessageEdition: () => {
        dispatch(actions.clearHotspotMessageEdition());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HotspotContainer);
