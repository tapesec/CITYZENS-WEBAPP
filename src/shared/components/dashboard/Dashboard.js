import React from 'react';
import { Route } from 'react-router-dom';
import LeftSideMenu from './LeftSideMenu';
import Map from './Map';

export default function Dashboard({ match }) {
    return [<LeftSideMenu />, <Map />];
}
