import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'rmwc/Typography';
import ReactFilestack from 'filestack-react';
import config from '../../../../../config';

const fileStackOptions = {
    fromSources: ['local_file_system', 'url', 'webcam'],
    accept: ['image/*', '.pdf'],
    maxSize: 100000,
    maxFiles: 1,
    minFiles: 1,
    lang: 'fr',
    transformations: {
        crop: { force: true },
        circle: true,
    },
};

const SlideshowAdmin = ({ hotspotId, pictures }) => (
    <section className="HotspotContent">
        <Typography tag="h1" theme="text-secondary-on-background" use="display1">
            {"Configurez votre carousel d'image"}
        </Typography>
        <ReactFilestack
            apikey={config.fileStack.apiKey}
            buttonText="Ajoutez une photo au carousel d'image"
            buttonClass="classname"
            options={fileStackOptions}
            onSuccess={() => {}}
        />
    </section>
);

SlideshowAdmin.propTypes = {
    hotspotId: PropTypes.string.isRequired,
    pictures: PropTypes.arrayOf(PropTypes.string),
};

SlideshowAdmin.defaultProps = {
    pictures: [],
};

export default SlideshowAdmin;
