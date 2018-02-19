import { combineReducers } from 'redux';
import authenticatedCityzen from './authenticatedCityzen';
import componentsState from './componentsState';
import hotspots from './hotspots';
import algolia from './algolia';
import map from './map';
import city from './city';
import messages from './messages';

export default combineReducers({
    authenticatedCityzen,
    componentsState,
    algolia,
    hotspots,
    map,
    city,
    messages,
});
