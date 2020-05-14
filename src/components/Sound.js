import {
  Howl,
  Howler
} from 'howler';
class Sound {
  constructor(path) {
    this.howl = new Howl({
      src: [path]
    });
  }
  play() {
    this.howl.play();
  }
  stop() {
    this.howl.stop();
  }
}

export default Sound;
