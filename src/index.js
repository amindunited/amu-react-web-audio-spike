import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, IndexRoute, browserHistory, hashHistory} from 'react-router';

import App from './App';
import Home from './components/home/Home';
import './index.css';

console.log('starting...');

ReactDOM.render(
  <Router history={hashHistory} >
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='/home' component={Home} />
    </Route>
  </Router>,
  document.getElementById('root')
);