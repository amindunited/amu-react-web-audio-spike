//import mousetrap from 'mousetrap';
class QwertyNotes {

  constructor (keyDown=()=>{}, keyUp=()=>{} ) {
    this.keyDown = keyDown;
    this.keyUp = keyUp;
    console.log(this);
  }

  listen () {
    let keyArray = ['z', 's' , 'x', 'd',  'c', 'v', 'g' , 'b', 'h',  'n', 'j',  'm'];
    let noteArray =['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];
    console.log('keyarray vs notes', keyArray.length, noteArray.length);
    document.addEventListener('keydown', (e) => {
      console.log('keydown ', e, keyArray.indexOf(e.key));
      let keyIndex = keyArray.indexOf(e.key);
      if ( keyIndex >= 0 ) {
        e.noteName = noteArray[keyIndex];
        this.keyDown(e);
      }
    });
    document.addEventListener('keyup', (e) => {
      console.log('keyUp ', e, keyArray.indexOf(e.key));
      let keyIndex = keyArray.indexOf(e.key);
      if ( keyIndex >= 0 ) {
        e.noteName = noteArray[keyIndex];
        this.keyUp(e);
      }
    });
  }
}

export default QwertyNotes;