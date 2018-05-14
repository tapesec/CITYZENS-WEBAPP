import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';
import { TextField } from 'rmwc/TextField';
import MapOverlay from '../Map/MapOverlay';
import MarkerToolbar from './../MarkerToolbar/MarkerToolbar';
import LeftSideMenuContainer from './LeftSideMenuContainer';
import LeftSideMenuHeader from './header/LeftSideMenuHeader';
import SearchResult from './content/searchResult/SearchResult';
import selectors from './../../../../client/selectors/';
import actions from './../../../../client/actions';
import Drawer from './../../lib/Drawer';

import './../../../../../node_modules/react-custom-scroll/dist/customScroll.css';
import './LeftSideMenu.scss';

class LeftSideMenu extends React.Component {
    constructor() {
        super();
        this.state = {
            dense: false,
        };
        this.searchBoxOnFocus = this.searchBoxOnFocus.bind(this);
        this.searchBoxOnBlur = this.searchBoxOnBlur.bind(this);
    }

    componentDidMount() {
        const WIDTH = window.screen.availWidth; // eslint-disable-line no-undef

        this.props.leftSideMenuDidMount();
        setTimeout(() => {
            this.setState({
                isMobileDevice: WIDTH < 600,
            });
        }, 100);
    }

    searchBoxOnFocus() {
        this.setState({ dense: this.state.isMobileDevice });
    }
    /* Ce timeout permet de passer d'un coup 
    du blur du champ de recherche à l'ouverture du hotspot 
    sans le timeout le focus du champ de recherche est perdu et le hotspot n'est pas ouvert */
    searchBoxOnBlur() {
        /* setTimeout(() => {
            this.setState({ dense: false });
        }, 10); */
        this.setState({ dense: false });
    }

    render() {
        return (
            <Drawer in={this.props.open}>
                {state => (
                    <Fragment>
                        <MarkerToolbar state={state} />
                        <LeftSideMenuContainer state={state}>
                            <LeftSideMenuHeader dense={this.state.dense} />
                            <section className="SearchBox">
                                <TextField
                                    ref={elem => {
                                        this.textField = elem;
                                    }}
                                    onFocus={this.searchBoxOnFocus}
                                    onBlur={this.searchBoxOnBlur}
                                    persistent="true"
                                    withLeadingIcon="filter_list"
                                    label="Filtrez la liste ici"
                                    theme="text-on-primary-background"
                                    outlined
                                    onChange={evt => {
                                        this.props.hotspotSearchKeyPress(evt.target.value);
                                    }}
                                    id="hotspot-search-input-id"
                                />
                            </section>
                            <SearchResult
                                dense={this.state.dense}
                                isMobileDevice={this.state.isMobileDevice}
                                hotspotsList={this.props.hotspotsList}
                                focusHotspot={this.props.focusHotspot}
                                city={this.props.city}
                                openHotspotInSPAModal={this.props.openHotspotInSPAModal}
                                history={this.props.history}
                                toggleLeftSideMenuVisibility={
                                    this.props.toggleLeftSideMenuVisibility
                                }
                            />
                        </LeftSideMenuContainer>
                        <MapOverlay state={state} />
                    </Fragment>
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
    toggleLeftSideMenuVisibility: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-typos
    history: ReactRouterPropTypes.history.isRequired,
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
    toggleLeftSideMenuVisibility: () => {
        dispatch(actions.toggleLeftSideMenuVisibility());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftSideMenu);
