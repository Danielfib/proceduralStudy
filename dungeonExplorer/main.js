/*
- next step: make 1 map and tilemap it
- make an matrice of tilemaps
- make map transition
- plan PG

observations:
- border being drawn multiple times, when it is only needed one
*/
var canvas, ctx;
var playerOne = new player();
var levelOne = new level(4); //the argument to level is numberOfRooms

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

	//create linear example of rooms in level one
	levelOne.createLinearExample();
}

function moveAll(){
	movePlayers();
}

function movePlayers(){
	playerOne.move();
}


function drawAll(){
	//canvas
	colorRect(0, 0, canvas.width, canvas.height, 'black');

	//player (a ball, for now)
	colorCircle(playerOne.x, playerOne.y, 10, 'red');

	//border
	colorRect(0, 0, canvas.width, BORDER_WIDTH/2, 'green'); //upper wall
	colorRect(0, 0, BORDER_WIDTH/2, canvas.height, 'green'); //western wall
	colorRect(canvas.width - BORDER_WIDTH/2, 0, BORDER_WIDTH/2, canvas.height, 'green'); //eastern wall
	colorRect(0, canvas.height - BORDER_WIDTH/2, canvas.width, BORDER_WIDTH/2, 'green'); //southern wall
}

//graphic functions
function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor){
	ctx.fillStyle = fillColor;
	ctx.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor){
	ctx.fillStyle = fillColor;
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	ctx.fill();
}



