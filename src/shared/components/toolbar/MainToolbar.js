import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Toolbar, ToolbarRow, ToolbarSection } from 'rmwc/Toolbar';
import { Menu, MenuItem, MenuAnchor } from 'rmwc/Menu';
import Typography from 'rmwc/Typography';
import { Icon } from 'rmwc/Icon';
import Fab from 'rmwc/Fab';
import actions from './../../../client/actions';

class MainToolbar extends React.Component {
    constructor() {
        super();
        this.state = {
            menuIsOpen: false,
        };
    }

    render() {
        return (
            <Toolbar className="Toolbar">
                <ToolbarRow theme="background">
                    <ToolbarSection alignStart>
                        <Fab
                            style={{ left: '10px', backgroundColor: '#a71212' }}
                            theme="text-primary-on-dark"
                            onClick={() => {
                                this.props.actions.toggleLeftSideMenuVisibility();
                            }}
                            mini>
                            search
                        </Fab>
                    </ToolbarSection>
                    <ToolbarSection alignEnd>
                        {!this.props.isAuthenticated ? (
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
                                        <Icon strategy="ligature">power_settings_new</Icon> Se
                                        deconnecter
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
                        )}
                    </ToolbarSection>
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
};

MainToolbar.defaultProps = {
    authenticatedCityzenName: undefined,
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(
    () => ({}),
    mapDispatchToProps,
)(MainToolbar);
