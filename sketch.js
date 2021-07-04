const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var canvas, angle, tower, ground, cannon;
var balls = [];
var boats = [];
var boatAnimation = [];
var boatSpriteData, boatSpriteSheet;
var brokenBoatSpriteData, brokenBoatSpriteSheet;
var brokenBoatAnimation = [];
var waterSplashAnimation = [];
var waterSplashData, waterSplashSpriteSheet;
var bgMusic, pirateSound, cannonSound, waterSound;
var isGameOver = false,
  isLaughing = false;
var score = 0;

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  boatSpriteData = loadJSON("assets/boat/shipsailing.json");
  boatSpriteSheet = loadImage("assets/boat/shipsailing.png");
  brokenBoatSpriteData = loadJSON("assets/boat/brokenship.json");
  brokenBoatSpriteSheet = loadImage("assets/boat/brokenship.png");
  waterSplashData = loadJSON("assets/water_splash/water_splash.json");
  waterSplashSpriteSheet = loadImage("assets/water_splash/water_splash.png");
  bgMusic = loadSound("assets/background_music.mp3");
  cannonSound = loadSound("assets/cannon_explosion.mp3");
  waterSound = loadSound("assets/cannon_water.mp3");
  pirateSound = loadSound("assets/pirate_laugh.mp3");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angle = -PI / 4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 110, 110, 50, angle);

  var boatFrames = boatSpriteData.frames;
  for (var i = 0; i < boatFrames.length; i++) {
    let pos = boatFrames[i].position;
    let img = boatSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
    boatAnimation.push(img);
  }

  var brokenBoatFrames = brokenBoatSpriteData.frames;
  for (var j = 0; j < brokenBoatFrames.length; j++) {
    let pos = brokenBoatFrames[j].position;
    let img = brokenBoatSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
    brokenBoatAnimation.push(img);
  }

  var waterSplashFrames = waterSplashData.frames;
  for (var k = 0; k < waterSplashFrames.length; k++) {
    let pos = waterSplashFrames[k].position;
    let img = waterSplashSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
    waterSplashAnimation.push(img);
  }
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  fill("#6d4c41");
  textSize(40);
  textAlign(CENTER, CENTER);
  text(`Score : ${score}`, width - 200, 50);

  if (!bgMusic.isPlaying()) {
    bgMusic.play();
    bgMusic.setVolume(0.1);
  }

  Engine.update(engine);
  ground.display();

  cannon.display();
  tower.display();

  showBoats();

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    for (var j = 0; j < boats.length; j++) {
      if (balls[i] != undefined && boats[j] != undefined) {
        var collision = Matter.SAT.collides(balls[i].body, boats[j].body);
        if (collision.collided) {
          if (!boats[j].isBroken && !balls[i].isSink) {
            boats[j].remove(j);
            score += 5;
            World.remove(world, balls[i].body);
            balls.splice(i, 1);
            i--;
          }
        }
      }
    }
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW && !isGameOver) {
    cannonSound.play();
    balls[balls.length - 1].shoot();
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW && !isGameOver) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  ball.animate();
  ball.display();
  if (ball.body.position.x >= width || ball.body.position.y > height - 50) {
    if (!ball.isSink) {
      waterSound.play();
      ball.remove(index);
    }
  }
}

function showBoats() {
  if (boats.length > 0) {
    if (
      boats.length < 4 &&
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-100, -90, -60, -80];
      var position = random(positions);
      var boat = new Boat(
        width,
        height - 100,
        150,
        150,
        position,
        boatAnimation
      );
      boats.push(boat);
    }

    for (var i = 0; i < boats.length; i++) {
      Matter.Body.setVelocity(boats[i].body, { x: -0.9, y: 0 });
      boats[i].display();
      boats[i].animate();
      var collision = Matter.SAT.collides(boats[i].body, tower.body);
      if (collision.collided && !boats[i].isBroken) {
        if (!isLaughing) {
          pirateSound.play();
          isLaughing = true;
        }
        gameOver();
        isGameOver = true;
      }
    }
  } else {
    var boat = new Boat(width, height - 100, 150, 150, -70, boatAnimation);
    boats.push(boat);
  }
}

function gameOver() {
  swal(
    {
      title: "Game Over!!!",
      text: "Thanks for playing!!",
      imageUrl: "assets/boat.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again",
    },
    function (isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}
