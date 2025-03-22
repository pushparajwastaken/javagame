//state of the game
let state = {};

//main canvas element and it's drawing context

const canvas = document.getElementById("game");

// Set the canvas width to match the full width of the window
canvas.width = window.innerWidth;

// Set the canvas height to match the full height of the window
canvas.height = window.innerHeight;

// Get the 2D drawing context, which allows us to draw shapes, images, and text
const ctx = canvas.getContext("2d");

window.onload = function () {
  newGame();
};

function newGame() {
  //reset game state
  state = {
    phase: "aiming", //aiming || in flight || celebrating
    currentPlayer: 1,
    bomb: {
      x: undefined,
      y: undefined,
      rotation: 0,
      velocity: {
        x: 0,
        y: 0,
      },
    },
    //Buildings
    backgroundBuildings: [],
    buildings: [],
    blastHoles: [],
  };
  //Generate background Buildings
  for (let i = 0; i < 10; i++) {
    generateBackgroundBuilding(i);
  }
  for (let i = 0; i < 8; i++) {
    generateBuilding(i);
  }

  initialBombPosition(); //the initial position of the bomb should align with the hands of the gorilla
  //so we can only initialize this once the level is generated
  draw();
}

function draw() {
  ctx.save();
  ctx.translate(0, window.innerHeight);
  ctx.scale(1, -1);

  //draw scene
  drawBackground();
  drawBackgroundBuildings();
  drawBuildings();
  drawGorilla(1);
  drawGorilla(2);
  drawBomb();
  ctx.restore();
}

//Event Handlers

function throwBomb() {}

//this will be responsible to calculate the exact location of the bomb while it is in the air
function animate(timestamp) {}

function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
  gradient.addColorStop(0, "#FFC0CB"); //
  gradient.addColorStop(0.5, "#FF69B4");
  gradient.addColorStop(1, "#C71585");

  //Draw Sky
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  //Draw Moon
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.beginPath();
  ctx.arc(300, 450, 65, 0, 2 * Math.PI);
  //1st argument-x coordinate
  //2nd argument-y coordinate
  //3rd argument-radius
  //the last two arguments are the start and end angles of the arc in radians

  ctx.fill();
}
function drawBackgroundBuildings() {}

//utility function
function generateBackgroundBuilding(index) {
  const previousBuilding = state.backgroundBuildings(index - 1);
  const x = previousBuilding
    ? previousBuilding.x + previousBuilding.width + 4
    : -30;
}
function generateBuilding(index) {}

function initialBombPosition() {
  //this function will calculate the exact position of the bomb based on the level
}
