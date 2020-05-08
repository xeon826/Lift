import Entity from 'components/Entity';
import {
  Howl,
  Howler
} from 'howler';
class MovableObject extends Entity {
  constructor(body) {
    super(body);
    this.body = body;
    this.grabSound = new Howl({
      src: ['/sound/grab.mp3']
    });
    this.grabSound.on('fade', () => {
      this.grabSound.stop();
    })
    this.idHowl = '';
    this._isGrabbed = [false, ''];
    this._grabSoundIsFading = false;
    // this._isGrabbedBy = false;
  }

  get grabSoundIsFading() {
    return this._grabSoundIsFading;
  }

  set grabSoundIsFading(val) {
    this._grabSoundIsFading = val;
  }

  get isGrabbed() {
    return this._isGrabbed;
  }

  set isGrabbed(val) {
    if (!val) {
      this.grabSound.stop();
      console.log('stop');
    }
    if (val && !this._isGrabbed[0]) {
      this.grabSoundIsFading = false;
      this.idHowl = this.grabSound.play();
    }
    this._isGrabbed = val;
    if (this.grabSound.playing() && this._isGrabbed[1] && this._isGrabbed[1].getDistanceFrom(this.body) < 200 && !this._grabSoundIsFading) {
      this.grabSoundIsFading = true;
      console.log('close');
      this.grabSound.fade(1, 0, 1000, this.idHowl);
    }
  }
}

export default MovableObject;
