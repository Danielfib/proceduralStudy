/* NEXT STEPS:
Doors are being checked and visually displayed according to its presence in a room
	- make it switch rooms (change player current room 
							and make it so that	it is drawn the current room. 
							And make player set postion on room based on entered door)
	- make it create non-linear level and transitions nicelly

- make an matrice of levels
- make map transition
- plan PG

observations:
- border being drawn multiple times, when it is only needed one
*/
var canvas, ctx;
var levelOne, playerOne;

//how large the wall is(so the player doesnt leave the room)
const BORDER_WIDTH = 40;

window.onload = function() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	setupLevels();
	setupPlayers();	

	var fps = 30;
	//run this function this often
	setInterval(updateAll, 1000/fps);
}

function updateAll(){
	moveAll();
	drawAll();

	//debug:
	//levelOne.intArray[playerOne.currentRoomCoordX][playerOne.currentRoomCordY] = 2;
}

function moveAll(){
	movePlayers();
	playerOne.currentRoom.checkDoorCollision(playerOne);
	//checkDoorCollision(playerOne);
}

function movePlayers(){
	playerOne.move();
}


function drawAll(){
	//canvas
	colorRect(0, 0, canvas.width, canvas.height, 'black');

	//player (a ball, for now)
	colorCircle(playerOne.x, playerOne.y, 10, 'red');

	//border (the rooms' walls)
	drawBorder(canvas.height,canvas.width, BORDER_WIDTH, 'green');
	
	drawDoors(playerOne.currentRoom, BORDER_WIDTH, 'red');
}

function setupLevels(){
	levelOne = new level(4); //the argument to level is numberOfRooms

	//setup levels matrices
	levelOne.setupInitialMatrices(5, 5); //dimensions of the empty matrix
	levelOne.createCrossExample();
}

function setupPlayers(){
	playerOne = new player();
}

