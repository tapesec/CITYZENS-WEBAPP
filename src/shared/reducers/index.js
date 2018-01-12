import { combineReducers } from 'redux';
import authorizedUser from './authorizedUser';
import componentsVisibility from './componentsVisibility';
import hotspots from './hotspots';
import algolia from './algolia';

export default combineReducers({
    authorizedUser,
    componentsVisibility,
    algolia,
    hotspots,
});
