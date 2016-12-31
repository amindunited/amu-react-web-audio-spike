import React, { Component } from 'react';
//required for material-ui v0.16.6
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import ApplicationStore from './ApplicationStore';
import TitleBar from './components/Fixtures/title-bar';
import SideBar from './components/Fixtures/side-bar';
import logo from './logo.svg';
import './App.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  constructor (props) {
    super(props);
    this.Store = new ApplicationStore();
    this.sideBarOpen = false;
    this.title = 'AMU Web Audio Spike'
  }
  leftMenuToggle () {
    console.log('leftMenuToggle', this);
  }
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <TitleBar Store={this.Store} title={this.title}/>
          <SideBar Store={this.Store} />
          <div className="App-header">
            {/*
            <img src={logo} className="App-logo" alt="logo" />
            */}
            <h2>Ready to go!</h2>
            <RaisedButton label="This Button Does Nothing" />
          </div>
          <main>
          {this.props.children}
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
