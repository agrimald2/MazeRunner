const PLAYER_SIZE = 50;

const COL_SOLID = 0;
const COL_ENEMY = 1;
const COL_GOAL = 2;

class Player
{
  constructor(x, y) {
    this.position = createVector(x, y);
    this.spawnPositionX = x;
    this.spawnPositionY = y;
    this.size = PLAYER_SIZE;
    this.speed = 5;
    this.isAlive = true;
    this.isFinished = false;

    this.velocity = createVector(0, 0);
  }
  
  move() {
    this.velocity = createVector(0, 0);
    this.velocity.x = keyIsDown(RIGHT_ARROW) - keyIsDown(LEFT_ARROW);
    this.position.x += this.velocity.x * this.speed;

    this.velocity.y = keyIsDown(DOWN_ARROW) - keyIsDown(UP_ARROW);
    this.position.y += this.velocity.y * this.speed;
  }

  respawn() {
    this.position = createVector(this.spawnPositionX, this.spawnPositionY);
    this.isAlive = true;
    player.isFinished = false;
  }

  isOverlap(bPos, bSize, col) {
    let aPos = this.position;
    let aSize = this.size;
    
    if(aPos.x < bPos?.x + bSize.x && bPos?.x < aPos.x + aSize &&
    aPos.y < bPos?.y + bSize.y && bPos?.y < aPos.y + aSize)
    {
      if(col == COL_ENEMY) this.isAlive = false;
      else if(col == COL_SOLID) this.resolveCollision();
      else if(col == COL_GOAL) this.isFinished = true;
    }
  }

  resolveCollision() {
    this.position.x -= this.velocity.x * this.speed;
    this.position.y -= this.velocity.y * this.speed;
  }

  update() {
    if(this.isAlive) this.move();
  }

  render() {
    fill(0, 255, 0);
    square(this.position.x, this.position.y, PLAYER_SIZE);
  }
}