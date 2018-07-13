import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'rmwc/Typography';
import { Icon } from 'rmwc/Icon';
import ImageCDN from '../../../../lib/ImageCDN';
import DateFormater from '../../../../lib/DateFormater';
import ComboIcon from './../../../../lib/comboIcon/ComboIcon';

import './HotspotComment.scss';

const HotspotComment = ({ comment, deleteComment, hotspotId, cityzenIsAuthor }) => {
    const noop = () => {};

    const removeComment = () => {
        deleteComment(hotspotId, comment.id);
    };

    const getComboContent = () => {
        const content = [{ label: 'Signaler', noop }];
        if (cityzenIsAuthor) {
            content.push({ label: 'Supprimer', action: removeComment });
        }
        return content.map(item => (
            <Typography
                tag="div"
                use="body2"
                className="combo-item"
                key={item.label}
                role="button"
                onClick={() => item.action(item)}>
                {item.label}
            </Typography>
        ));
    };
    return (
        <article className="HotspotComment">
            <div className="message-section">
                <aside className="cityzen-avatar-aside">
                    <ImageCDN
                        filename={
                            comment.author.pictureCityzen ||
                            comment.author.pictureExtern ||
                            'KI9EVeOiS3KbqA5G7es1'
                        }
                        style={{ width: '40px', marginRight: '16px' }}
                        alt="avatar de l'autheur"
                    />
                </aside>
                <div className="content">
                    <header>
                        <Typography
                            style={{ fontWeight: 'bold' }}
                            tag="strong"
                            use="body2"
                            theme="text-primary-on-background">
                            {comment.author.pseudo}
                        </Typography>{' '}
                        <Typography
                            tag="span"
                            style={{ color: 'gray' }}
                            use="body2"
                            theme="text-secondary-on-background">
                            <DateFormater duration date={comment.createdAt} />
                        </Typography>
                    </header>
                    <Typography tag="p" use="body2" theme="text-primary-on-background">
                        {comment.body}
                    </Typography>
                </div>
                {}
                <div className="actions-menu">
                    <ComboIcon
                        actionComponent={() => <Icon strategy="ligature">more_vert</Icon>}
                        className="contextual-action"
                        content={getComboContent()}
                    />
                </div>
            </div>
        </article>
    );
};

HotspotComment.propTypes = {
    comment: PropTypes.shape({
        author: PropTypes.shape({
            pseudo: PropTypes.string.isRequired,
        }),
        body: PropTypes.string.isRequired,
    }).isRequired,
    cityzenIsAuthor: PropTypes.bool.isRequired,
    hotspotId: PropTypes.string.isRequired,
    deleteComment: PropTypes.func.isRequired,
};

export default HotspotComment;
