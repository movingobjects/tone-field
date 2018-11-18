
// Imports

import { maths, arrays, Vec } from 'varyd-utils';

import App from './App';
import Tone from './Tone';


// Constants


// Class

export default class ToneManager {

  constructor(cols, rows) {

    this.cols = cols;
    this.rows = rows;

    window.addEventListener('click', () => {
      this.start();
    });

  }

  start() {

    this.ctx      = new (window.AudioContext || window.webkitAudioContext)();
    this.tone     = new Tone(this.ctx);

    this.mouseCol = -1;
    this.mouseRow = -1;

    window.addEventListener('mousemove', this.onMouseMove);

  }

  onMouseMove = (e) => {

    const NOTES = [ 'C', 'D', 'E', 'F', 'G', 'A', 'B' ];

    const col  = Math.floor((e.clientX * this.cols) / App.W),
          row  = Math.floor((e.clientY * this.rows) / App.H);

    if (col !== this.mouseCol || row !== this.mouseRow) {

      this.mouseCol = col;
      this.mouseRow = row;

      const note   = NOTES[arrays.wrapIndex(col, NOTES)],
            octave = row + 2 + (Math.floor(col / NOTES.length));

      this.tone.playNote(`${note}${octave}`, 0.6);

    }

  }


}
