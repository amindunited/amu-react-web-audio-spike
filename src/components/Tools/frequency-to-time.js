import React, { Component } from 'react';
import {observer} from "mobx-react";
import ToolsStore from './tools.store';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Tabs, Tab} from 'material-ui/Tabs';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Keyboard from '../Keyboard/Keyboard';

const styles = {
  customWidth: {
    width: 150,
  },
};

@observer
class FrequencyToTime extends Component {
  constructor (props) {
    super(props);
    this.store = this.props.store;//new ToolsStore().frequencyToTime;
    //this.props.store = this.store;
    console.log('this.sotre', this.store, this.props);
    // setInterval(() => {
    //   console.log('interval ', this.store, this.props.store);
    // }, 5000);
  }
  freqToTime () {
    console.log('freqToTime', this.store.frequency, this);
    this.store.time = Math.round(1000000000*1000/(this.store.frequency))/1000000000;
    console.log('time', this.store.time);
  }
  render () {
    return (
      <Paper>
        <Card>
          <Tabs>
            <Tab label="Source">
              <TextField floatingLabelText="BPM" value={this.store.source_bpm} onChange={(event, val)=>{this.store.source_bpm = val;}}/>
              <TextField floatingLabelText="Length" value={this.store.source_length} onChange={(event, val)=>{this.store.source_length = val;}}/>
              <SelectField
                floatingLabelText="Length Format"
                value={this.store.source_length_format}
                onChange={(event, val) => { this.store.source_length_format = val; }}
                style={styles.customWidth}
              >
                <MenuItem value={"Beats"} primaryText="Beats" />
                <MenuItem value={"Bars"} primaryText="Bars" />
                <MenuItem value={"Ticks"} primaryText="Ticks" />
                <MenuItem value={"Milliseconds"} primaryText="Milliseconds" />
              </SelectField>

              <TextField floatingLabelText="Frequency" value={this.store.source_frequency} onChange={(event, val)=>{this.store.source_frequency = val;}}/>
            </Tab>
            <Tab label="Destination">

            </Tab>
            <Tab label="Result">
              <Keyboard numberOfKeys={88}/>
            </Tab>
          </Tabs>
        </Card>
      </Paper>
    )
  }
}

export default FrequencyToTime;
