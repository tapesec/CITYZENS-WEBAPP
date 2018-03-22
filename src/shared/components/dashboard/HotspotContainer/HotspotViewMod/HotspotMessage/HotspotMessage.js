import React from 'react';
import Typography from 'rmwc/Typography';
import Icon from 'rmwc/Icon';
import PropTypes from 'prop-types';
import DateFormater from '../../../../lib/DateFormater';
import '../HotspotMessage.scss';

const HotspotMessage = ({ message, cityzenIsAuthor, edit }) => {
    const editMessage = () => {
        edit(message.id, message.title, message.body, message.pinned);
    };

    const displayEditAction = () =>
        cityzenIsAuthor ? (
            <Icon className="edit-icon" strategy="ligature" onClick={editMessage}>
                mode_edit
            </Icon>
        ) : null;

    return (
        <article key={message.id} className="HotspotMessage">
            <header>
                {displayEditAction()}
                <Typography style={{ marginBottom: 10 }} use="headline" tag="h2" theme="secondary">
                    {message.title}
                </Typography>
                <Typography style={{ marginBottom: 10 }} use="body1" tag="p" theme="primary-dark">
                    Rédigé par <strong>{message.author.pseudo}</strong>{' '}
                    <DateFormater duration date={message.createdAt} />.{' '}
                    <DateFormater duration labelPrefix="Mis à jour" date={message.updatedAt} />
                </Typography>
            </header>
            <Typography
                use="subheading2"
                tag="div"
                dangerouslySetInnerHTML={{ __html: message.body }}
            />
        </article>
    );
};

HotspotMessage.propTypes = {
    message: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.shape({
            pseudo: PropTypes.string.isRequired,
        }),
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string,
        body: PropTypes.string.isRequired,
    }).isRequired,
    cityzenIsAuthor: PropTypes.bool,
    edit: PropTypes.func,
};

HotspotMessage.defaultProps = {
    cityzenIsAuthor: false,
    edit: () => {},
};

export default HotspotMessage;
