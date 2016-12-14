import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App.jsx';
import Home from './Home.jsx';

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
  </Route>
);

render(
  (
    <Router history={browserHistory} routes={routes}/>
  ),
  document.getElementById('root')
);
