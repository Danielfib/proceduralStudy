/* NEXT STEPS:
Doors are being checked and visually displayed according to its presence in a room
	- Check collision
	- switch rooms 

- make 1 map and tilemap it
- make an matrice of tilemaps
- make map transition
- plan PG

observations:
- border being drawn multiple times, when it is only needed one
*/
var canvas, ctx;
var levelOne = new level(4); //the argument to level is numberOfRooms
//create linear example of rooms in level one(4 levels, left to right)
levelOne.createLinearExample();
var playerOne = new player();

//how large the wall is(so the player doesnt leave the room)
const BORDER_WIDTH = 40;

window.onload = function() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

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
	
	drawDoors(levelOne.roomsArray[1], BORDER_WIDTH, 'red');
}



