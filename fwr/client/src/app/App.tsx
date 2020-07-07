import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom"

import './App.css';
import LandingPage from '../containers/LandingPage/LandingPage';
import RestaurantsPage from '../containers/RestaurantsPage/RestaurantsPage';
import SingleRestaurant from '../containers/SingleRestaurant/SingleRestaurant';
import EditRestaurant from '../containers/RestaurantsProfile/RestaurantsProfile';
import RegisterPage from './../containers/RegisterPage/RegisterPage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/restaurants/:foodCategory" component={RestaurantsPage}exact />
        <Route path="/restaurant/:restaurantName" component={SingleRestaurant} exact />
        <Route path="/edit/:restaurantName" component={EditRestaurant} exact />
        <Route path="/register" component={RegisterPage} exact />
        <Redirect from="/" to="/" />
      </Switch>
    </div>
  );
}

export default App;
