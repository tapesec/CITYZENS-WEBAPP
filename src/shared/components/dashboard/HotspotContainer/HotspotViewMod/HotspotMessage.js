import React from 'react';
import Typography from 'rmwc/Typography';
import Icon from 'rmwc/Icon';
import PropTypes from 'prop-types';
import DateFormater from './../../../lib/DateFormater';
import './HotspotMessage.scss';

const displayEditAction = cityzenIsAuthor =>
    cityzenIsAuthor ? (
        <Icon className="edit-icon" strategy="ligature">
            mode_edit
        </Icon>
    ) : null;

const HotspotMessage = ({ message, cityzenIsAuthor }) => (
    <article key={message.id} className="HotspotMessage">
        <header>
            {displayEditAction(cityzenIsAuthor)}
            <Typography style={{ marginBottom: 10 }} use="headline" tag="h2" theme="secondary">
                {message.title}
            </Typography>
            <Typography style={{ marginBottom: 10 }} use="caption" tag="p" theme="primary-dark">
                Rédigé par <strong>{message.author.pseudo}</strong>{' '}
                <DateFormater duration date={message.createdAt} />.{' '}
                <DateFormater duration labelPrefix="Mis à jour" date={message.updatedAt} />
            </Typography>
        </header>
        <Typography use="body1" tag="p">
            {message.body}
        </Typography>
    </article>
);

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
};

export default HotspotMessage;
