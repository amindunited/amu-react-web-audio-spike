import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import {observer} from 'mobx-react';
import {Link} from 'react-router';

@observer
export default class SideBar extends React.Component {

  handleClose = () => {
    this.props.Store.SideBar.open = false;
  }

  render() {
    return (
      <div>
        <Drawer open={this.props.Store.SideBar.open}>
          <MenuItem onTouchTap={this.handleClose}>
            <Link to='/'>Home</Link>
          </MenuItem>
          <Divider />
          <Subheader>Tools</Subheader>
          <MenuItem onTouchTap={this.handleClose}>
            <Link to='/tools/freq'>Frequency</Link>
          </MenuItem>
          <MenuItem onTouchTap={this.handleClose}>
            <Link to='/tools/synth'>Synth</Link>
          </MenuItem>
          <Divider />
          <MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
          <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
        </Drawer>
      </div>
    );
  }
}