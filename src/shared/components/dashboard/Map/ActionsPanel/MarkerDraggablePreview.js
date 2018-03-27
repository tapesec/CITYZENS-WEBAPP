import React from 'react';

import './MarkerDraggablePreview.scss';

const MarkerDraggablePreview = () => (
    <div id="markerPreviewArea" style={{ display: 'none', width: '43px', height: '75px' }}>
        <img id="markerDraggablePreview" className="draggable-preview" alt="PawnPreview" />
    </div>
);

export default MarkerDraggablePreview;
