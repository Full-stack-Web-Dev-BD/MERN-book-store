import React, { Component } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import PublicRoute from './Component/util/PublicRoute'
import ProtectedRoute from './Component/util/ProtectedRoute'

import CreatePost from './Component/ProtectedComponent/CreatePost'



import Login from './Component/PublicComponent/Login'
import Register from './Component/PublicComponent/Register'
import Dashboard from './Component/ProtectedComponent/Dashboard';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/home" component={Dashboard} />
                    <PublicRoute path='/home' component={Dashboard} />
                    <PublicRoute path='/login' component={Login} />
                    <PublicRoute path='/register' component={Register} />
                    <Redirect from="/" to="/home" />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;