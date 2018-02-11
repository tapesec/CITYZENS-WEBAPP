import React from 'react';
import Typography from 'rmwc/Typography';
import PropTypes from 'prop-types';
import DateFormater from './../../../lib/DateFormater';

const EventHotspotDescription = ({ description, author }) => (
    <article className="HotspotMessage">
        <header>
            <Typography style={{ marginBottom: 10 }} use="caption" tag="p" theme="primary-dark">
                Rédigé par <strong>{author.pseudo}</strong>{' '}
                <DateFormater duration date={description.updatedAt} />.{' '}
                <DateFormater duration labelPrefix="Mis à jour" date={description.updatedAt} />
            </Typography>
        </header>
        <Typography use="body1" tag="p">
            {description.content}
        </Typography>
        <Typography use="body1" tag="p">
            Voici encore du texte pour voir ce que ça donne le test de différentes polices de
            caractères. Nous avons besoins aussi d'une friteuse et d'une machine à barbapapa.
        </Typography>
        <Typography use="body1" tag="p">
            Il était une fois un marchand de foie qui vendait du foie dans la ville de Foix Il se
            dit mafois c'est bien la première et la dernière fois que je vendrai du foie dans la
            ville de Foix. Nous avons besoins aussi d'une friteuse et d'une machine à barbapapa.
        </Typography>
    </article>
);

EventHotspotDescription.propTypes = {
    author: PropTypes.shape({
        pseudo: PropTypes.string.isRequired,
    }).isRequired,
    description: PropTypes.shape({
        content: PropTypes.string.isRequired,
    }).isRequired,
};

export default EventHotspotDescription;
