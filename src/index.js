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
  MouseConstraint,
  Mouse,
  Query,
  Body,
  Bodies,
  Vertices,
  Render,
  Constraint
} from 'matter-js';
require('utils/arrayUtils');
const objectBluePrints = require('./objects.json');

const main = async () => {
  console.log(objectBluePrints);
  window.decomp = decomp

  // create an engine
  var engine = Engine.create();

  // create a renderer
  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      wireframes: false,
      width: window.innerWidth,
      height: window.innerHeight
    }
  });

  var defaultCategory = 0x0001,
    redCategory = 0x0002,
    greenCategory = 0x0004,
    blueCategory = 0x0008,
    mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      collisionFilter: {
        mask: greenCategory
      },
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });
  var movableObjects = {};
  objectBluePrints.movable.forEach(function(obj) {
    console.log(obj.options);
    movableObjects[obj.name] = new MovableObject(Bodies.rectangle(obj.x, obj.y, obj.width, obj.height, obj.options));
  })


  // create two boxes and a ground
  var player = new Player(Bodies.fromVertices(100, 500, Vertices.fromPath("0,40, 50,40, 50,115, 30,130, 20,130, 0,115, 0,40"), {
      inertia: Infinity,
      friction: 0.1,
      frictionStatic: 0,
      frictionAir: 0.02,
      render: {
        sprite: {
          texture: '/img/player/standing.right.png',
          yScale: 1,
          xScale: 1
        }
      },
      collisionFilter: {
        mask: defaultCategory
      }
    })),
    ground = Bodies.rectangle(window.innerWidth / 2, 750, window.innerWidth, 60, {
      isStatic: true,
      isFloor: true,
      collisionFilter: {
        mask: redCategory | defaultCategory
      }
    }),
    walls = {
      right: Bodies.rectangle(window.innerWidth, 300, 120, window.innerHeight, {
        isStatic: true,
        collisionFilter: {
          mask: redCategory | defaultCategory
        }
      }),
      left: Bodies.rectangle(0, 300, 120, window.innerHeight, {
        isStatic: true,
        collisionFilter: {
          mask: redCategory | defaultCategory
        }
      })
    },
    ceiling = Bodies.rectangle(window.innerWidth / 2, 0, window.innerWidth, 60, {
      isStatic: true
    }),
    allObjs = [];
  allObjs.push(ground, player.body, ground, walls.right, walls.left, ceiling);
  for (var key in movableObjects) {
    allObjs.push(movableObjects[key].body);
  }

  // add all of the bodies to the world
  World.add(engine.world, allObjs);
  World.add(engine.world, mouseConstraint);
  render.mouse = mouse;

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
    mousePos = {},
    initialDistance = '';
  Events.on(mouseConstraint, 'mousedown', function(e) {
    mousePos.x = e.mouse.position.x;
    mousePos.y = e.mouse.position.y;
    var objsToArray = [];
    for (var key in movableObjects) {
      objsToArray.push(movableObjects[key].body);
    }
    var tmp = Query.point(objsToArray, mousePos)[0];
    console.log(Query.point(objsToArray, mousePos))
    if (!tmp)
      return
    for (var key in movableObjects) {
      if (tmp == movableObjects[key].body) {
        lastObjClicked = movableObjects[key];
        initialDistance = player.getDistanceFrom(lastObjClicked.body);
      }
    }
  })

  Events.on(mouseConstraint, 'mouseup', function(e) {
    if (lastObjClicked)
      player.throw(lastObjClicked, e.mouse);
    lastObjClicked = null;

  })
  Events.on(engine, 'collisionStart', function(event) {
    event.pairs.forEach(function(pair) {
      if (pair.bodyA == player.body && pair.bodyB == ground || pair.bodyB == player.body && pair.bodyA == ground) {
        player.isOnGround = true;
      }
    })
  });
  Events.on(engine, 'collisionEnd', function(event) {
    var pair = event.pairs[0];
    if (pair.bodyA == player.body && pair.bodyB == ground) {
      player.isOnGround = false;
    }
  });
  // player.stress = 0;
  Events.on(engine, "beforeUpdate", function(e) {

    Render.lookAt(render, [player.body.position], {
      x: 500,
      y: 500
    }, true);
    if (lastObjClicked) {
      player.grab(lastObjClicked, initialDistance);
    }
    player.move(keys);
  })
}


main().then(() => console.log('Started'));
