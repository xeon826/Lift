import {
  Body,
  Bodies,
  Vertices
} from 'matter-js';
import Entity from 'components/Entity';
class Player extends Entity {
  constructor(body) {
    super(body);
    var mouse = {};
    window.onmousemove = function(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
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

  move(keys) {
    var speedCap = 10,
      baseRunningSpeed = 0.03,
      stopped = 0,
      speed = {
        x: keys['68'] || keys['65'] ? Math.abs(this.body.velocity.x) > speedCap ? stopped : baseRunningSpeed : stopped,
        y: keys['32'] || keys['87'] ? Math.abs(this.body.velocity.y) > speedCap ? stopped : baseRunningSpeed : stopped
      }
    Body.applyForce(this.body, {
      x: this.body.position.x,
      y: this.body.position.y
    }, {
      x: keys['65'] ? speed.x * -1 : speed.x,
      y: -speed.y
    });
  }

  throw (obj) {
    // Body.applyForce(obj, {
    //   x: obj.position.x,
    //   y: obj.position.y
    // }, {
    //   x: ,
    //   y:
    // });
  }

  getSqrtOfWindow() {
    var a = 0 - window.innerWidth,
      b = 0 - window.innerHeight;
    var c = Math.sqrt(a * a + b * b);
  }

}

export default Player;
