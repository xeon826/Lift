class Entity {
  constructor(body) {
    this.body = body;
  }

  isBehind(obj) {
    return this.body.position.x < obj.position.x;
  }

  isAbove(obj) {
    return this.body.position.y < obj.position.y;
  }

  getDistanceFrom(obj) {
    var a = this.body.position.x - obj.position.x;
    var b = this.body.position.y - obj.position.y;

    var c = Math.sqrt(a * a + b * b);
    return c
  }
  get() {
    return this;
  }
}

export default Entity;
