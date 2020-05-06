import {
  Howl,
  Howler
} from 'howler';
class Sound {
  constructor(path) {
    // var options = {src: }
    this.howl = new Howl({
      src: [path]
    });
  }
  play() {
    if (!this.howl.playing()) {
      console.log('play');
      this.idHowl = this.howl.play();
      this.howl.rate(3, this.idHowl);
      this.howl.on('fade', this.idHowl, (e) => {
        this.isFading = false;
        this.howl.stop(this.idHowl);
        console.log('has faded');
      })
    }
  }
  fade(from = 1, to = 0, time = 500) {
    if (!this.isFading) {
      this.isFading = true;
      this.howl.fade(from, to, time, this.idHowl);
    }
  }
}

export default Sound;
