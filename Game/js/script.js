const CLEAR_COLOR = 255; //@note: white

let player;
let goal;
let enemies = [];
let solids = [];

let enemyCount = 0;
let solidCount = 0;


function setup() {
    createCanvas(700, 700);
    player = new Player(300, 50);
    buildLevel();
}

function buildLevel() {
    //@note: create walls
    createSolid(0, 0, 700, 25);
    createSolid(0, 675, 700, 25);
    createSolid(0, 0, 25, 700);
    createSolid(675, 0, 25, 700);

    //@note: create enemies 
    createEnemy(250, 300, 100, DIR_HORIZONTAL, 10);
    createEnemy(200, 300, 100, DIR_VERTICAL, 10);
    createEnemy(100, 300);

    //@note: goal
    goal = new Goal(600, 600);
}

function createEnemy(x, y, wander = 0, direction = DIR_NONE, speed = 0) {
    enemies[enemyCount] = new Enemy(x, y, wander, direction, speed);
    enemyCount++;
}

function createSolid(pX, pY, sX, sY) {
    solids[solidCount] = new Solid(pX, pY, sX, sY);
    solidCount++;
}

function update() {
    player.update();
    enemies.forEach(enemy => enemy.update());

    enemies.forEach(enemy => player.isOverlap(enemy.position, enemy.size, COL_ENEMY));
    solids.forEach(solid => player.isOverlap(solid.position, solid.size, COL_SOLID));
    player.isOverlap(goal.position, goal.size, COL_GOAL);

    if (!player.isAlive) gameOver();
    if (player.isFinished) won();
}

function draw() {
    update();

    //@note: actual render happens here
    background(CLEAR_COLOR);
    enemies.forEach(enemy => enemy.render());
    solids.forEach(solid => solid.render());
    goal.render();
    player.render();
}

function gameOver() {
    console.log("you died :(");
    player.respawn();
}

function won() {
    console.log("you won!!!");
    window.location.href = "won.html";
    player.respawn();
}