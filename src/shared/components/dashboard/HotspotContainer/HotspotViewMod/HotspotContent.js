import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'rmwc/Typography';
import CustomScroll from 'react-custom-scroll';

import DateFormater from './../../../lib/DateFormater';
import './HotspotContent.scss';

const HotspotContent = ({ hotspot }) => (
    <section className="HotspotContent">
        <header style={{ marginBottom: 30 }}>
            <h1>{hotspot.title}</h1>
        </header>
        <CustomScroll>
            <div style={{height: 350 }}>
                {hotspot.messages.map(message => (
                    <article key={message.id} className="Messages">
                        <header>
                            <Typography
                                style={{ marginBottom: 10 }}
                                use="headline"
                                tag="h2"
                                theme="secondary">
                                {message.title}
                            </Typography>
                            <Typography
                                style={{ marginBottom: 10 }}
                                use="caption"
                                tag="p"
                                theme="primary-dark">
                                Rédigé par <strong>{message.author.pseudo}</strong>{' '}
                                <DateFormater date={message.createdAt} />.{' '}
                                <DateFormater labelPrefix="Mis à jour" date={message.updatedAt} />
                            </Typography>
                        </header>
                        <Typography use="subheading2" tag="p">
                            Pour cette nouvelle édition de la kermess de l'école, nous cherchons des
                            volontaires pour tenir les stands. Nous avons besoins aussi d'une
                            friteuse et d'une machine à barbapapa.
                        </Typography>
                        <Typography use="subheading2" tag="p">
                            Voici encore du texte pour voir ce que ça donne le test de différentes
                            polices de caractères.
                        </Typography>
                        <Typography use="subheading2" tag="p">
                            Il était une fois un marchand de foie qui vendait du foie dans la ville
                            de Foix Il se dit mafois c'est bien la première et la dernière fois que
                            je vendrai du foie dans la ville de Foix.
                        </Typography>
                    </article>
                ))}
            </div>
        </CustomScroll>
    </section>
);

HotspotContent.propTypes = {
    hotspot: PropTypes.object.isRequired,
};

export default HotspotContent;
