import React, { Component } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import PublicRoute from './Component/util/PublicRoute'
import ProtectedRoute from './Component/util/ProtectedRoute'
import CreatePost from './Component/ProtectedComponent/CreatePost'

import Login from './Component/PublicComponent/Login'
import Register from './Component/PublicComponent/Register'
import Dashboard from './Component/ProtectedComponent/Dashboard';
import DetailsPage from './Component/ProtectedComponent/DetailsPage';
import CartPage from './Component/ProtectedComponent/CartPage';
import CheckoutPage from './Component/ProtectedComponent/CheckoutPage';
 
function App() {
    return (
            <BrowserRouter>
                <Switch>

                    <Route path='/details' component={ DetailsPage } />
                    <PublicRoute path='/login' component={Login} />
                    <PublicRoute path='/register' component={Register} />
                    <Route path="/cart" component={CartPage} />
                    <Route path="/checkout" component={CheckoutPage} />
                    <Route path="/" component={Dashboard} />
                    {/* <Redirect from="/" to="/home" /> */}
                </Switch>
            </BrowserRouter> 
    )
}

export default App


 
