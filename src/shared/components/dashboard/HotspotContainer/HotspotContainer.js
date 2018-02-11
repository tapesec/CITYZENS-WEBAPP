import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Gateway } from 'react-gateway';
import ReactModal2 from 'react-modal2';
import { connect } from 'react-redux';
import Typography from 'rmwc/Typography';
import { Icon } from 'rmwc/Icon';
import { Fab } from 'rmwc/Fab';
import constant from './../../../constants';
import actions from './../../../../client/actions';
import selectors from '../../../../client/selectors';
import WallHotspot from './HotspotViewMod/WallHotspot';
import EventHotspot from './HotspotViewMod/EventHotspot';
import HotspotVisitorActionBar from './HotspotViewMod/HotspotVisitorActionBar';
import './HotspotContainer.scss';

class HotspotContainer extends React.Component {
    constructor() {
        super();
        this.displayContent.bind(this);
    }

    componentDidMount() {
        const { match, openHotspot } = this.props;
        openHotspot(match.params.hotspotSlug);
    }

    componentWillUnmount() {}

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
        // HOTSPOT.TYPE.WALL_MESSAGE
        return (
            <Fragment>
                <HotspotVisitorActionBar />
                <WallHotspot loading={contentIsLoading} hotspot={readableHotspot} />
            </Fragment>
        );
    }

    render() {
        const { history, citySlug } = this.props;
        return (
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
                    <Fab onClick={() => {history.push(`/${citySlug}`);}} className="closeModal" mini theme={['primary-bg', 'text-icon-on-primary']}>
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
                </ReactModal2>
            </Gateway>
        );
    }
}

HotspotContainer.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object.isRequired,
    citySlug: PropTypes.string.isRequired,
    openHotspot: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    citySlug: selectors.getCitySlug(state),
    contentIsLoading: selectors.getHotspotContentLoading(state),
    readableHotspot: selectors.getReadableHotspot(state),
});

const mapDispatchToProps = dispatch => ({
    openHotspot: slug => {
        dispatch(actions.openHotspot(slug));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HotspotContainer);
