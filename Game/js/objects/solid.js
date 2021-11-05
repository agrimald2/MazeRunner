class Solid 
{
  constructor(pX, pY, sX, sY) {
    this.position = createVector(pX, pY);
    this.size = createVector(sX, sY);
  }

  render() {
    fill(0, 0, 0);
    rect(this.position.x, this.position.y, this.size.x, this.size.y);
  }
}