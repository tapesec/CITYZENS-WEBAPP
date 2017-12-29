import { combineReducers } from 'redux';
import authorizedUser from './authorizedUser';
import componentsVisibility from './componentsVisibility';

export default combineReducers({
    authorizedUser,
    componentsVisibility,
});
