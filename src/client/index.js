import store from './../shared/store/';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';

import './main.scss';
import App from './../shared/components/App';

hydrate(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>,
    document.getElementById('root')
);
