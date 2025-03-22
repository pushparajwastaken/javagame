let state = {};

const canvas = document.getElementById("game");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

// Initialize the game on load
window.onload = function () {
  newGame();
};

function newGame() {
  state = {
    phase: "aiming", //aiming || in flight || celebrating
    currentPlayer: 1,
    bomb: { x: undefined, y: undefined, rotation: 0, velocity: { x: 0, y: 0 } },
    backgroundBuildings: [],
    buildings: [],
    blastHoles: [],
  };

  generateBackgroundBuildings(); // Generate buildings dynamically based on screen width
  for (let index = 0; index < 8; index++) {
    generateBuildings(8);
  }
  initialBombPosition(); //the initial position of the bomb should align with the hands of the gorilla
  //so we can only initialize this once the level is generated
  draw();
}

// Draw Everything
function draw() {
  ctx.save();
  ctx.translate(0, canvas.height);
  ctx.scale(1, -1);

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
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#FFC0CB");
  gradient.addColorStop(0.5, "#FF69B4");
  gradient.addColorStop(1, "#C71585");

  //Draw Sky
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw Moon
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.beginPath();
  ctx.arc(300, 450, 65, 0, 2 * Math.PI);
  //1st argument-x coordinate
  //2nd argument-y coordinate
  //3rd argument-radius
  //the last two arguments are the start and end angles of the arc in radians
  ctx.fill();
}

function drawBackgroundBuildings() {
  state.backgroundBuildings.forEach((building) => {
    ctx.fillStyle = "#e1daff";
    ctx.fillRect(building.x, 0, building.width, building.height);
  });
}

function drawBuildings() {
  state.buildings.forEach((building) => {
    //Draw Buildings
    ctx.fillStyle = "#4A3C68";
    ctx.fillRect(building.x, 0, building.width, building.height);
    //Draw Windows
    const windowwidth = 10;
    const windowheight = 12;
    const gap = 15;
    const numberoffloors = Math.ceil(
      (building.height - gap) / (windowheight + gap)
    );
    const numberofRoomsperfloor = Math.floor(
      (building.width - gap) / (windowwidth + gap)
    );
  });
}
function generateBackgroundBuildings() {
  state.backgroundBuildings = []; // Reset buildings

  const minWidth = 60;
  const maxWidth = 110;
  const gap = 4; // Keep gap constant

  let x = -30; // Start position of first building

  while (x < canvas.width) {
    const width = minWidth + Math.random() * (maxWidth - minWidth);
    const height = 80 + Math.random() * 270; // Between 80px and 350px height

    state.backgroundBuildings.push({ x, width, height });

    x += width + gap;
  }
}
function generateBuildings(index) {
  const previousBuildings = state.buildings[index - 1];
  const x = previousBuildings
    ? previousBuildings.x + previousBuildings.width + 4
    : 0; // Gap between buildings
  const minWidth = 80;
  const maxWidth = 130;
  const width = minWidth + Math.random() + (maxWidth - minWidth);

  const platformwithGorilla = index === 1 || index === 6;
  const minHeightGorilla = 30;
  const maxHeightGorilla = 150;
  const minHeight = 40;
  const maxHeight = 300;
  const height = platformwithGorilla
    ? minHeightGorilla + Math.random() + (maxHeightGorilla - minHeightGorilla)
    : minHeight + Math.random() + (maxHeight - minHeight);
  //generate an array of booleans to show if the light is on or not
  const lightson = [];
  for (let i = 0; i < 50; i++) {
    const light = Math.random() <= 0.33 ? true : false;
    lightson.push(light);
  }
  state.buildings.push({ x, width, height, lightson });
}

function initialBombPosition() {}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  generateBackgroundBuildings(); // Adjust number of buildings based on new size
  draw();
}

// Listen for window resize events
window.addEventListener("resize", resizeCanvas);
