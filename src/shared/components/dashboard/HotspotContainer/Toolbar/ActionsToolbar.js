import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'rmwc/Icon';
import Typography from 'rmwc/Typography';

const ActionsToolbar = ({ editAction, slideShowAction }) => (
    <Typography
        theme="primary-bg text-icon-on-background"
        className="HotspotContainerToolbar"
        use="caption"
        tag="header">
        {editAction ? (
            <div role="button" onKeyDown={editAction} tabIndex={0} onClick={editAction}>
                <Icon strategy="component" title="editer">
                    mode_edit
                </Icon>
            </div>
        ) : null}
        {slideShowAction ? (
            <div role="button" onKeyDown={slideShowAction} tabIndex={0} onClick={slideShowAction}>
                <Icon strategy="component" title="Créer ou editer un carousel d'image">
                    perm_media
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
    slideShowAction: PropTypes.func,
};

ActionsToolbar.defaultProps = {
    editAction: undefined,
    slideShowAction: undefined,
};

export default ActionsToolbar;
