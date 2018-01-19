import React from 'react';

const Marker = props => {
    const style = {
        backgroundColor: 'yellow',
        boxShadow: '0px 10px 22px 2px gray',
        height: '80px',
        width: '80px',
    };
    if (props.$hover) {
        style.height = '160px';
        style.width = '160px';
    }
    return <div style={style}>{props.text}</div>;
};

export default Marker;
