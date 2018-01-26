import { combineReducers } from 'redux';
import authorizedUser from './authorizedUser';
import componentsState from './componentsState';
import hotspots from './hotspots';
import algolia from './algolia';
import map from './map';
import city from './city';

export default combineReducers({
    authorizedUser,
    componentsState,
    algolia,
    hotspots,
    map,
    city,
});
