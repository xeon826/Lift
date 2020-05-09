import {
  Bodies,
  Vertices
} from 'matter-js';
class Entity {
  constructor(body) {
    this.body = body;
    this.isOnGround = false;
  }

  getDistanceFrom(obj) {
    var a = this.body.position.x - obj.position.x,
      b = this.body.position.y - obj.position.y,
      c = Math.sqrt(a * a + b * b);
    return c
  }
  get() {
    return this;
  }
}

export default Entity;
