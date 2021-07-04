class CannonBall {
  constructor(x, y) {
    var options = {
      isStatic: true,
      density: 1.0,
      friction: 1.0,
      restitution: 0.8,
    };
    this.r = 40;
    this.body = Bodies.circle(x, y, this.r);
    World.add(world, this.body);
    this.img = loadImage("./assets/cannonball.png");
    this.animation = [this.img];
    this.trajectory = [];
    this.speed = 0.05;
    this.isSink = false;
  }

  display() {
    var pos = this.body.position;
    var angle = this.body.angle;
    var index = floor(this.speed % this.animation.length);
    console.log(index);

    // having x velocity > 10 maekes sure the trajectory is not overcrowded
    if (pos.x > 300 && this.body.velocity.x > 10) {
      var position = [pos.x, pos.y];
      this.trajectory.push(position);
    }

    for (var i = 0; i < this.trajectory.length; i++){
      image(this.img, this.trajectory[i][0], this.trajectory[i][1], 5, 5);
    }

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.animation[index], 0, 0, this.r, this.r);
    pop();
    }
    
    shoot() {
        var velocity = p5.Vector.fromAngle(cannon.angle);
        velocity.mult(20);
        Matter.Body.setStatic(this.body, false); //Not required
        Matter.Body.setVelocity(this.body, { x: velocity.x, y: velocity.y });
  }
  
  animate() {
    this.speed += 0.05 % 1.1;
  }

  remove(index) {

    this.isSink = true;
    Matter.Body.setVelocity(this.body, { x: 0, y: 0 });
    this.animation = waterSplashAnimation;
    this.speed = 0.05;
    this.r = 150;
    setTimeout(() => {
      World.remove(world, balls[index].body);
      balls.splice(index, 1);
    },1000)
    
  }
}
