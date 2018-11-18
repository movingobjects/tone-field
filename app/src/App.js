
// Imports

import * as _ from 'lodash';
import { maths, random, geom, arrays } from 'varyd-utils';

import Tone from './Tone';


// Constants

const CANVAS_ID = 'app';

const COLS = 15,
      ROWS = 5;


// Class

export default class App {

  // Constructor

  constructor() {

    this.initCanvas();

    window.addEventListener('click', () => {
      this.initAudio();
    });

  }

  initCanvas() {

    this.canvas    = document.getElementById(CANVAS_ID);
    this.ctxCanvas = this.canvas.getContext('2d');

    this.redrawGrid();

    window.addEventListener('resize', this.onWindowResize);

  }

  initAudio() {

    this.ctxAudio = new (window.AudioContext || window.webkitAudioContext)();
    this.tone     = new Tone(this.ctxAudio);

    this.mouseCol = -1;
    this.mouseRow = -1;

    window.addEventListener('mousemove', this.onMouseMove);

  }


  // Get & set


  // Event handlers

  onWindowResize = (e) => {

    this.redrawGrid();

  }

  onMouseMove = (e) => {

    const NOTES = [ 'C', 'D', 'E', 'F', 'G', 'A', 'B' ];

    const col  = Math.floor(e.clientX / (window.innerWidth / COLS)),
          row  = Math.floor(e.clientY / (window.innerHeight / ROWS));

    if (col !== this.mouseCol || row !== this.mouseRow) {

      this.mouseCol = col;
      this.mouseRow = row;

      const note   = NOTES[arrays.wrapIndex(col, NOTES)],
            octave = row + 2 + (Math.floor(col / NOTES.length));

      this.tone.playNote(`${note}${octave}`, 0.6);

    }

  }


  // Methods

  redrawGrid() {

    const canvas = this.canvas,
          ctx    = this.ctxCanvas,
          winW   = window.innerWidth,
          winH   = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    canvas.width  = winW;
    canvas.height = winH;

    _.times(COLS - 1, (col) => {

      let x = Math.floor((col + 1) * (winW / COLS));

      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, winH);
      ctx.closePath();
      ctx.stroke();

    });

    _.times(ROWS - 1, (row) => {

      let y = Math.floor((row + 1) * (winH / ROWS));

      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(winW, y);
      ctx.closePath();
      ctx.stroke();

    });


  }


  // Helpers


}
