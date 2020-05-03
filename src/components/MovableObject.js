import {
  Bodies
} from 'matter-js';
class MovableObject {
  constructor(type = 'block') {
    this.body = Bodies.rectangle(950, 50, 80, 80);
  }

  grab() {

  }

}

export default MovableObject;
