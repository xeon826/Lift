import createBackground from 'components/createBackground';
import MovableObject from 'components/MovableObject';
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
  // var boxA = Bodies.rectangle(400, 200, 80, 80);
  let vertices = Vertices.fromPath("0,40, 50,40, 50,115, 30,130, 20,130, 0,115, 0,40"), //player as a series of vertices
    boxA = Bodies.fromVertices(400, 200, vertices),
    boxB = Bodies.rectangle(950, 50, 80, 80);
  // var boxB = {
  //   body: Bodies.rectangle(950, 50, 80, 80),
  //   grab: function() {
  //
  //   }
  // };
  var movableObjects = [];
  var ground = Bodies.rectangle(window.innerWidth / 2, 610, window.innerWidth, 60, {
    isStatic: true
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
  var keys = {
    space: {
      code: 32,
      isDown: false
    },
    a: {
      code: 65,
      isDown: false
    },
    d: {
      code: 68,
      isDown: false
    },
    s: {
      code: 83,
      isDown: false
    },
    w: {
      code: 87,
      isDown: false
    }
  };
  document.body.onkeydown = function(e) {
    for (var index in keys) {
      if (e.keyCode == keys[index].code) {
        keys[index].isDown = true;
      }
    }
    // console.log('keydown', keys);
  }
  document.body.onkeyup = function(e) {
    // for (var index in keys) {
    //   if (e.keyCode == keys[index].code) {
    //   console.log(e.keyCode);
    //     keys[index].isDown = false;
    //   }
    // }
    if (e.keyCode == 32) {
      e.preventDefault();
      e.stopPropagation();
      Body.applyForce(boxA, {
        x: boxA.position.x,
        y: boxA.position.y
      }, {
        x: 0.00,
        y: -0.25
      });
    }
  }

  // add all of the bodies to the world
  World.add(engine.world, [boxA, boxB, ground, walls.right, walls.left, ceiling]);

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
  // Matter.Query.point(bodies, point)
  var mousePos = {},
    arr = [];
  // document.body.onmousemove = function(e) {
  var lastObjClicked = '';
  document.body.onmousedown = function(e) {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
    lastObjClicked = Query.point([boxB], mousePos)[0];
    console.log(arr);
  }
  document.body.onmouseup = function(e) {
    lastObjClicked = null;
  }
  Events.on(engine, "afterUpdate", function(e) {
    var speedCap = 10,
      baseRunningSpeed = 0.01,
      stopped = 0,
      speed = {
        x: keys['68'] || keys['65'] ? Math.abs(boxA.velocity.x) > speedCap ? stopped : baseRunningSpeed : stopped,
        y: keys['87'] ? Math.abs(boxA.velocity.y) > speedCap ? stopped : baseRunningSpeed : stopped
      }
    if (lastObjClicked) {
      Body.applyForce(lastObjClicked, {
        x: boxA.position.x,
        y: boxA.position.y
      }, {
        x: 0.01,
        y: 0.01
      });
    }

    Body.applyForce(boxA, {
      x: boxA.position.x,
      y: boxA.position.y
    }, {
      x: keys['65'] ? speed.x * -1 : speed.x,
      y: speed.y
    });

  })
}

main().then(() => console.log('Started'));
