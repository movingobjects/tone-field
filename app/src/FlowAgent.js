
// Imports

import { maths, arrays, Vec } from 'varyd-utils';


// Constants

import App from './App';

const MAX_ACC = 0.5,
      MAX_VEL = 8;


// Class

export default class FlowAgent {

  constructor(x, y) {

    this.pos = new Vec(x, y);
    this.vel = new Vec(0, 0);
    this.acc = new Vec(0, 0);

    this.col = -1;
    this.row = -1;

  }

  update() {

    this.acc.limit(MAX_ACC);

    this.vel.add(this.acc);
    this.vel.limit(MAX_VEL);

    this.pos.add(this.vel);

    while (this.pos.x < 0 && this.vel.x < 0) this.pos.x += App.W;
    while (this.pos.y < 0 && this.vel.y < 0) this.pos.y += App.H;
    while (this.pos.x > App.W && this.vel.x > 0) this.pos.x -= App.W;
    while (this.pos.y > App.H && this.vel.y > 0) this.pos.y -= App.H;

    this.acc.multiply(0);

  }

  updateCell(col, row) {

    this.hasCellUpdate = (col !== this.col || row !== this.row)

    this.col = col;
    this.row = row;

  }

  applyForce(force) {

    this.acc.add(force);

  }

}
