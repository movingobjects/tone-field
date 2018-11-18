
// Imports

import * as _ from 'lodash';
import { maths, random, geom, arrays } from 'varyd-utils';

import ToneManager from './ToneManager';
import Grid from './Grid';


// Constants

const CANVAS_ID = 'app';

const COLS = 15,
      ROWS = 5;


// Class

export default class App {

  // Constructor

  constructor() {

    this.grid        = new Grid(COLS, ROWS);
    this.toneManager = new ToneManager(COLS, ROWS);

    window.addEventListener('resize', this.onWindowResize);
    this.onWindowResize();

  }


  // Get & set


  // Event handlers

  onWindowResize = (e) => {

    App.W = window.innerWidth;
    App.H = window.innerHeight;

    this.grid.redraw();

  }


  // Methods


  // Helpers


}
