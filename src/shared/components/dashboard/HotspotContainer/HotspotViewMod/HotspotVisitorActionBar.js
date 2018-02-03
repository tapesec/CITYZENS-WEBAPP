import React from 'react';
import { Fab } from 'rmwc/Fab';
import './HotspotVisitorActionBar.scss';

const HotspotVisitorActionBar = () => (
    <div className="HotspotVisitorActionBar">
        <Fab mini style={{ backgroundColor: 'red' }}>star_border</Fab>
        <Fab mini style={{ backgroundColor: 'white', color: 'orange' }}>favorite_border</Fab>
        <Fab mini style={{ backgroundColor: 'white', color: 'gray' }}>notifications_none</Fab>
    </div>
);

export default HotspotVisitorActionBar;
