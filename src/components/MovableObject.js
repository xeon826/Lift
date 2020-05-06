import Entity from 'components/Entity';
import {
  Howl,
  Howler
} from 'howler';
class MovableObject extends Entity {
  constructor(body) {
    super(body);
    // this.body = Bodies.rectangle(950, 50, 80, 80);
    this.body = body;
    this.grabSound = new Howl({
      src: ['/sound/grab.mp3']
    });
    this.idHowl = '';
    this.isGrabbed = false;
    this._isWhispingThroughTheAirAtARateOf = 0.0;
    // this.body.addEventListener('grabbed', () => {
    //     if (!this.grabSound.playing())
    //       this.id1 = this.grabSound.play();
    // })
  }

  get isWhispingThroughTheAirAtARateOf() {
    return this._isWhispingThroughTheAirAtARateOf;
  }

  set isWhispingThroughTheAirAtARateOf(rate = 0) {
    // console.log('idHowl: ', this.idHowl);
    // if (rate = 0 && this.isHowl) {
    //   this.grab
    // }
    // if (rate > 0) {
      // this.grabSound.volume(parseFloat(rate));
    // } else {
      // this.grabSound.stop();
    // }
    // this
    this.grabSound.rate(rate, this.idHowl)
    if (!this.grabSound.playing()) {
      this.idHowl = this.grabSound.play()
      this.isGrabbed = true;
    }
    // if (newValue && !this.grabSound.playing()) {
    //   this.idHowl = this.grabSound.play()
    // } else {
    //   this.grabSound.fade(1, 0, 1000, this.idHowl);
    //   // this.grabSound.stop(this.idHowl);
    // }
  }

}

export default MovableObject;
