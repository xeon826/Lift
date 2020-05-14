import {
  Body,
  Bodies,
  Vertices
} from 'matter-js';
import {
  Howl,
  Howler
} from 'howler';
import Entity from 'components/Entity';
import Sound from 'components/Sound';
require('utils/arrayUtils');
class Enemy extends Entity {
  constructor(body) {
    super(body);
    this.runToward = function(obj) {
      var speedCap = 10,
        baseRunningSpeed = 0.03,
        jumpForce = 0.3,
        stopped = 0,
        speed = {
          x: Math.abs(this.velocity.x) > speedCap ? stopped : baseRunningSpeed,
          y: 0
        }
      if (obj.position.x < this.position.x) {

        // Body.applyForce(this.body, {
        //   x: this.body.position.x,
        //   y: this.body.position.y
        // }, {
        //   x: keys['65'] ? speed.x * -1 : speed.x,
        //   y: this.isOnGround ? -speed.y / 1.5 : 0
        // });

      }
    }
  }

  runToward(obj) {
    var speedCap = 10,
      baseRunningSpeed = 0.03,
      jumpForce = 0.3,
      stopped = 0,
      speed = {
        x: Math.abs(this.body.velocity.x) > speedCap ? stopped : baseRunningSpeed,
        y: 0
      }
    if (obj.body.position.x < this.body.position.x) {

      // Body.applyForce(this.body, {
      //   x: this.body.position.x,
      //   y: this.body.position.y
      // }, {
      //   x: keys['65'] ? speed.x * -1 : speed.x,
      //   y: this.isOnGround ? -speed.y / 1.5 : 0
      // });

    }
  }
}

export default Enemy;
