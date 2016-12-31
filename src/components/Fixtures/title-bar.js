import React from 'react';
import AppBar from 'material-ui/AppBar';
import SideBar from './side-bar';

class TitleBar extends React.Component {

  constructor(props) {
    super(props);
    //this.Store = props.Store;
    this.SideBarOpen = this.props.Store.SideBar.open;
  }

  toggleMenuBar () {
    this.props.Store.SideBar.open = () => !this.props.Store.SideBar.open;
    console.log('toggleSidebar called', this, this.props.Store.SideBar.open);
    //this.props.menuToggle();
  }

  render () { 
    return (
      <AppBar
        title={this.props.title}
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        onLeftIconButtonTouchTap={ () => { this.toggleMenuBar(); }}
      />
    )
  }
}

export default TitleBar;