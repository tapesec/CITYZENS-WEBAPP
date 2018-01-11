import { combineReducers } from 'redux';
import authorizedUser from './authorizedUser';
import componentsVisibility from './componentsVisibility';
import algolia from './algolia';

export default combineReducers({
    authorizedUser,
    componentsVisibility,
    algolia,
});
