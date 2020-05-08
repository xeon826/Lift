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

    this.body.render.sprite.texture = '/img/player/standing.right.png';
  }

  grab(obj, initialDistance) {
    // obj.isGrabbedBy = this;
    obj.isGrabbed = [true, this];
    var divider = 2,
      multiplier = Math.sin([0.00, this.getDistanceFrom(obj.body), initialDistance].scaleBetween(0, Math.PI / divider)[1]) * 0.1,
      polarDirection = Math.atan2(this.body.position.y - 75 - obj.body.position.y, this.body.position.x - 75 - obj.body.position.x),
      objX = Math.cos(polarDirection) * multiplier,
      objY = Math.sin(polarDirection) * multiplier;
    if (this.getDistanceFrom(obj.body) < 300) {
      obj.body.frictionAir = 0.1;
      obj.isWhispingThroughTheAirAtARateOf = 15;
    } else {
      obj.body.frictionAir = 0.01;
    }
    Body.applyForce(obj.body, {
      x: obj.body.position.x,
      y: obj.body.position.y
    }, {
      x: objX,
      y: objY
    });
  }

  throw (obj, to) {
    obj.isGrabbed = false;
    obj.body.frictionAir = 0.01;
    var speed = 2.01,
      polarDirection = Math.atan2(to.position.y - obj.body.position.y, to.position.x - obj.body.position.x),
      objX = Math.cos(polarDirection) * speed,
      objY = Math.sin(polarDirection) * speed;
    Body.applyForce(obj.body, {
      x: obj.body.position.x,
      y: obj.body.position.y
    }, {
      x: objX,
      y: objY
    });
  }

  move(keys, mouseConstraint) {
    var speedCap = 10,
      baseRunningSpeed = 0.03,
      jumpForce = 0.3,
      stopped = 0,
      speed = {
        x: keys['68'] || keys['65'] ? Math.abs(this.body.velocity.x) > speedCap ? stopped : baseRunningSpeed : stopped,
        y: keys['32'] || keys['87'] ? Math.abs(this.body.velocity.y) > speedCap ? stopped : jumpForce : stopped
      }
    var texturePath = '/img/player/';
    if (!this.isOnGround)
    texturePath += 'jumping';
    else
    texturePath += 'standing';
    if (this.body.position.x <= mouseConstraint.mouse.position.x)
      texturePath += '.right.png';
    else
      texturePath += '.left.png';
    this.body.render.sprite.texture = texturePath;
    Body.applyForce(this.body, {
      x: this.body.position.x,
      y: this.body.position.y
    }, {
      x: keys['65'] ? speed.x * -1 : speed.x,
      y: this.isOnGround ? -speed.y / 1.5 : 0
    });
  }

  getSqrtOfWindow() {
    var a = 0 - window.innerWidth,
      b = 0 - window.innerHeight;
    var c = Math.sqrt(a * a + b * b);
  }
}

export default Player;
