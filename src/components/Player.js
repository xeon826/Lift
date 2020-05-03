import {
  Body,
  Bodies,
  Vertices
} from 'matter-js';
class Player {
  constructor(type = 'block') {
    this.vertices = Vertices.fromPath("0,40, 50,40, 50,115, 30,130, 20,130, 0,115, 0,40");
    this.body = Bodies.fromVertices(100, 200, this.vertices, {
    });
  }

  grab(obj) {
    var relativeDistance = (this.getDistanceFrom(obj) / (window.innerWidth * window.innerHeight)) * 100;
    if (Math.abs(obj.velocity.x) < relativeDistance * 300)
      Body.applyForce(obj, {
        x: obj.position.x,
        y: obj.position.y
      }, {
        x: this.isBehind(obj) ? -relativeDistance : relativeDistance,
        y: this.isAbove(obj) ? -relativeDistance : relativeDistance
      });
  }

  isBehind(obj) {
    return this.body.position.x < obj.position.x;
  }

  isAbove(obj) {
    return this.body.position.y < obj.position.y;
  }

  getDistanceFrom(obj) {
    var a = this.body.position.x - obj.position.x;
    var b = this.body.position.y - obj.position.y;

    var c = Math.sqrt(a * a + b * b);
    return c
  }

  getSqrtOfWindow() {
    var a = 0 - window.innerWidth,
      b = 0 - window.innerHeight;
    var c = Math.sqrt(a * a + b * b);
  }

}

export default Player;
