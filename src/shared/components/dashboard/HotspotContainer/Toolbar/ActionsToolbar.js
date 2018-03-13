import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'rmwc/Icon';
import Typography from 'rmwc/Typography';

const ActionsToolbar = ({ editAction }) => (
    <Typography
        theme="primary-bg text-icon-on-background"
        className="HotspotContainerToolbar"
        use="caption"
        tag="header">
        {editAction ? (
            <div onClick={editAction}>
                <Icon strategy="component" title="editer">
                    mode_edit
                </Icon>
            </div>
        ) : null}

        {/* <div>
            <Icon strategy="component" title="Supprimez le point d'interet">
                delete_forever
            </Icon>
        </div>
        <div>
            <Icon strategy="component" title="Passez en mode privée">
                lock_open
            </Icon>
        </div> */}
        <div>
            <Icon strategy="component" title="Signalez un contenu inaproprié">
                add_alert
            </Icon>
        </div>
    </Typography>
);

ActionsToolbar.propTypes = {
    editAction: PropTypes.func,
};

ActionsToolbar.defaultProps = {
    editAction: undefined,
};

export default ActionsToolbar;
