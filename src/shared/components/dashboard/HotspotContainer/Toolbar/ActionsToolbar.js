import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'rmwc/Icon';
import Typography from 'rmwc/Typography';

const ActionsToolbar = ({
    editAction,
    slideShowAction,
    closeAction,
    newMessageAction,
    isEditingWidget,
}) => (
    <Typography
        theme="background text-icon-on-background"
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
        {newMessageAction ? (
            <div role="button" onKeyDown={newMessageAction} tabIndex={0} onClick={newMessageAction}>
                <Icon theme="secondary" strategy="component" title="Nouveau message">
                    create
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
        {closeAction ? (
            <div
                style={{ marginLeft: 'auto', marginRight: '15px' }}
                role="button"
                onKeyDown={closeAction}
                tabIndex={0}
                onClick={closeAction}>
                <Icon strategy="ligature" title="Fermer la fenêtre">
                    {isEditingWidget ? 'keyboard_backspace' : 'clear'}
                </Icon>
            </div>
        ) : null}
    </Typography>
);

ActionsToolbar.propTypes = {
    editAction: PropTypes.func,
    newMessageAction: PropTypes.func,
    slideShowAction: PropTypes.func,
    closeAction: PropTypes.func.isRequired,
    isEditingWidget: PropTypes.bool,
};

ActionsToolbar.defaultProps = {
    editAction: undefined,
    newMessageAction: undefined,
    slideShowAction: undefined,
    isEditingWidget: undefined,
};

export default ActionsToolbar;
