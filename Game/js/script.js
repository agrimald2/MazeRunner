const CLEAR_COLOR = 255;

let counter = 0;

let player;
let goal;
let enemies = [];
let solids = [];

let enemyCount = 0;
let solidCount = 0;

//@note: Here we define the Canvas, that is the main part of the game structure
//@note: Also create the player and call the level builder
function setup() {
    createCanvas(700, 900);
    player = new Player(25, 50);
    buildLevel();
}

//@note: Level Builder
//@note: Walls, Enemies, Solids, Goals
//@note: I could call this function to create as many levels scenes as I want

function buildLevel() {
    //@note: create main walls
    createSolid(0, 0, 700, 25);
    createSolid(0, 875, 700, 25);
    createSolid(0, 0, 25, 900);
    createSolid(675, 0, 25, 900);

    //@note: create respawn area
    createSolid(0, 75, 100, 25);
    createSolid(100, 50, 25, 50);

    
    //@note: create HORIZONTAL enemies 
    for (let i = 100; i <=450; i = i + 25){
        createEnemy(345, i, 320, DIR_HORIZONTAL, 1);
    }
    for (let i = 100; i <=450; i = i + 25){
        createEnemy(345, i, 640, DIR_HORIZONTAL, 1);
    }

    //@note: creatAnoyingVerticalThree
    for (let i = 35; i <=700; i = i + 75){
        createEnemy(i, 525, 50, DIR_VERTICAL, 1);
    }

    //@note: createBOTH
    for (let i = 650; i < 750; i = i + 25){
        createEnemy(345, i, 345, DIR_HORIZONTAL, 1);
    }

    for (let i = 35; i <=700; i = i + 75){
        createEnemy(i, 675, 50, DIR_VERTICAL, 1);
    }

    //@note: createStatic
    
    //@note: COLUMNS
    for (let z = 50; z <= 550; z = z + 55){
        for (let i = 765; i <= 865; i = i + 25){
            createEnemy(z, i);
        }
    }

    //@note: ROWS
    for(let v = 775; v <= 855; v = v + 25 ){
        for (let y = 75; y <= 600; y = y + 55){
            createEnemy(y, v);
        }
    }
 



    
    //@note: create middle wall 1
    createSolid(50, 450, 650, 15);

    //@note: create middle wall 2
    createSolid(0, 600, 650, 15);

    //@note: create middle wall 2
    createSolid(50, 750, 650, 15);


    //@note: goal
    goal = new Goal(625, 820);
   
}

function createEnemy(x, y, wander = 0, direction = DIR_NONE, speed = 0) {
    enemies[enemyCount] = new Enemy(x, y, wander, direction, speed);
    enemyCount++;
}

function createSolid(pX, pY, sX, sY) {
    solids[solidCount] = new Solid(pX, pY, sX, sY);
    solidCount++;
}

//@note: The main logic of the game
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
    counter = counter + 1;
    console.log(counter)
    document.getElementById('counter').innerHTML = counter;
}

function won() {
    console.log("you won!!!");
    window.location.href = "won.html";
}