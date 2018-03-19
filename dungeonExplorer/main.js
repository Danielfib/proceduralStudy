/* NEXT STEPS:
ROOM GENERATION:
	- on each cross room creation, a new room in any direction can be created, and from that one,
	  again and again.
	- BUT, it is unregulated: from one iteration to other, the number of rooms can greatly vary
	> Idea: for each adj room created, harder it gets to create again

	- discover how doors are working: every adjacent rooms has doors, but should they?

MINIMAP / DEBBUGING:
	- enbeauty the minimap
	- zoom in, and make the canvas center follow the room the player is in?
	- after, this minimap must not be able to show all the rooms

COMBAT:
	- make shots (just one shoot speed (one shoot per second))
	- make enemies (stand stills at first)

observations:
- border being drawn multiple times, when it is only needed one
*/
var canvas, ctx;
var levelOne, playerOne;
var lvlArray = []; //maybe I will need it later, together with lvlNumber

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
	//moveshots (and checks shots collision?)
}


function drawAll(){
	//canvas
	colorRect(0, 0, canvas.width, canvas.height, 'black');

	//player (a ball, for now)
	colorCircle(playerOne.x, playerOne.y, 10, 'red');

	//border (the rooms' walls) and doors
	drawBorder(canvas.height,canvas.width, BORDER_WIDTH, 'green');
	drawDoors(playerOne.currentRoom, BORDER_WIDTH, 'red');

	//draw shots	
}

function setupLevels(){
	//the last argument is level number
	levelOne = new level(4, LEVEL_ROWS, LEVEL_COLS, LEVEL_ONE_DIFFICULTY, 0); //the argument to level is numberOfRooms

	//setup levels matrices
	levelOne.setupInitialMatrices(5, 5); //dimensions of the empty matrix
	//levelOne.createCrossExample(); //rooms disposal used for now
	levelOne.generateRandomLevel();
}

function setupPlayers(){
	playerOne = new player(levelOne.playerInitialX, levelOne.playerInitialY);
}

