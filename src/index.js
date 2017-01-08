import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, IndexRoute, browserHistory, hashHistory} from 'react-router';

import App from './App';
import Home from './components/Home/Home';
import Tools from './components/Tools/Tools';
import ToolsStore from './components/Tools/tools.store';
import FrequencyToTime from './components/Tools/frequency-to-time';
import BasicSynth from './components/Tools/basic-synth';
import BasicSynthStore from './components/Tools/basic-synth.store'
import './index.css';

console.log('starting...');

ReactDOM.render(
  <Router history={hashHistory} >
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='/home' component={Home} />
      <Route path='/tools' component={Tools}>
        <Route path='freq' component={() => <FrequencyToTime store={new ToolsStore().frequencyToTime}/>}/>
        <Route path='synth' component={() => <BasicSynth store={new BasicSynthStore()}/>}/>
      </Route>
    </Route>
  </Router>,
  document.getElementById('root')
);