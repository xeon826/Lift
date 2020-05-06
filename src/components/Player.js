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
  }

  grab(obj, initialDistance) {

    obj.isWhispingThroughTheAirAtARateOf = 10 - [0, initialDistance * 0.0005, 1].scaleBetween(1, 10)[1];
    var divider = 2,
      multiplier = Math.sin([0.00, this.getDistanceFrom(obj.body), initialDistance].scaleBetween(0, Math.PI / divider)[1]) * 0.1,
      polarDirection = Math.atan2(this.body.position.y - 75 - obj.body.position.y, this.body.position.x - obj.body.position.x),
      objX = Math.cos(polarDirection) * multiplier,
      objY = Math.sin(polarDirection) * multiplier;
    if (this.getDistanceFrom(obj.body) < 300) {
      obj.body.frictionAir = 0.1;
      obj.isWhispingThroughTheAirAtARateOf = 15;
      // obj.grabSound.stop();
    } else {
      // obj.isWhispingThroughTheAirAtARateOf = Math.sin([0, obj.body.velocity.x * obj.body.velocity.y * 3, 1].scaleBetween(0, Math.PI/2)[1]);
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
    this.hasGrabbed = false;
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

  move(keys) {
    var speedCap = 10,
      baseRunningSpeed = 0.03,
      jumpForce = 0.3,
      stopped = 0,
      speed = {
        x: keys['68'] || keys['65'] ? Math.abs(this.body.velocity.x) > speedCap ? stopped : baseRunningSpeed : stopped,
        y: keys['32'] || keys['87'] ? Math.abs(this.body.velocity.y) > speedCap ? stopped : jumpForce : stopped
      }
    var texturePath = '/img/player/';
    if (this.isOnGround)
      texturePath += 'standing';
    else
      texturePath += 'jumping';
    if (this.body.velocity.x < -1)
      texturePath += '.left';
    else if (this.body.velocity.x > 1)
      texturePath += '.right';
    else
      texturePath += '.right';
    texturePath += '.png';
    try {
      this.body.render.sprite.texture = texturePath;
    } catch(e) {
      this.body.render.sprite.texture = '/img/player/standing.right.png';
    }
    // if (this.body.velocity.y < -1)
    // if (this.body.velocity.x > 1) {
    //   this.body.render.sprite.texture = '/img/player/standing.right.png';
    // } else if (this.body.velocity.x < -1){
    //   this.body.render.sprite.texture = '/img/player/standing.left.png';
    // }
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
