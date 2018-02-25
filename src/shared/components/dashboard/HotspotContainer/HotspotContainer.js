import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from 'rmwc/Typography';
import { Icon } from 'rmwc/Icon';
import { Fab } from 'rmwc/Fab';
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
    }

    componentDidMount() {
        if (this.props.loadHotspot) this.props.loadHotspot();
    }

    displayContent() {
        const { readableHotspot, contentIsLoading } = this.props;
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
                    <WallHotspot loading={contentIsLoading} hotspot={readableHotspot} />
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

    render() {
        const { closeModal } = this.props;
        return (
            <Modal
                gateway="HotspotModal"
                onClose={closeModal}
                modalClass="HotspotContainer"
                backdropClass="HotspotContainer-backdrop">
                <Fab
                    onClick={closeModal}
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
};

HotspotContainer.defaultProps = {
    readableHotspot: undefined,
    loadHotspot: undefined,
};

const mapStateToProps = state => ({
    citySlug: selectors.getCitySlug(state),
    readableHotspot: selectors.getReadableHotspot(state),
});

export default connect(mapStateToProps)(HotspotContainer);
