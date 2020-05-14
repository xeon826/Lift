import Entity from 'components/Entity';
import Sound from 'components/Sound';
import {
  Howl,
  Howler
} from 'howler';
class MovableObject extends Entity {
  constructor() {
    super();
    this.grabSound = new Sound('/sound/grab.mp3');
    this.throwSound = new Sound('/sound/throw.mp3');
    this.playGrabSound = function() {
      this.grabSound.play();
    }
    this.playThrowSound = function() {
      this.throwSound.play();
    }
  }
}

export default MovableObject;
