import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from 'rmwc/Typography';
import { Icon } from 'rmwc/Icon';
import { Fab } from 'rmwc/Fab';
import actions from './../../../../client/actions';
import { messageEdition } from './../../../reducers/edition';
import WallHotspot from './HotspotViewMod/WallHotspot';
import EventHotspot from './HotspotViewMod/EventHotspot';
import AlertHotspot from './HotspotViewMod/AlertHotspot';
import Modal from './../../lib/Modal';
import constant from './../../../constants';
import selectors from '../../../../client/selectors';
import HotspotVisitorActionBar from './HotspotViewMod/HotspotVisitorActionBar';

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
            return (
                <Fragment>
                    <HotspotVisitorActionBar />
                    <EventHotspot loading={contentIsLoading} hotspot={readableHotspot} />
                </Fragment>
            );
        }
        if (readableHotspot.type === HOTSPOT.TYPE.WALL_MESSAGE) {
            return (
                <Fragment>
                    <HotspotVisitorActionBar />
                    <WallHotspot
                        loading={contentIsLoading}
                        hotspot={readableHotspot}
                        clearHotspotMessageEdition={clearHotspotMessageEdition}
                    />
                </Fragment>
            );
        }
        return (
            <Fragment>
                <HotspotVisitorActionBar />
                <AlertHotspot loading={contentIsLoading} hotspot={readableHotspot} />
            </Fragment>
        );
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
                <Typography
                    theme="primary-bg text-icon-on-background"
                    className="HotspotContainerToolbar"
                    use="caption"
                    tag="header">
                    <div>
                        <Icon strategy="component" title="editer">
                            mode_edit
                        </Icon>
                    </div>
                    <div>
                        <Icon strategy="component" title="Supprimez le point d'interet">
                            delete_forever
                        </Icon>
                    </div>
                    <div>
                        <Icon strategy="component" title="Passez en mode privée">
                            lock_open
                        </Icon>
                    </div>
                    <div>
                        <Icon strategy="component" title="Fermez">
                            clear
                        </Icon>
                    </div>
                </Typography>
                <Fab
                    onClick={this.closeModal}
                    className="closeModal"
                    mini
                    theme={['primary-bg', 'text-icon-on-primary']}>
                    clear
                </Fab>
                {this.displayContent()}
                <Typography
                    theme="primary-bg text-primary-on-background"
                    className="HotspotContainerFooter"
                    use="caption"
                    tag="footer">
                    <div>
                        <Icon strategy="component">mouse</Icon>
                        <span>129 vues</span>
                    </div>
                    <div>
                        <Icon strategy="component">accessibility</Icon>
                        <span>3 abonnés</span>
                    </div>
                    <div>
                        <Icon strategy="component">group</Icon>
                        <span>2 membres</span>
                    </div>
                </Typography>
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
