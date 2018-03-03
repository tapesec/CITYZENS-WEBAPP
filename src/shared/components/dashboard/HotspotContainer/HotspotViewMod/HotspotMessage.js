import React from 'react';
import Typography from 'rmwc/Typography';
import PropTypes from 'prop-types';
import DateFormater from './../../../lib/DateFormater';
import './HotspotMessage.scss';

const HotspotMessage = ({ message }) => (
    <article key={message.id} className="HotspotMessage">
        <header>
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
