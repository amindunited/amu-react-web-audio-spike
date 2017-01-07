import React, { Component } from 'react';
import Key from './Key';
import './Keyboard.css';

class Keyboard extends Component {

  constructor (props) {
    super(props);
    this.numberOfKeys = this.props.numberOfKeys ? this.props.numberOfKeys : 88;
    this.keys = [];
  }

  /**
   * Calculates the frequency of a note in Hz
   * @param  {int} noteNumber - The Midi number of the note
   * @return {int} - The frequecy of the note in Hz 
   */
  frequency (noteNumber) {
    var freq;
    var n = (noteNumber+1) - 49;
    freq = Math.pow(2, n/12) * 261.626;//440;
    return freq;
  }

  /**
   * Generates the Midi note name
   * @param  {int} octavePos - The note's position in the octave
   * @param  {int} octave - The Octave of the note
   * @return {string} - The note's name in 'C#-0' format 
   */
  noteName (octavePos, octave) {
    let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    return notes[octavePos] + '-' + octave;
  }

  /**
   * Determines if a key should be black or white
   * @param  {int} keyNumber - The key's midi note number
   * @return {string} - 'Black' of 'White'
   */
  keyType (keyNumber) {
    let keyPos;
    let blackKeyPositions = [1, 3, 6, 8, 10];
    let keyType = 'white';

    if (keyNumber > 12) {
      keyPos = keyNumber % 12;
    }
    if (blackKeyPositions.indexOf(keyPos) >= 0) { keyType='black'; }
    return keyType;

  }

  /**
   * Determine which octaves to use on the keyboard
   * @param  {int} numberOfKeys - The number of keys for the keyboard
   * @return {array} - An array of octave numbers
   */
  calculateOctaves (numberOfKeys) {
    let octaves = [];
    let numberOfOctaves = Math.floor(numberOfKeys/12);
    let numLowerOctaves = Math.ceil(numberOfOctaves/2);
    let numHigherOctaves = Math.floor(numberOfOctaves/2);
    let currentOctave;

    //Lower ocataves are 0 - 4
    currentOctave = 4;
    for (let i = 0; i < numLowerOctaves; i++) {
      octaves.unshift(currentOctave - i);
    }
    //Higher octaves are 5-10
    currentOctave = 5;
    for (let i = 0; i < numHigherOctaves; i++) {
      octaves.push(currentOctave + i);
    }
    return octaves;
  }


  /**
   * @param  {int} i - The note's index in the octave 
   * @param  {int} octNumber - The Octave number that the note belongs to
   * @return {object} - An Object representing the note
   */
  keyStructure (i, octNumber) {
    let noteName = this.noteName(i, octNumber);
    let noteNumber = ((octNumber+1)*12) + (i);
    let frequency = this.frequency((noteNumber-12));

    return {
      keyType: this.keyType(noteNumber)/*black or white*/,
      octave: octNumber /* keyboard octave */,
      key: noteName/* C#-0 - a unique id for react*/,
      name: noteName/*C#-0 - the name of the note (note + octave) */,
      frequency: frequency/*440 - the frequency in hz*/,
      noteNumber: noteNumber/*120 - the midi note number*/
    }
  }

  /**
   * @param  {array} octaves - An array of octave values
   * @param  {int} numberOfKeys - The number of keys for the keyboard
   * @return {object} - An object containing 2 arrays representing the lower, and higher sections of the keyboard
   */
  assignRemainingKeys (octaves, numberOfKeys) {
    let numOfRemainingKeys = numberOfKeys % 12;
    let remainingKeys = {
      higher: [],
      lower: []
    };

    if ( numOfRemainingKeys === 0 ) {
      return remainingKeys;
    } else if (numOfRemainingKeys <= 2) {
      let octNumber = (octaves[octaves.length-1]) + 1;

      for (var i = 0; i < numOfRemainingKeys; i++) {
        remainingKeys.higher.push(this.keyStructure(i, octNumber))
      }
      console.log('remainingKeys ', remainingKeys);
    }

    return remainingKeys;

  }

  /**
   * @param  {int} octNumber - The octave Number
   * @return {array} - An array of objects representing notes
   */
  fillOctave (octNumber) {
    let octave = [];
    for (let i = 0, len = 12; i < len; i++) {
      octave.push(this.keyStructure(i, octNumber));
    }
    return octave;
  }

  /**
   * @param  {array} octaves - An array of octave numbers
   * @return {array} - An array of objects representing keys
   */
  createOctaveSets (octaves) {
    let keys = [];
    octaves.forEach((oct) => {
      this.fillOctave(oct).forEach((obj)=>{
        keys.push(obj);
      });
    });
    return keys;
  }

  /**
   * @param  {int} numberOfKeys - The number of keys for this keyboard
   * @return {array} - An array of html objects representing the keys
   */
  drawKeys (numberOfKeys) {
    let octaves = this.calculateOctaves(numberOfKeys);
    console.log('octaves ', octaves);
    let numOfRemainingKeys = numberOfKeys % 12;
    let remainingKeys = this.assignRemainingKeys(octaves, numOfRemainingKeys);
    let octaveSets = this.createOctaveSets(octaves);
    //Add the LOWER octave remaining keys to the array
    remainingKeys.lower.forEach((obj, index, arr)=> {
      this.keys.push(
        <Key keyType={obj.keyType} key={obj.key} name={obj.name} frequency={obj.frequency} noteNumber={obj.noteNumber} />
      );
    });
    //Add the complete octave sets to the array
    console.log('octaveSets ', octaveSets);
    octaveSets.forEach((obj)=>{
      this.keys.push(
        <Key keyType={obj.keyType} key={obj.key} name={obj.name} frequency={obj.frequency} noteNumber={obj.noteNumber}/>
      );
    });
    //Add the HIGHER octave remaining keys to the array
    remainingKeys.higher.forEach((obj, index, arr)=> {
      this.keys.push(
        <Key keyType={obj.keyType} key={obj.key} name={obj.name} frequency={obj.frequency} noteNumber={obj.noteNumber} />
      );
    });
    return this.keys;

  }

  render () {
    return (
      <div className="keyboard">
        <div className="keyboardWrapper">
          {this.drawKeys(this.numberOfKeys)}
        </div>
      </div>
    )
  }
}

export default Keyboard;