import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TextField, TextFieldIcon } from 'rmwc/TextField';
import selectors from './../../../../client/selectors/';
import actions from './../../../../client/actions';
import Drawer from './../../lib/Drawer';
import LeftSideMenuContainer from './LeftSideMenuContainer';
import LeftSideMenuHeader from './header/LeftSideMenuHeader';
import LeftSideMenuContent from './content/LeftSideMenuContent';
import SearchResult from './content/searchResult/SearchResult';
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
                                withLeadingIcon={<TextFieldIcon use="search" />}
                                label="Que cherchez vous ?"
                                onChange={evt => {
                                    this.props.hotspotSearchKeyPress(evt.target.value);
                                }}
                            />
                            <SearchResult hotspotsList={this.props.hotspotsList} />
                        </LeftSideMenuContent>
                    </LeftSideMenuContainer>
                )}
            </Drawer>
        );
    }
}

LeftSideMenu.propTypes = {
    open: PropTypes.bool.isRequired,
    hotspotsList: PropTypes.arrayOf(PropTypes.object),
    leftSideMenuDidMount: PropTypes.func.isRequired,
    hotspotSearchKeyPress: PropTypes.func.isRequired,
};

LeftSideMenu.defaultProps = {
    hotspotsList: []
};

const mapStateToProps = state => ({
    open: state.componentsVisibility.leftSideMenu.open,
    hotspotsList: selectors.getHotspotsForSearchList(state)
});

const mapDispatchToProps = dispatch => ({
    leftSideMenuDidMount: () => {
        dispatch(actions.leftSideMenuDidMount());
    },
    hotspotSearchKeyPress: inputValue => {
        dispatch(actions.hotspotSearchKeyPress(inputValue));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftSideMenu);
