import { createStore } from 'redux';

const configureStore = (reducer, preloadedState) => createStore(reducer, preloadedState);
export default configureStore;
