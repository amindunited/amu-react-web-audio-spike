import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, IndexRoute, browserHistory} from 'react-router';

import App from './App';
import Home from './components/home/Home';
import './index.css';

ReactDOM.render(
  <Router history={browserHistory} >
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
    </Route>
  </Router>,
  document.getElementById('root')
);