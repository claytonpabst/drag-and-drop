
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home.js';
import Stopwatch from './components/Stopwatch/Stopwatch.js';


export default (
    <Switch>
        
        <Route component={ Home } path='/' exact />
        <Route component={ Stopwatch } path='/test' exact />

    </Switch>
)
