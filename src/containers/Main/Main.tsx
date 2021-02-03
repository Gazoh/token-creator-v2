import React from 'react';
// @Custom imports
import { Switch, Route } from 'react-router-dom';
import './Main.scss';
// Containers
import Home from '../Home/Home';
import History from '../../helpers/History';

interface Props { }

function Main(props: Props) {

    return (
        <div className="App">
            <Switch>
                <Route path="/" render={(props) => <Home history={History} {...props} key='' />} />
            </Switch>
        </div>
    )
}

export default Main