
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home.js';
import Yahtzee from './components/Yahtzee/Yahtzee.js';
import ToDoList from './components/ToDoList/ToDoList.js';


export default (
    <Switch>
        
        <Route component={ Home } path='/' exact />
        <Route component={ Yahtzee } path='/test' exact />
        <Route component={ ToDoList } path='/todo' exact />

    </Switch>
)
