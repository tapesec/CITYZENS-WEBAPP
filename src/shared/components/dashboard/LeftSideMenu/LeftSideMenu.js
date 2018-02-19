import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TextField } from 'rmwc/TextField';

import LeftSideMenuContainer from './LeftSideMenuContainer';
import LeftSideMenuHeader from './header/LeftSideMenuHeader';
import LeftSideMenuContent from './content/LeftSideMenuContent';
import SearchResult from './content/searchResult/SearchResult';
import selectors from './../../../../client/selectors/';
import actions from './../../../../client/actions';
import Drawer from './../../lib/Drawer';

import './../../../../../node_modules/react-custom-scroll/dist/customScroll.css';
import './LeftSideMenu.scss';

class LeftSideMenu extends React.Component {
    componentDidMount() {
        this.props.leftSideMenuDidMount();
    }

    render() {
        return (
            <Drawer in={this.props.open}>
                {state => (
                    <LeftSideMenuContainer state={state}>
                        <LeftSideMenuHeader />
                        <LeftSideMenuContent>
                            <TextField
                                persistent="true"
                                fullwidth
                                withLeadingIcon="search"
                                label="Que cherchez vous ?"
                                theme="text-on-primary-background"
                                onChange={evt => {
                                    this.props.hotspotSearchKeyPress(evt.target.value);
                                }}
                                id="hotspot-search-input-id"
                            />
                            <SearchResult
                                hotspotsList={this.props.hotspotsList}
                                focusHotspot={this.props.focusHotspot}
                                city={this.props.city}
                                openHotspotInSPAModal={this.props.openHotspotInSPAModal}
                            />
                        </LeftSideMenuContent>
                    </LeftSideMenuContainer>
                )}
            </Drawer>
        );
    }
}

LeftSideMenu.propTypes = {
    open: PropTypes.bool.isRequired,
    city: PropTypes.shape({
        name: PropTypes.string.isRequired,
        insee: PropTypes.string.isRequired,
        position2D: PropTypes.shape({
            latitude: PropTypes.number.isRequired,
            longitude: PropTypes.number.isRequired,
        }),
        slug: PropTypes.string.isRequired,
    }).isRequired,
    hotspotsList: PropTypes.arrayOf(PropTypes.object),
    leftSideMenuDidMount: PropTypes.func.isRequired,
    hotspotSearchKeyPress: PropTypes.func.isRequired,
    focusHotspot: PropTypes.func.isRequired,
    openHotspotInSPAModal: PropTypes.func.isRequired,
};

LeftSideMenu.defaultProps = {
    hotspotsList: [],
};

const mapStateToProps = state => ({
    open: state.componentsState.leftSideMenu.open,
    city: state.city,
    hotspotsList: selectors.getHotspotsForSearchList(state),
});

const mapDispatchToProps = dispatch => ({
    leftSideMenuDidMount: () => {
        dispatch(actions.leftSideMenuDidMount());
    },
    hotspotSearchKeyPress: inputValue => {
        dispatch(actions.hotspotSearchKeyPress(inputValue));
    },
    focusHotspot: (lat, lng) => {
        dispatch(actions.focusHotspotInSearchList(lat, lng));
    },
    openHotspotInSPAModal: hotspotId => {
        dispatch(actions.openHotspotInSPAModal(hotspotId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftSideMenu);
