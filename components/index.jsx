import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App.jsx';
import Home from './Home.jsx';
import CreateYourOwn from './CreateYourOwn.jsx';
import Register from './auth/Register.jsx';
import Login from './auth/Login.jsx';
import NotFound from './NotFound.jsx';

render(
  (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/create" component={CreateYourOwn}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route path="/swatch/edit/:id" component={CreateYourOwn}/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  ),
  document.getElementById('root')
);
