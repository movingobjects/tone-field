
// Imports

import * as _ from 'lodash';
import { maths, random, geom, arrays } from 'varyd-utils';

import ToneManager from './ToneManager';
import FlowField from './FlowField';


// Constants

const CANVAS_ID = 'app';

const COLS = 13,
      ROWS = 6;


// Class

export default class App {

  // Constructor

  constructor() {

    this.canvas      = document.getElementById(CANVAS_ID);
    this.ctx         = this.canvas.getContext('2d');

    window.addEventListener('resize', this.onWindowResize);
    this.onWindowResize();

    this.flowField   = new FlowField(COLS, ROWS);
    this.toneManager = new ToneManager(COLS, ROWS);

    this.start();

  }


  // Get & set


  // Event handlers

  onWindowResize = (e) => {

    App.W = window.innerWidth;
    App.H = window.innerHeight;

    this.canvas.width  = App.W;
    this.canvas.height = App.H;

  }

  nextFrame = (timeNow) => {

    this.flowField.nextFrame(timeNow);

    this.redraw();
    this.playAgentNotes();

    window.requestAnimationFrame(this.nextFrame);

  }


  // Methods

  start() {

    window.requestAnimationFrame(this.nextFrame);

  }

  redraw() {

    const colX = (col) => Math.floor(col * (App.W / COLS)),
          rowY = (row) => Math.floor(row * (App.H / ROWS));

    this.ctx.clearRect(0, 0, App.W, App.H);

    _.times(COLS - 1, (col) => {

      let x = colX(col + 1) + 0.5;

      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, App.H);
      this.ctx.closePath();

      this.ctx.strokeStyle = '#ddd';
      this.ctx.lineWidth   = 1;
      this.ctx.stroke();

    });

    _.times(ROWS - 1, (row) => {

      let y = rowY(row + 1) + 0.5;

      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(App.W, y);

      this.ctx.closePath();
      this.ctx.strokeStyle = '#ddd';
      this.ctx.lineWidth   = 1;
      this.ctx.stroke();

    });

    this.flowField.field.forEach((angle, i) => {

      let col = i % COLS,
          row = Math.floor(i / COLS);

      let cellX = colX(col + 0.5),
          cellY = rowY(row + 0.5);

      this.ctx.save();

      this.ctx.translate(cellX, cellY);
      this.ctx.rotate(angle);

      this.ctx.beginPath()
      this.ctx.moveTo(-7, 0);
      this.ctx.lineTo(7, 0);

      this.ctx.moveTo(7, 0);
      this.ctx.lineTo(3, -2);

      this.ctx.moveTo(7, 0);
      this.ctx.lineTo(3, 2);

      this.ctx.closePath();

      this.ctx.strokeStyle = '#666';
      this.ctx.lineWidth   = 1;
      this.ctx.stroke();

      this.ctx.restore();

    });

    this.flowField.agents.forEach((agent, i) => {

      this.ctx.beginPath();
      this.ctx.arc(agent.pos.x, agent.pos.y, 3, 0, maths.TAO);
      this.ctx.closePath();

      this.ctx.fillStyle = 'magenta';
      this.ctx.fill();

    });


  }

  playAgentNotes() {

    this.flowField.agents.forEach((agent, i) => {

      if (agent.hasCellUpdate) {
        this.toneManager.playNoteAt(agent.col, agent.row);
      }

    });

  }


  // Helpers


}
