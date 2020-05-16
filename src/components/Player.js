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
class Player extends Entity {
  constructor(body, isOnGround) {
    super(body, isOnGround);

    this.grab = function(obj, initialDistance) {
      var divider = 2,
        multiplier = Math.sin([0.00, this.getDistanceFrom(obj), initialDistance].scaleBetween(0, Math.PI / divider)[1]) * 0.1,
        polarDirection = Math.atan2(this.position.y - 75 - obj.position.y, this.position.x - obj.position.x),
        objX = Math.cos(polarDirection) * multiplier,
        objY = Math.sin(polarDirection) * multiplier;
      if (this.getDistanceFrom(obj) < 300) {
        obj.frictionAir = 0.1;
      } else {
        obj.frictionAir = 0.01;
      }
      Body.applyForce(obj, {
        x: obj.position.x,
        y: obj.position.y
      }, {
        x: objX,
        y: objY
      });
    }

    this.throw = function(obj, to) {
      obj.frictionAir = 0.01;
      var speed = 2.01,
        polarDirection = Math.atan2(to.position.y - obj.position.y, to.position.x - obj.position.x),
        objX = Math.cos(polarDirection) * speed,
        objY = Math.sin(polarDirection) * speed;
      Body.applyForce(obj, {
        x: obj.position.x,
        y: obj.position.y
      }, {
        x: objX,
        y: objY
      });
    }

    this.move = function(keys, mouseConstraint) {
      var speedCap = 10,
        baseRunningSpeed = 0.03,
        jumpForce = 0.3,
        stopped = 0,
        speed = {
          x: keys['68'] || keys['65'] ? Math.abs(this.velocity.x) > speedCap ? stopped : baseRunningSpeed : stopped,
          y: keys['32'] || keys['87'] ? Math.abs(this.velocity.y) > speedCap ? stopped : jumpForce : stopped
        }
      var texturePath = '/img/player/';
      if (!this.isOnGround)
        texturePath += 'jumping';
      else
        texturePath += 'standing';
      if (this.position.x <= mouseConstraint.mouse.position.x)
        texturePath += '.right.png';
      else
        texturePath += '.left.png';
      this.render.sprite.texture = texturePath;
      Body.applyForce(this, {
        x: this.position.x,
        y: this.position.y
      }, {
        x: keys['65'] ? speed.x * -1 : speed.x,
        y: this.isOnGround ? -speed.y / 1.5 : 0
      });
    }

    this.getSqrtOfWindow = function() {
      var a = 0 - window.innerWidth,
        b = 0 - window.innerHeight;
      var c = Math.sqrt(a * a + b * b);
    }
  }
}

export default Player;
