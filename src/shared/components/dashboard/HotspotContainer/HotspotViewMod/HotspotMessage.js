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
            Pour cette nouvelle édition de la kermess de l'école, nous cherchons des volontaires
            pour tenir les stands. Nous avons besoins aussi d'une friteuse et d'une machine à
            barbapapa.Nous avons besoins aussi d'une friteuse et d'une machine à barbapapa.
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
