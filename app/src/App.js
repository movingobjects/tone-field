
// Imports

import * as _ from 'lodash';
import { maths, random, geom, arrays } from 'varyd-utils';

import ToneManager from './ToneManager';
import FlowField from './FlowField';


// Constants

const COLS = 13,
      ROWS = 6;


// Class

export default class App {

  // Constructor

  constructor() {

    App.W = 1000;
    App.H = 500;

    const canvasField         = document.getElementById('canvas-field');
          canvasField.width   = App.W;
          canvasField.height  = App.H;

    const canvasAgents        = document.getElementById('canvas-agents');
          canvasAgents.width  = App.W;
          canvasAgents.height = App.H;

    this.ctxField    = canvasField.getContext('2d');
    this.ctxAgents   = canvasAgents.getContext('2d');

    this.flowField   = new FlowField(COLS, ROWS);
    this.toneManager = new ToneManager(COLS, ROWS);

    this.start();

  }


  // Get & set


  // Event handlers

  nextFrame = (timeNow) => {

    this.flowField.nextFrame(timeNow);

    this.redrawField();
    this.redrawAgents();

    this.playAgentNotes();

    window.requestAnimationFrame(this.nextFrame);

  }


  // Methods

  start() {

    window.requestAnimationFrame(this.nextFrame);

  }

  redrawField() {

    const colX = (col) => Math.floor(col * (App.W / COLS)),
          rowY = (row) => Math.floor(row * (App.H / ROWS));

    const ctx = this.ctxField;
          ctx.clearRect(0, 0, App.W, App.H);

    _.times(COLS - 1, (col) => {

      let x = colX(col + 1) + 0.5;

      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, App.H);
      ctx.closePath();

      ctx.strokeStyle = '#ddd';
      ctx.lineWidth   = 1;
      ctx.stroke();

    });

    _.times(ROWS - 1, (row) => {

      let y = rowY(row + 1) + 0.5;

      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(App.W, y);

      ctx.closePath();
      ctx.strokeStyle = '#ddd';
      ctx.lineWidth   = 1;
      ctx.stroke();

    });

    this.flowField.field.forEach((angle, i) => {

      let col = i % COLS,
          row = Math.floor(i / COLS);

      let cellX = colX(col + 0.5),
          cellY = rowY(row + 0.5);

      ctx.save();

      ctx.translate(cellX, cellY);
      ctx.rotate(angle);

      ctx.beginPath()
      ctx.moveTo(-7, 0);
      ctx.lineTo(7, 0);

      ctx.moveTo(7, 0);
      ctx.lineTo(3, -2);

      ctx.moveTo(7, 0);
      ctx.lineTo(3, 2);

      ctx.closePath();

      ctx.strokeStyle = '#999';
      ctx.lineWidth   = 1;
      ctx.stroke();

      ctx.restore();

    });
  }

  redrawAgents() {

    const ctx = this.ctxAgents;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.fillRect(0, 0, App.W, App.H);

    this.flowField.agents.forEach((agent, i) => {

      ctx.beginPath();
      ctx.arc(agent.pos.x, agent.pos.y, 2, 0, maths.TAO);
      ctx.closePath();

      ctx.fillStyle = '#f55';
      ctx.fill();

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
