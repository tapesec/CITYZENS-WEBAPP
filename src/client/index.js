import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import reducer from './../shared/reducers/';
import configureStore from './store/';
import App from './../shared/components/App';

// eslint-disable-next-line no-undef
const preloadedState = window.PRELOADED_STATE || {};
const store = configureStore(reducer, preloadedState);

hydrate(
    <Router>
        <Provider store={store}>
            <Route path="/" component={App} />
        </Provider>
    </Router>,
    // eslint-disable-next-line no-undef
    document.getElementById('root'),
);
