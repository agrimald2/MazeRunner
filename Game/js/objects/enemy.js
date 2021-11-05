const ENEMY_SIZE = 25;
const DIR_NONE = 0;
const DIR_HORIZONTAL = 1;
const DIR_VERTICAL = 2;

class Enemy 
{
  constructor(x, y, wander = 0, direction = DIR_NONE, speed = 0) {
    this.position = createVector(x, y);
    this.size = createVector(ENEMY_SIZE, ENEMY_SIZE);
    this.speed = speed;
    this.direction = direction;
    //@note: there's probably a better way to do this, but it's 6am...
    this.minWanderX = this.position.x - wander;
    this.maxWanderX = this.position.x + wander;
    this.minWanderY = this.position.y - wander;
    this.maxWanderY = this.position.y + wander;
    this.currentDirection = 1;
  }

  move() {
    if(this.direction == DIR_HORIZONTAL) {
      this.position.x += this.currentDirection * this.speed;
      if(this.position.x > this.maxWanderX) this.currentDirection = -1;
      if(this.position.x < this.minWanderX) this.currentDirection = 1;
    } else if(this.direction == DIR_VERTICAL) {
      this.position.y += this.currentDirection * this.speed;
      if(this.position.y > this.maxWanderY) this.currentDirection = -1;
      if(this.position.y < this.minWanderY) this.currentDirection = 1;
    }
  }

  update() {
    this.move();
  }

  render() {
    fill(255, 0, 0);
    square(this.position.x, this.position.y, ENEMY_SIZE);
  }
}