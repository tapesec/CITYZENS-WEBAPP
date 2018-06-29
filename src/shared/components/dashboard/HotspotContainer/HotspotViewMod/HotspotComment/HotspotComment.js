import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'rmwc/Typography';
import ImageCDN from '../../../../lib/ImageCDN';
import DateFormater from '../../../../lib/DateFormater';

import './HotspotComment.scss';

const HotspotComment = ({ comment }) => (
    <article className="HotspotComment">
        <div className="message-section">
            <div className="ariane-line" />
            <aside className="cityzen-avatar-aside">
                <ImageCDN
                    filename={
                        comment.author.pictureCityzen ||
                        comment.author.pictureExtern ||
                        'KI9EVeOiS3KbqA5G7es1'
                    }
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
                <Typography
                    tag="p"
                    use="body2"
                    dangerouslySetInnerHTML={{ __html: comment.body }}
                    theme="text-primary-on-background"
                />
            </div>
        </div>
    </article>
);

HotspotComment.propTypes = {
    comment: PropTypes.shape({
        author: PropTypes.shape({
            pseudo: PropTypes.string.isRequired,
        }),
        body: PropTypes.string.isRequired,
    }).isRequired,
};

export default HotspotComment;
