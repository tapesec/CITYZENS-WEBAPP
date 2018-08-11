import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Toolbar, ToolbarRow, ToolbarSection } from 'rmwc/Toolbar';
import { Menu, MenuItem, MenuAnchor } from 'rmwc/Menu';
import Typography from 'rmwc/Typography';
import { Icon } from 'rmwc/Icon';
import Fab from 'rmwc/Fab';
import { leftSideMenuIsOpen } from '../../reducers/componentsState';
import { visitorComeFromMobile } from '../../reducers/visitor';
import actions from './../../../client/actions';

class MainToolbar extends React.Component {
    constructor() {
        super();
        this.state = {
            menuIsOpen: false,
        };
        this.displayIcon = this.displayIcon.bind(this);
        this.getFabStyle = this.getFabStyle.bind(this);
        this.renderFab = this.renderFab.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.isLandingPage = this.isLandingPage.bind(this);
    }

    getFabStyle() {
        if (this.props.isMobile) {
            return { left: '10px', backgroundColor: '#a71212' };
        }
        return { left: '10px', backgroundColor: 'white' };
    }
    isLandingPage() {
        return this.props.location.pathname === '/';
    }
    displayIcon() {
        if (this.props.isMobile) {
            return this.props.leftMenuIsOpen ? 'explore' : 'search';
        }
        return 'menu';
    }

    renderFab() {
        return !this.isLandingPage() ? (
            <Fab
                style={this.getFabStyle()}
                theme={this.props.isMobile ? 'text-primary-on-dark' : 'text-icon-on-background'}
                onClick={() => {
                    this.props.actions.toggleLeftSideMenuVisibility();
                }}
                mini>
                {this.displayIcon()}
            </Fab>
        ) : null;
    }

    renderLogin() {
        if (!this.isLandingPage()) {
            return !this.props.isAuthenticated ? (
                <Fragment>
                    <Typography
                        role="button"
                        className="user-disconnected"
                        tag="a"
                        theme="text-primary-on-background"
                        href="/login"
                        use="body2">
                        Se connecter
                    </Typography>
                </Fragment>
            ) : (
                <MenuAnchor tag="div">
                    <Menu
                        open={this.state.menuIsOpen}
                        onClose={() => this.setState({ menuIsOpen: false })}>
                        <MenuItem className="username-in-menu">
                            <Icon strategy="ligature">face</Icon>
                            {` ${this.props.authenticatedCityzenName}`}
                        </MenuItem>
                        <MenuItem>
                            <Icon strategy="ligature">power_settings_new</Icon> Se deconnecter
                        </MenuItem>
                    </Menu>

                    <div
                        role="button"
                        tabIndex="0"
                        tag="span"
                        theme="text-primary-on-background"
                        use="body2"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                        }}
                        onKeyDown={() => {
                            this.setState({ menuIsOpen: !this.state.menuIsOpen });
                        }}
                        onClick={() => {
                            this.setState({ menuIsOpen: !this.state.menuIsOpen });
                        }}>
                        <Typography
                            tag="span"
                            className="username"
                            theme="text-primary-on-background"
                            use="body2">
                            {this.props.authenticatedCityzenName}
                        </Typography>
                        <Icon strategy="ligature" theme="text-icon-on-background">
                            more_vert
                        </Icon>
                    </div>
                </MenuAnchor>
            );
        }
        return null;
    }

    render() {
        return (
            <Toolbar className="Toolbar">
                <ToolbarRow theme="background">
                    <ToolbarSection alignStart>{this.renderFab()}</ToolbarSection>
                    <ToolbarSection alignEnd>{this.renderLogin()}</ToolbarSection>
                </ToolbarRow>
            </Toolbar>
        );
    }
}

MainToolbar.propTypes = {
    actions: PropTypes.shape({
        toggleLeftSideMenuVisibility: PropTypes.func.isRequired,
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    authenticatedCityzenName: PropTypes.string,
    leftMenuIsOpen: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool.isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
};

MainToolbar.defaultProps = {
    authenticatedCityzenName: undefined,
};

const mapStateToProps = state => ({
    leftMenuIsOpen: leftSideMenuIsOpen(state),
    isMobile: visitorComeFromMobile(state),
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MainToolbar);
