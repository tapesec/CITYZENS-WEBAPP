import React from 'react';
import { Link } from 'react-router-dom';

export default function LeftSideMenu(props) {
    return (
        <div>
            <h1>Menu de gauche</h1>
            <Link to="/martignas/Mairie">Mairie de Martignas</Link>
        </div>
    );
}
