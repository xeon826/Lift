import {
  Howl,
  Howler
} from 'howler';
class Sound {
  constructor(path) {
    this.howl = new Howl({
      src: [path]
    });
    this.volume = this.howl.volume();
    window.addEventListener('blur', (e) => {
      this.volume = this.howl.volume();
      this.howl.volume(0);
    })
    window.addEventListener('focus', (e) => {
      this.howl.volume(this.volume);
    })
  }
  play() {
    this.howl.play();
  }
  stop() {
    this.howl.stop();
  }
  isPlaying() {
    return this.howl.playing();
  }
  setRate(val) {
    this.howl.rate(val);
  }
}

export default Sound;
