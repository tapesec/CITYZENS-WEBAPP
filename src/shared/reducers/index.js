import { combineReducers } from 'redux';
import { reducer } from 'redux-form';
import authenticatedCityzen from './authenticatedCityzen';
import componentsState from './componentsState';
import hotspots from './hotspots';
import algolia from './algolia';
import map from './map';
import city from './city';
import messages from './messages';
import edition from './edition';

export default combineReducers({
    authenticatedCityzen,
    componentsState,
    algolia,
    hotspots,
    map,
    city,
    messages,
    edition,
    form: reducer,
});
