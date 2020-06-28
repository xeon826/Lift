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
class Architecture extends Entity {
  constructor(body) {
    super(body);
    this.category = 'architecture';
  }
}

export default Architecture;
