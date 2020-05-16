import {
  Bodies,
  Body,
  Vertices
} from 'matter-js';
class Entity {
  constructor(body) {
    this.body = body;
    this.isOnGround = false;
    this.getDistanceFrom = function(obj) {
      var a = this.position.x - obj.position.x,
        b = this.position.y - obj.position.y,
        c = Math.sqrt(a * a + b * b);
      return c
    }
  }
}

export default Entity;
