
// Imports

import { maths, arrays, Vec } from 'varyd-utils';

import App from './App';
import Tone from './Tone';


// Constants

//const NOTES = [ 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ];
const NOTES = [ 'C', 'D', 'E', 'F', 'G', 'A', 'B' ];


// Class

export default class ToneManager {

  constructor(cols, rows) {

    this.cols = cols;
    this.rows = rows;

    window.addEventListener('click', this.onFirstClick);

  }

  onFirstClick = (e) => {

    window.removeEventListener('click', this.onFirstClick);

    this.start();

  }

  playNoteAt(col, row) {

    if (!this.ready) return;

    const note   = NOTES[arrays.wrapIndex(col, NOTES)],
          octave = (this.rows - row) + 1 + (Math.floor(col / NOTES.length));

    this.tone.playNote(`${note}${octave}`, 0.6);

  }

  onMouseMove = (e) => {

    const col  = Math.floor((e.clientX * this.cols) / App.W),
          row  = Math.floor((e.clientY * this.rows) / App.H);

    if (col !== this.mouseCol || row !== this.mouseRow) {

      this.playNoteAt(col, row);

      this.mouseCol = col;
      this.mouseRow = row;

    }

  }

  start() {

    this.ctx      = new (window.AudioContext || window.webkitAudioContext)();
    this.tone     = new Tone(this.ctx);

    this.mouseCol = -1;
    this.mouseRow = -1;

    this.ready    = true;

    window.addEventListener('mousemove', this.onMouseMove);

  }

}
