import React, { Component } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import PublicRoute from './Component/util/PublicRoute'
import ProtectedRoute from './Component/util/ProtectedRoute'
import CreatePost from './Component/ProtectedComponent/CreatePost'

import Login from './Component/PublicComponent/Login'
import Register from './Component/PublicComponent/Register'
import Dashboard from './Component/ProtectedComponent/Dashboard';
import DetailsPage from './Component/ProtectedComponent/DetailsPage';



class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/details' component={DetailsPage} />
                    <PublicRoute path='/login' component={Login} />
                    <PublicRoute path='/register' component={Register} />
                    <Route path="/" component={Dashboard} />
                    {/* <Redirect from="/" to="/home" /> */}
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;