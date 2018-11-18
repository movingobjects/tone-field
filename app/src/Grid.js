
// Imports

import * as _ from 'lodash';
import { maths, random, geom, arrays } from 'varyd-utils';

import App from './App';


// Constants

const CANVAS_ID = 'app';

const COLS = 15,
      ROWS = 5;


// Class

export default class Grid {

  // Constructor

  constructor() {

    this.canvas = document.getElementById(CANVAS_ID);
    this.ctx    = this.canvas.getContext('2d');

  }

  redraw() {

    this.canvas.width  = App.W;
    this.canvas.height = App.H;

    this.ctx.clearRect(0, 0, App.W, App.H);

    _.times(COLS - 1, (col) => {

      let x = Math.floor((col + 1) * (App.W / COLS)) + 0.5;

      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, App.H);
      this.ctx.closePath();

      this.ctx.strokeStyle = '#ddd';
      this.ctx.lineWidth   = 1;
      this.ctx.stroke();

    });

    _.times(ROWS - 1, (row) => {

      let y = Math.floor((row + 1) * (App.H / ROWS)) + 0.5;

      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(App.W, y);

      this.ctx.closePath();
      this.ctx.strokeStyle = '#ddd';
      this.ctx.lineWidth   = 1;
      this.ctx.stroke();

    });


  }


  // Helpers


}
