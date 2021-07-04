class Boat{
    constructor(x, y, w, h, boatYPos, boatAnimation) {
        this.boatYPos = boatYPos;
        this.width = w;
        this.height = h;

        var options = {
            restitution: 0.8,
            friction: 1,
            density : 1
        }
        this.animation = boatAnimation;
        this.speed = 0.05;
        this.isBroken = false;
        

        this.body = Bodies.rectangle(x, y, w, h, options);
        World.add(world, this.body);
       
        
    }
    remove(index) {
        this.animation = brokenBoatAnimation;
        this.speed = 0.05;
        this.isBroken = false;
        
        this.width = 300;
        this.height = 300;
        setTimeout(() => {
            World.remove(world, boats[index].body);
            boats.splice(index, 1);
        }, 2000);
    }
    display() {
        var pos = this.body.position;
        var angle = this.body.angle;
        var index = floor(this.speed % this.animation.length);
              
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.animation[index], 0, this.boatYPos, this.width, this.height);
        noTint();
        pop();

    }

    animate() {
        //You can also initialize this.speed = 0 and then in animate, just do this.speed = this.speed + 0.05
        this.speed += 0.05 % 1.1;
    }
}