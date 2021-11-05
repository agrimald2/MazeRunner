const GOAL_SIZE = 25;

class Goal
{
  constructor(x, y)
  {
    this.position = createVector(x, y);
    this.size = createVector(GOAL_SIZE, GOAL_SIZE);
  }

  render() {
    fill(255, 255, 0);
    square(this.position.x, this.position.y, GOAL_SIZE);
  }
}