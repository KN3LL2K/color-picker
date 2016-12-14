import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App.jsx';
import Home from './Home.jsx';

render(
  (
    <Router history={browserHistory} component={App}>
      <Route path="/">
        <IndexRoute component={Home}/>
      </Route>
    </Router>
  ),
  document.getElementById('root')
);
