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
        <Typography
            use="subheading2"
            tag="div"
            theme="text-primary-on-light"
            dangerouslySetInnerHTML={{ __html: description.content }}
        />
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
