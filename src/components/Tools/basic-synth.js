import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import {observer} from "mobx-react";
import MenuItem from 'material-ui/MenuItem';
import Keyboard from '../Keyboard/Keyboard';
import QuertyNotes from './qwerty-notes';

let webAudioContext;

const styles = {
  customWidth: {
    width: 150,
  },
};
@observer
class BasicSynth extends Component {
  constructor (props) {
    super(props);
    this.store = this.props.store;
    this.webAudioInit();
    this.oscillator = null;
    this.gainNode = null;
    this.setUpSound();
    this.qwertyNotes = new QuertyNotes(this.keyDown, this.keyUp);//
    this.qwertyNotes.listen();
    this.activeNotes = [];
  }

  onChange (e) {
    console.log('change happened', e);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('component did update', prevProps, prevState);
    this.setUpSound();
  }

  webAudioInit() {
    webAudioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  setUpSound () {
    this.oscillator = webAudioContext.createOscillator();
    this.gainNode = webAudioContext.createGain();
    this.gainNode.connect(webAudioContext.destination);
    
    this.oscillator.connect(this.gainNode);
    this.oscillator.type = this.store.waveform;
    console.log('this.oscillator.type', this.oscillator.type, this.store.waveform);
    
    //this.oscillator.frequency.value = frequency(40);
    
    this.gainNode.gain.value = 0;//volumeValue;
    
    this.oscillator.start(0);
  }
  componentDidMount () {
    console.log('component did mount');
    ReactDOM.findDOMNode(this).addEventListener('noteOn', (e)=>{this.noteOn(e)});
    ReactDOM.findDOMNode(this).addEventListener('noteOff', (e)=>{this.noteOff(e)});
  }

  keyDown (e) {
    console.log('keydown', e);
    let node = document.querySelector('[data-note-name="'+e.noteName.toUpperCase()+'-4"]');
    console.log('node', node);
    let clickEvent = document.createEvent ('MouseEvents');
    clickEvent.initEvent ('mousedown', true, true);
    node.dispatchEvent (clickEvent);
  }

  keyUp (e) {
    let node = document.querySelector('[data-note-name="'+e.noteName.toUpperCase()+'-4"]');
    let clickEvent = document.createEvent ('MouseEvents');
    clickEvent.initEvent ('mouseup', true, true);
    node.dispatchEvent (clickEvent);
  }

  noteOn (data) {
    
    let freq = data.target.attributes['data-freq'].value;
    let noteIndex = this.activeNotes.indexOf(freq);
    //this.activeNotes.splice(noteIndex, noteIndex+1);
    if (noteIndex >= 0) {
      return;
    }

    console.log('Basic Synth noteOn', data, data.target.attributes['data-note-name'].value);

    console.log(freq, typeof freq);
    //.toFixed(3);
    this.oscillator.frequency.value = parseFloat(freq, 3);
    this.gainNode.gain.value = 1;
    //this.oscillator.start(0);
    this.activeNotes.push(freq);
    console.log('this.oscillator', this.oscillator, this.activeNotes);

  }
  noteOff (data) {
    let freq = data.target.attributes['data-freq'].value;
    let noteIndex = this.activeNotes.indexOf(freq);
    this.activeNotes.splice(noteIndex, noteIndex+1);
    console.log('Basic Synth noteOff', data, noteIndex, this.activeNotes, data.target.attributes['data-note-name'].value);
    if ( !this.activeNotes.length ) {
      this.gainNode.gain.value = 0;
    } else {
      let freq = this.activeNotes[this.activeNotes.length-1];
      console.log('freq', freq);
      this.oscillator.frequency.value = parseFloat(freq, 3);
    }
  }
  render () {
    return (
      <Paper>
        <Card>
          <SelectField
            floatingLabelText="Waveform"
            value={this.store.waveform}
            onChange={(event, index, value) => { this.store.waveform = value; }}
            style={styles.customWidth}
          >
            <MenuItem value={'sine'} primaryText="Sine" />
            <MenuItem value={'square'} primaryText="Square" />
            <MenuItem value={'sawtooth'} primaryText="Sawtooth" />
            <MenuItem value={'triangle'} primaryText="Triangle" />
          </SelectField>
          <SelectField
            floatingLabelText="Keys"
            value={this.store.numberOfKeys}
            onChange={(event, index, value) => { console.log('...number of keys', index, value); this.store.numberOfKeys = value; }}
            style={styles.customWidth}
          >
            <MenuItem value={25} primaryText="25" />
            <MenuItem value={37} primaryText="37" />
            <MenuItem value={49} primaryText="49" />
            <MenuItem value={61} primaryText="61" />
            <MenuItem value={76} primaryText="76" />
            <MenuItem value={88} primaryText="88" />
          </SelectField>
          <Keyboard numberOfKeys={this.store.numberOfKeys} noteOn={this.noteOn} noteOff={this.noteOff}/>
        </Card>
      </Paper>
    );
  }
}
export default BasicSynth;