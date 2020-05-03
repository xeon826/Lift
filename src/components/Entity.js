
class Entity {
  constructor(width = '50px', height = '50px', background = 'blue') {
    var entity = document.createElement('div');
    entity.style.width = width;
    entity.style.height = height;
    entity.style.background = background;
    entity.style.position = 'fixed';
    entity.style.left = '0';
    entity.style.top = '0';
    entity.style.zIndex = '1000';
    this.entity = entity;
  }

  getHTMElement() {
    return this.entity;
  }
  draw() {
    document.body.appendChild(this.entity);
  }
}

export default Entity;
