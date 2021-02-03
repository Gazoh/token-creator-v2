import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
// @Redux
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension' // DISABLE THIS IN PRODUCTION MODE
import ReduxThunk from 'redux-thunk';
// @Containers
import Main from './containers/Main/Main';
// @Custom imports
import { Router } from 'react-router-dom';
import History from './helpers/History';
import globalReducer from './reducers/Global';

const middleware = [ReduxThunk];

const allReducers = combineReducers({
    globalReducer: globalReducer
});

const store = createStore(allReducers, composeWithDevTools(applyMiddleware(...middleware)));

ReactDOM.render(
    <Provider store={store}>
        <Router history={History}>
            <Main />
        </Router>
    </Provider>
    , document.getElementById('root'));