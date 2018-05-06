import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Fab } from 'rmwc/Fab';
import actions from './../../../../client/actions';
import { messageEdition } from './../../../reducers/edition';
import {
    selectWidgetCurrentlyEdited,
    widgetIsBeingEdited,
} from './../../../reducers/componentsState';
import WallHotspot from './HotspotViewMod/WallHotspot';
import EventHotspot from './HotspotViewMod/EventHotspot/EventHotspot';
import AlertHotspot from './HotspotViewMod/AlertHotspot/AlertHotspot';
import SlideshowAdmin from './Widgets/Slideshow/SlideshowAdmin';
import Modal from './../../lib/Modal';
import constant from './../../../constants';
import selectors from '../../../../client/selectors';

import './HotspotContainer.scss';

class HotspotContainer extends React.Component {
    constructor() {
        super();
        this.displayContent.bind(this);
        this.callRightContextAction = this.callRightContextAction.bind(this);
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

    displayWidgetConfigurationPageByName(widgetName) {
        const { readableHotspot } = this.props;
        if (widgetName === constant.WIDGET.NAME.MEDIA_SLIDE_SHOW) {
            return (
                <SlideshowAdmin
                    hotspotId={readableHotspot.id}
                    imagesId={readableHotspot.slideShow}
                    storageFolder={`${readableHotspot.author.id}-${readableHotspot.slug}`}
                />
            );
        }
        return (
            <SlideshowAdmin hotspotId={readableHotspot.id} pictures={readableHotspot.slideShow} />
        );
    }

    displayWidgetOrContent() {
        const widgetName = this.props.widgetCurrentlyEdited.name;
        if (widgetName) {
            return this.displayWidgetConfigurationPageByName(widgetName);
        }
        return this.displayContent();
    }

    backFromWidget() {
        this.props.closeHotspotWidgetAdminPage();
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
        if (this.props.widgetIsBeingEdited) {
            this.backFromWidget();
        }
        closeModal();
    }

    callRightContextAction() {
        if (this.props.widgetIsBeingEdited) {
            this.backFromWidget();
        } else {
            this.closeModal();
        }
    }

    render() {
        return (
            <Modal
                gateway="HotspotModal"
                onClose={this.closeModal}
                modalClass="HotspotContainer"
                backdropClass="HotspotContainer-backdrop">
                <Fab
                    onClick={this.callRightContextAction}
                    className="closeModal"
                    mini
                    style={{ backgroundColor: 'white' }}
                    theme="background text-icon-on-background">
                    {this.props.widgetIsBeingEdited ? 'keyboard_backspace' : 'clear'}
                </Fab>
                {this.displayWidgetOrContent()}
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
        slideShow: PropTypes.arrayOf(PropTypes.string),
    }),
    widgetCurrentlyEdited: PropTypes.shape({
        name: PropTypes.string,
    }).isRequired,
    widgetIsBeingEdited: PropTypes.bool.isRequired,
    hotspotMessageEditionIsInProgress: PropTypes.bool.isRequired,
    clearHotspotMessageEdition: PropTypes.func.isRequired,
    closeHotspotWidgetAdminPage: PropTypes.func.isRequired,
};

HotspotContainer.defaultProps = {
    readableHotspot: undefined,
    loadHotspot: undefined,
};

const mapStateToProps = state => ({
    citySlug: selectors.getCitySlug(state),
    readableHotspot: selectors.getReadableHotspot(state),
    hotspotMessageEditionIsInProgress: messageEdition.isInProgress(state),
    widgetCurrentlyEdited: selectWidgetCurrentlyEdited(state),
    widgetIsBeingEdited: widgetIsBeingEdited(state),
});

const mapDispatchToProps = dispatch => ({
    clearHotspotMessageEdition: () => {
        dispatch(actions.clearHotspotMessageEdition());
    },
    closeHotspotWidgetAdminPage: () => {
        dispatch(actions.unselectWidgetToConfigure());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HotspotContainer);
