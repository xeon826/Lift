var getPolarDirection = (from, object) => {
  var divider = 2,
    polarDirection = Math.atan2(object.position.y - from.position.y, object.position.x - from.position.x),
    objX = Math.cos(polarDirection),
    objY = Math.sin(polarDirection);
  return {
    x: objX,
    y: objY
  };
}

export default getPolarDirection;
