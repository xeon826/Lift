import createBackground from 'components/createBackground';
import Player from 'components/Player';
import MovableObject from 'components/MovableObject';
import Entity from 'components/Entity';
import decomp from 'poly-decomp'
import 'main.css';
import {
  Engine,
  World,
  Events,
  Query,
  Body,
  Bodies,
  Vertices,
  Render,
  Constraint
} from 'matter-js';

const main = async () => {
  window.decomp = decomp

  // create an engine
  var engine = Engine.create();

  // create a renderer
  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  });

  // create two boxes and a ground
  var player = new Player(Bodies.fromVertices(100, 200, Vertices.fromPath("0,40, 50,40, 50,115, 30,130, 20,130, 0,115, 0,40"), {
      inertia: Infinity,
      friction: 0.1,
      frictionStatic: 0,
      frictionAir: 0.02
    })),
    // boxB = Bodies.rectangle(1350, 50, 80, 80);
    boxB = new MovableObject(Bodies.rectangle(1350, 50, 80, 80)),
    boxB = boxB.body;
  var movableObjects = [];
  var ground = Bodies.rectangle(window.innerWidth / 2, 750, window.innerWidth, 60, {
    isStatic: true,
    isFloor: true,
  });
  var walls = {
    right: Bodies.rectangle(window.innerWidth, 300, 60, window.innerHeight, {
      isStatic: true
    }),
    left: Bodies.rectangle(0, 300, 60, window.innerHeight, {
      isStatic: true
    })
  };
  var ceiling = Bodies.rectangle(window.innerWidth / 2, 0, window.innerWidth, 60, {
    isStatic: true
  });

  // add all of the bodies to the world
  World.add(engine.world, [player.body, boxB, ground, walls.right, walls.left, ceiling]);

  // run the engine
  Engine.run(engine);

  // run the renderer
  Render.run(render);
  var keys = {};
  window.onkeyup = function(e) {
    keys[e.keyCode] = false;
  }
  window.onkeydown = function(e) {
    keys[e.keyCode] = true;
  }
  var lastObjClicked = '',
    grabbed = '',
    mousePos = {};
  document.body.onmousedown = function(e) {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
    lastObjClicked = Query.point([boxB], mousePos)[0],
      grabbed = lastObjClicked;
  }
  document.body.onmouseup = function(e) {
    player.throw(lastObjClicked);
    lastObjClicked = null;
  }
  Events.on(engine, 'collisionStart', function(event) {
    var pair = event.pairs[0];
    if (pair.bodyA == player.body && pair.bodyB == grabbed) {
      pair.isActive = false;
    }
  });
  Events.on(engine, "beforeUpdate", function(e) {
    if (lastObjClicked) {
      player.grab(lastObjClicked);
    }
    player.move(keys);
  })
}

main().then(() => console.log('Started'));
