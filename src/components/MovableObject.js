import Entity from 'components/Entity';
class MovableObject extends Entity {
  constructor(body) {
    super(body);
    // this.body = Bodies.rectangle(950, 50, 80, 80);
    this.body = body;
  }

}

export default MovableObject;
