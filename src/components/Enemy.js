import {
  Body,
  Composite,
  Bodies,
  Vertices
} from 'matter-js';
import {
  Howl,
  Howler
} from 'howler';
import Entity from 'components/Entity';
import getPolarDirection from 'utils/getPolarDirection';
import Sound from 'components/Sound';
require('utils/arrayUtils');
class Enemy extends Entity {
  constructor(body) {
    super(body);
    this.sounds = {};
    this.sounds = {
      hello: new Sound('/sound/hello_edit.mp3')
    }
    this.category = 'enemy';
    this.hp = '';
    this.die = function(world) {
      Composite.remove(world, this);
      this.sounds.hello.stop();
    }
    this.setHp = function() {

    }
    this.runToward = function(player) {
      if (this.getDistanceFrom(player) < 500 && !this.sounds.hello.isPlaying()) {
        this.sounds.hello.play();
        // this.sounds.hello.setRate(Math.random());
      }
      var polarDirection = getPolarDirection(this, player);
      Body.setVelocity(this, {
        x: polarDirection.x * 4,
        y: polarDirection.y * 4
      });
    }
  }

  // runToward(obj) {
  //   var speedCap = 10,
  //     baseRunningSpeed = 0.03,
  //     jumpForce = 0.3,
  //     stopped = 0,
  //     speed = {
  //       x: Math.abs(this.body.velocity.x) > speedCap ? stopped : baseRunningSpeed,
  //       y: 0
  //     }
  //   if (obj.body.position.x < this.body.position.x) {
  //
  //     // Body.applyForce(this.body, {
  //     //   x: this.body.position.x,
  //     //   y: this.body.position.y
  //     // }, {
  //     //   x: keys['65'] ? speed.x * -1 : speed.x,
  //     //   y: this.isOnGround ? -speed.y / 1.5 : 0
  //     // });
  //
  //   }
  // }
}

export default Enemy;
