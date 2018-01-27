import React from 'react';
import PropTypes from 'prop-types';
import { Gateway } from 'react-gateway';
import ReactModal2 from 'react-modal2';
import { connect } from 'react-redux';
import actions from './../../../../client/actions';
import HotspotContent from './HotspotViewMod/HotspotContent';
import selectors from '../../../../client/selectors';
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
        if (!readableHotspot) {
            return <p>Loading …</p>;
        }
        return <HotspotContent loading={contentIsLoading} hotspot={readableHotspot} />;
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
                    {this.displayContent()}
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
