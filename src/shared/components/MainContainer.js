import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarRow, ToolbarSection, ToolbarIcon } from 'rmwc/Toolbar';
import Fab from 'rmwc/Fab';
import actions from './../../client/actions';
import './MainContainer.scss';

const MainContainer = props => (
    <div className="MainContainer">
        <Toolbar className="Toolbar">
            <ToolbarRow>
                <ToolbarSection alignStart>
                    <Fab
                        style={{ left: '20px', color: 'red' }}
                        theme={['primary-bg', 'text-icon-on-primary']}
                        onClick={() => {
                            props.actions.toggleLeftSideMenuVisibility();
                        }}
                        mini>
                        menu
                    </Fab>
                </ToolbarSection>
                <ToolbarSection style={{ marginRight: '2rem' }} alignEnd>
                    <ToolbarIcon use="contact_mail" theme={['text-icon-on-primary']} />
                    <ToolbarIcon use="person_outline" theme={['text-icon-on-primary']} />
                </ToolbarSection>
            </ToolbarRow>
        </Toolbar>
        {props.children}
    </div>
);

MainContainer.propTypes = {
    actions: PropTypes.shape({
        toggleLeftSideMenuVisibility: PropTypes.func.isRequired,
    }).isRequired,
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(() => ({}), mapDispatchToProps)(MainContainer);
