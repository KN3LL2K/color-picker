import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App.jsx';
import Home from './Home.jsx';
import CreateYourOwn from './CreateYourOwn.jsx';

render(
  (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/create" component={CreateYourOwn}></Route>
      </Route>
    </Router>
  ),
  document.getElementById('root')
);
