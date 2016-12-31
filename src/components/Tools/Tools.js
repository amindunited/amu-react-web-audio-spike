import React, { Component } from 'react';


class Tools extends Component {
  render() {
    return (
      <div>
        <h3>Tools</h3>
        {this.props.children}
      </div>
    );
  }
}

export default Tools;