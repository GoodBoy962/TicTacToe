import 'normalize.css';
import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';

import {Router, Route} from 'react-router';
import {Provider} from 'react-redux';
import {Store, History} from '../store/index';

import Main from './Main';

History.push('/');

const Root = () => (
    <Provider store={Store}>
        <Router history={History}>
            <Route path='/' component={Main}/>
        </Router>
    </Provider>
);

export default Root;