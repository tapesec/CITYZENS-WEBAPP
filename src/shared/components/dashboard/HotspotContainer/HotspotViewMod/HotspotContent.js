import React from 'react';
import Typography from 'rmwc/Typography';

const HotspotContent = ({ hotspot }) => (

    <Typography theme="secondary" tag="h2" use="display1">
        {hotspot.title}
    </Typography>
);

export default HotspotContent;
