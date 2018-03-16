import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from './../../../../client/actions';

const withViewCounter = WrappedComponent => {
    class ViewCounter extends React.Component {
        componentDidMount() {
            this.props.triggerViewUp(this.props.hotspot.id);
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }
    ViewCounter.propTypes = {
        triggerViewUp: PropTypes.func.isRequired,
        hotspot: PropTypes.shape({
            id: PropTypes.string.isRequired,
        }).isRequired,
    };

    const mapDispatchToProps = dispatch => ({
        triggerViewUp: hotspotId => {
            dispatch(actions.hotspotViewUp(hotspotId));
        },
    });
    return connect(() => ({}), mapDispatchToProps)(ViewCounter);
};

export default withViewCounter;
