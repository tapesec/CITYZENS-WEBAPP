import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TextField, TextFieldIcon } from 'rmwc/TextField';
import { getHits } from './../../../reducers/algolia';
import actions from './../../../../client/actions';
import './../../../../../node_modules/react-custom-scroll/dist/customScroll.css';
import Drawer from './../../lib/Drawer';
import LeftSideMenuContainer from './LeftSideMenuContainer';
import LeftSideMenuHeader from './header/LeftSideMenuHeader';
import LeftSideMenuContent from './content/LeftSideMenuContent';
import SearchResult from './content/searchResult/SearchResult';

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
                            <SearchResult hits={this.props.hits} />
                        </LeftSideMenuContent>
                    </LeftSideMenuContainer>
                )}
            </Drawer>
        );
    }
}

LeftSideMenu.propTypes = {
    open: PropTypes.bool.isRequired,
    hits: PropTypes.arrayOf(PropTypes.object),
    leftSideMenuDidMount: PropTypes.func.isRequired,
    hotspotSearchKeyPress: PropTypes.func.isRequired,
};

LeftSideMenu.defaultProps = {
    hits: [],
};

const mapStateToProps = state => ({
    open: state.componentsVisibility.leftSideMenu.open,
    hits: getHits(state),
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
