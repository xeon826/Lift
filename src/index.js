import createBackground from 'components/createBackground';
import Player from 'components/Player';
import Enemy from 'components/Enemy';
import MovableObject from 'components/MovableObject';
import {
  Howl,
  Howler
} from 'howler';
import Entity from 'components/Entity';
import Architecture from 'components/Architecture';
import decomp from 'poly-decomp'
import 'main.css';
import {
  Engine,
  World,
  Events,
  MouseConstraint,
  Common,
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
  window.decomp = decomp

  // var ambience = new Howl({
  //   src: ['/sound/ambience.mp3'],
  //   autoplay: true,
  //   loop: true,
  //   volume: 0.2,
  // });
  var contact = new Howl({
    src: ['/sound/contact.mp3'],
  });

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
  var movableObjects = {},
    enemies = {},
    architectures = {},
    objects = {};
  for (var key in objectBluePrints) {
    objectBluePrints[key].forEach((obj) => {
      var body = '',
        type = obj.type,
        category = key,
        object = {};
      switch (type) {
        case 'rectangle':
          body = Bodies.rectangle(obj.x, obj.y, obj.width, obj.height, obj.options);
          break;
        case 'vertice':
          body = Bodies.fromVertices(obj.x, obj.y, Vertices.fromPath(obj.path), obj.options);
          break;
      }
      switch (category) {
        case 'movables':
          object = Common.extend(body, new MovableObject);
          break;
        case 'enemies':
          object = Common.extend(body, new Enemy);
          object.inertia = Infinity;
          object.collisionFilter.mask = 0x0001 | 0x0002;
          break;
        case 'architectures':
          object = Common.extend(body, new Architecture);
          break;
      }
      objects[key] = objects[key] ? objects[key] : [];
      objects[key].push(object);
    })
  }
  objects.getBodiesAsArray = function(key) {
    var bodies = [];
    this[key].forEach((item, i) => {
      bodies.push(item);
    });
    return bodies;
  }
  var player = Common.extend(Bodies.fromVertices(100, 500, Vertices.fromPath("0,40, 50,40, 50,115, 30,130, 20,130, 0,115, 0,40"), {
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
  }), new Player)
  // add all of the bodies to the world
  objects.player = [player];
  for (var key in objects) {
    if (typeof objects[key] != 'function')
      objects[key].forEach(function(obj) {
        World.add(engine.world, obj);
      })
  }
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
      objsToArray.push(movableObjects[key]);
    }
    var tmp = Query.point(objects.getBodiesAsArray('movables'), mousePos)[0];
    if (!tmp)
      return
    lastObjClicked = tmp;
    lastObjClicked.playGrabSound();
    initialDistance = objects.player[0].getDistanceFrom(lastObjClicked);
  })

  Events.on(mouseConstraint, 'mouseup', function(e) {
    if (lastObjClicked) {
      player.throw(lastObjClicked, e.mouse);
      lastObjClicked.playThrowSound();
    }
    lastObjClicked = null;

  })
  Events.on(engine, 'collisionStart', function(event) {
    event.pairs.forEach(function(pair) {
      if (pair.bodyA.isGround || pair.bodyB.isGround && pair.bodyA == objects.player[0] || pair.bodyB == objects.player[0]) {
        player.isOnGround = true;
      } else if (objects.architectures.includes(pair.bodyA) && objects.movables.includes(pair.bodyB) || objects.architectures.includes(pair.bodyB) && objects.movables.includes(pair.bodyA)) {
        var idHowl = contact.play();
        contact.volume([0, pair.separation, 100].scaleBetween(0, 1)[1], idHowl)
      }
    })
  });
  Events.on(engine, 'collisionEnd', function(event) {
    event.pairs.forEach(function(pair) {
      if (pair.bodyA.isGround || pair.bodyB.isGround && pair.bodyA == objects.player[0] || pair.bodyB == objects.player[0]) {
        objects.player[0].isOnGround = false;
      }
    })
  });
  Events.on(engine, "beforeUpdate", function(e) {
    Render.lookAt(render, [player.position], {
      x: 500,
      y: 500
    }, true);
    if (lastObjClicked) {
      player.grab(lastObjClicked, initialDistance);
    }
    player.move(keys, mouseConstraint);
    objects.enemies.forEach((enemy) => {
      if (player.getDistanceFrom(enemy) < 600)
        enemy.runToward(player);
    })
  })
}
    let canvas;
    let context;

    window.onload = init;

    function init(){
        canvas = document.querySelector('canvas');
        context = canvas.getContext('2d');

        // Start the first frame request
        window.requestAnimationFrame(gameLoop);
    }

    function gameLoop(timeStamp){
        draw();

        // Keep requesting new frames
        window.requestAnimationFrame(gameLoop);
    }

    function draw(){
        // let randomColor = Math.random() > 0.5? '#ff8080' : '#0099b0';
        // context.fillStyle = randomColor;
        // context.fillRect(100, 50, 200, 175);
    }


main().then(() => console.log('Started'));
