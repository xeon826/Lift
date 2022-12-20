import {
  Howl,
  Howler
} from 'howler';
class Sound {
  constructor(path) {
    this.howl = new Howl({
      src: [path]
    });
    // this.volume = this.howl.volume();
    this.volume = 0.5;
    this.is_playing = false;
    window.addEventListener('blur', (e) => {
      this.volume = this.howl.volume();
      this.howl.volume(0);
    })
    window.addEventListener('focus', (e) => {
      this.howl.volume(this.volume);
    })
    this.howl.on('end', () => this.is_playing = false);
  }
  play() {
    this.howl.play();
    this.is_playing = true;
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
