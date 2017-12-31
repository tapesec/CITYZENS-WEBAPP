import React, { Fragment } from 'react';

import LeftSideMenu from './LeftSideMenu/LeftSideMenu';
import MapArea from './MapArea';

export default function Dashboard({ props }) {
    return (
        <Fragment>
            <LeftSideMenu />
            <MapArea style={{ height: '100px' }} />
        </Fragment>
    );
}
