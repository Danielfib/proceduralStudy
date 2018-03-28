/* NEXT STEPS:
ROOM GENERATION:
	- on each cross room creation, a new room in any direction can be created, and from that one,
	  again and again.
	- BUT, it is unregulated: from one iteration to other, the number of rooms can greatly vary, so for each adj room created, harder it gets to create again
	- BUT, still, it can vary, so, set a maximum(done) and minimum(done) value to room creation
		^ maybe this is being done not effectively?

	- discover how doors are working: every adjacent rooms has doors, but should they?

MINIMAP / DEBBUGING:
	- embeauty the minimap
	- zoom in, and make the canvas center follow the room the player is in?
	- after, this minimap must not be able to show all the rooms

COMBAT:
	- make shots (for now just one shoot speed)
		^bug: when plpayer tries to shoot at multiple direction at the same time, the player doesnt shoot at all
	
	- drawn enemies properly
	- make enemies move
	- make enemies chase player

observations:
- border being drawn multiple times, when it is only needed one
*/
var canvas, ctx;
var levelOne, playerOne;

//how large the wall is(so the player doesnt leave the room)
const BORDER_WIDTH = 40;
//these two will always remain the same for now

window.onload = function() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	setupLevels();
	setupPlayers();
	setupMinimap(levelOne); //static, for now	

	var fps = 30;
	//run this function this often (milliseconds)
	setInterval(updateAll, 1000/fps);
	setInterval(shoot, PLAYER_SHOOT_SPEED);
}

function shoot(){
	playerOne.shoot(); //being called here, it is too fast
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
	for(var i = 0; i < contShots; i++){
		shotsArray[i].moveShots();
	}
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
	for(var i = 0; i < contShots; i++){
		colorCircle(shotsArray[i].x, shotsArray[i].y, shotsArray[i].size, 'grey');
	}

	//draw enemies
	for (var i = 0; i < lvlOneEnemies.length; i++){
		colorRect(lvlOneEnemies[i].x, lvlOneEnemies[i].y, ENEMY_SQUARE, ENEMY_SQUARE, 'blue');
	}
}

function setupLevels(){
	//the last argument is level number
	levelOne = new level(4, LEVEL_ROWS, LEVEL_COLS, LEVEL_ONE_DIFFICULTY, 0, LEVEL_ONE_MAX_ROOMS, LEVEL_ONE_MIN_ROOMS); //the argument to level is numberOfRooms

	//setup levels matrices
	levelOne.setupInitialMatrices(5, 5); //dimensions of the empty matrice
	//levelOne.createCrossExample(); //rooms disposal used for now
	while(levelOne.minRooms  > levelOne.roomCount){
		levelOne.generateRandomLevel();
	}

	generateRandomEnemies(5, BORDER_WIDTH);
}

function setupPlayers(){
	playerOne = new player(levelOne.playerInitialX, levelOne.playerInitialY);
}

