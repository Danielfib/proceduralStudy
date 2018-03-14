/* NEXT STEPS:
ROOM GENERATION:
	- rooms are being randomly created, but on disformed cross example
	- how to make it create rooms on diagonal? 
	- maybe changing my algorithm to use 2 counters insteado of one?
	- maybe use quadrant algorithm, only to create diagonal ones, and leave the cross creation as it is
	  this algorithm may use 2 counters, to choose the quadrant, and the cross might be lixe the axis.

	- BUT, maybe it is a better option to make that each room has a chance of creating an adjacent one.

MINIMAP / DEBBUGING:
	- enbeauty the minimap
	- zoom in, and make the canvas center follow the room the player is in?
	- after, this minimap must not be able to show all the rooms

COMBAT:
	- make shots
	- make enemies (stand stills at first)

observations:
- border being drawn multiple times, when it is only needed one
*/
var canvas, ctx;
var levelOne, playerOne;

//how large the wall is(so the player doesnt leave the room)
const BORDER_WIDTH = 40;
//these two will always remain the same for now
const LEVEL_ROWS = 5;
const LEVEL_COLS = 5;
const LEVEL_ONE_DIFFICULTY = 2;

window.onload = function() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	setupLevels();
	setupPlayers();
	setupMinimap(levelOne); //static, for now	

	var fps = 30;
	//run this function this often
	setInterval(updateAll, 1000/fps);
}

function updateAll(){
	moveAll();
	drawAll();
}

function moveAll(){
	movePlayers();
	playerOne.currentRoom.checkDoorCollision(playerOne);
}

function movePlayers(){
	playerOne.move();
}


function drawAll(){
	//canvas
	colorRect(0, 0, canvas.width, canvas.height, 'black');

	//player (a ball, for now)
	colorCircle(playerOne.x, playerOne.y, 10, 'red');

	//border (the rooms' walls) and doors
	drawBorder(canvas.height,canvas.width, BORDER_WIDTH, 'green');
	drawDoors(playerOne.currentRoom, BORDER_WIDTH, 'red');

	
}

function setupLevels(){
	levelOne = new level(4, LEVEL_ROWS, LEVEL_COLS, LEVEL_ONE_DIFFICULTY); //the argument to level is numberOfRooms

	//setup levels matrices
	levelOne.setupInitialMatrices(5, 5); //dimensions of the empty matrix
	//levelOne.createCrossExample(); //rooms disposal used for now
	levelOne.generateRandomLevel();
}

function setupPlayers(){
	playerOne = new player(levelOne.playerInitialX, levelOne.playerInitialY);
}

