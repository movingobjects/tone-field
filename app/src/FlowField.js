
// Imports

import { maths, random, Vec } from 'varyd-utils';
import SimplexNoise from 'simplex-noise';

import App from './App';
import FlowAgent from './FlowAgent';


// Constants

const NOISE_SCALE = 0.05,
      TIME_SCALE  = 0.0001,
      AGENT_COUNT = 20;


// Class

export default class FlowField {

  constructor(cols, rows) {

    this.cols   = cols;
    this.rows   = rows;

    this.noise  = new SimplexNoise();
    this.field  = [];
    this.agents = _.times(AGENT_COUNT, (i) => (
      new FlowAgent(random.num(0, App.W), random.num(0, App.H))
    ));

  }

  nextFrame(timeNow) {

    this.updateField(timeNow);
    this.updateAgents(timeNow);

  }

  updateField(timeNow) {

    _.times(this.cols, (col) => {
      _.times(this.rows, (row) => {

        let index    = col + (row * this.cols),
            noiseVal = this.noise.noise3D(col * NOISE_SCALE, row * NOISE_SCALE, timeNow * TIME_SCALE),
            angle    = noiseVal * maths.TAO;

        this.field[index] = angle;

      });
    });

  }

  updateAgents(timeNow) {

    const getCell = ({ x, y }) => {
      return {
        col: Math.floor((x * this.cols) / App.W),
        row: Math.floor((y * this.rows) / App.H)
      }
    };

    this.agents.forEach((agent) => {

      let { col, row } = getCell(agent.pos);

      let index = col + (row * this.cols),
          angle = this.field[index],
          vec   = Vec.fromAngle(angle);

      agent.updateCell(col, row);

      if (vec) {
        agent.applyForce(vec);
      }

      agent.update();

    });

  }

}
