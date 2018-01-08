import React, { Fragment } from 'react';

import LeftSideMenu from './LeftSideMenu/LeftSideMenu';
import MapArea from './MapArea';

export default function Dashboard() {
    return (
        <Fragment>
            <LeftSideMenu />
            <MapArea />
        </Fragment>
    );
}
