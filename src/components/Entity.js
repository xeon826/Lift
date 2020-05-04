class Entity {
  constructor(body) {
    this.body = body;
    this.isOnGround = false;
  }

  isBehind(obj) {
    return this.body.position.x < obj.position.x;
  }

  isAbove(obj) {
    return this.body.position.y < obj.position.y;
  }

  getSqrtOfMotion() {
    // var a = this.body.velocity.x - obj.velocity.x,
    //   b = this.body.velocity.y - obj.velocity.y,
      // c = Math.sqrt(a * a + b * b);
    return Math.sqrt(this.body.velocity.x + this.body.velocity.y);
  }

  getDistanceFrom(obj) {
    var a = this.body.position.x - obj.position.x,
      b = this.body.position.y - obj.position.y,
      c = Math.sqrt(a * a + b * b);
    return c
  }
  get() {
    return this;
  }
}

export default Entity;
