import React, {Component} from 'react';
import './Key.css';

class Key extends Component {

  constructor (props) {
    super(props);
    this.state = {active: false};
    this.release = 500;
    this.noMouse = false;
  }

  noteOn (eventProxy, event) {
    if (eventProxy.type === 'touchstart') {
      this.noMouse = true;
    } else if (eventProxy.type === 'mousedown' && this.noMouse) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();

    this.setState({active: true});
    setTimeout(() => {this.noteOff(event, this.oscillator)}, this.release);
  }

  noteOff (eventProxy) {
    if (eventProxy.type === 'touchstart') {
      this.noMouse = true;
    } else if (eventProxy.type === 'mousedown' && this.noMouse) {
      return;
    }
    eventProxy.stopPropagation();
    eventProxy.preventDefault();

    this.setState({active: false});
  }

  render () {
    return (
      <div
        className={"key "+ this.props.keyType +' '+ (this.state.active?'active':'')}
        data-freq={this.props.frequency} 
        data-note-number={this.props.noteNumber}
        data-note-name={this.props.name}
        onTouchStart={(o, e) => { this.noteOn(o, e); }}
        onMouseDown={(o, e) => { this.noteOn(o, e); }}>
        <div className="anim">
          <div className="ripple"></div>
        </div>
      </div>
    );
  }
}

export default Key;