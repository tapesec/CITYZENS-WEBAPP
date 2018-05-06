import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Toolbar, ToolbarRow, ToolbarSection, ToolbarIcon } from 'rmwc/Toolbar';
import { Menu, MenuItem, MenuAnchor } from 'rmwc/Menu';
import Typography from 'rmwc/Typography';
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
                            style={{ left: '10px', backgroundColor: 'white' }}
                            theme="background text-icon-on-background"
                            onClick={() => {
                                this.props.actions.toggleLeftSideMenuVisibility();
                            }}
                            mini>
                            menu
                        </Fab>
                    </ToolbarSection>
                    <ToolbarSection style={{ marginRight: '2rem' }} alignEnd>
                        {!this.props.isAuthenticated ? (
                            <Typography
                                role="button"
                                className="user-disconnected"
                                tag="a"
                                href="/login"
                                use="subheading2">
                                Se connecter
                            </Typography>
                        ) : (
                            <MenuAnchor tag="div">
                                <Menu
                                    open={this.state.menuIsOpen}
                                    onClose={() => this.setState({ menuIsOpen: false })}>
                                    <MenuItem>Se deconnecter</MenuItem>
                                </Menu>

                                <div
                                    role="button"
                                    tabIndex="0"
                                    tag="span"
                                    theme="text-primary-on-background"
                                    use="subheading2"
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
                                    <ToolbarIcon use="account_box" theme="text-icon-on-primary" />
                                    <Typography
                                        tag="span"
                                        theme="text-primary-on-background"
                                        use="subheading2">
                                        {this.props.authenticatedCityzenName}
                                    </Typography>
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

export default connect(() => ({}), mapDispatchToProps)(MainToolbar);
