import {
  Body,
  Bodies,
  Vertices
} from 'matter-js';
import Entity from 'components/Entity';
require('utils/scaleBetween');
class Player extends Entity {
  constructor(body, isOnGround) {
    super(body, isOnGround);
    var mouse = {};
    window.onmousemove = function(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
  }

  isAbove(obj) {
    return this.body.position.y - 50 < obj.position.y;
  }


  grab(obj, initialDistance) {
    var speed = 0.15 - (obj.body.mass * 0.01),
      scaledForV = [100, initialDistance, 0].scaleBetween(0, 0.01),
      inRangeSpeed = scaledForV[0];
    console.log(inRangeSpeed);
    if (this.getDistanceFrom(obj.body) < 100) {
      Body.setVelocity(obj.body, {
        x: this.isBehind(obj.body) ? -inRangeSpeed : inRangeSpeed,
        y: this.isAbove(obj.body) ? -inRangeSpeed : inRangeSpeed
      });
    } else {
      Body.applyForce(obj.body, {
        x: obj.body.position.x,
        y: obj.body.position.y
      }, {
        x: this.isBehind(obj.body) ? -speed : speed,
        y: this.isAbove(obj.body) ? -speed : speed
      });
    }
  }

  move(keys) {
    var speedCap = 10,
      baseRunningSpeed = 0.03,
      jumpForce = 0.3,
      stopped = 0,
      speed = {
        x: keys['68'] || keys['65'] ? Math.abs(this.body.velocity.x) > speedCap ? stopped : baseRunningSpeed : stopped,
        y: keys['32'] || keys['87'] ? Math.abs(this.body.velocity.y) > speedCap ? stopped : jumpForce : stopped
      }
    Body.applyForce(this.body, {
      x: this.body.position.x,
      y: this.body.position.y
    }, {
      x: keys['65'] ? speed.x * -1 : speed.x,
      y: this.isOnGround ? -speed.y : 0
      // y: -speed.y
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
