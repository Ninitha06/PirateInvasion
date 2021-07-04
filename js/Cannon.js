class Cannon {
  constructor(x, y, w, h, angle) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.angle = angle;
  }

  display() {
      fill("#676e6a");
      if (keyIsDown(LEFT_ARROW) && this.angle<0.35) {
          this.angle += 0.02;
      }
      if (keyIsDown(RIGHT_ARROW) && this.angle>-1.45) {
          this.angle -= 0.02;
      }
      push();
      translate(this.x, this.y);
    rotate(this.angle);
    //basically this is this.x-20, this.y-13
      rect(-20, -13, this.width, this.height);
     
      pop();
     //Arc outside pop to fit the tower
      arc(this.x-30, this.y + 95, 155, 230, PI, TWO_PI);
       noFill();
  }
}
