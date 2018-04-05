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

	BUG: sometimes, there are rooms being generated not linked to other rooms, impossible to get to
		^bug appearing in commit dca07628465c4b0d4094a49a2f10c023b4ac5252, "[RG] determining minimum number of rooms generated"
		^see how miminum room limit is affecting this

COMBAT:
	- make shots (for now just one shoot speed)
		^bug: try to shoot in multiple directions ate the  same time
			^ in a certain way, the player doesnt shoot when key is pressed:
			shoot to direction A, then to B, still holding A, release B. The play won't be shooting to A.
	
	- make shots hit enemy
		^shots are going through them, should they?
		
	- draw enemies properly (they are being drawn on top of each other and on top of doors)
	- make enemies move
	- make enemies chase player(done)
		^make enemy collision and maybe better chasing?

	- make boss room

observations:
- border being drawn multiple times, when it is only needed one
*/
var selectedPlay = false;
var canvas, ctx;
var levelOne, playerOne;

//how large the wall is(so the player doesnt leave the room)
const BORDER_WIDTH = 40;
//these two will always remain the same for now

window.onload = function() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	if(selectedPlay){ //selecionou play no menu
		setupLevels();
		setupPlayers();
		setupMinimap(levelOne); //static, for now	

		var fps = 30;
		//run this function this often (milliseconds)
		setInterval(updateAll, 1000/fps);
		setInterval(shoot, PLAYER_SHOOT_SPEED);	
	} else {
		prepareMenu();
	}
}

function prepareMenu(){
	//var fps = 30;
	//run this function this often (milliseconds)
	setupMenu();
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

	//check shots hitting enemies
	for(var i = 0; i < playerOne.currentRoom.enemyQnt; i++){
		playerOne.currentRoom.enemyArray[i].checkIfShot();
	}

	//make enemies chase player
	enemyChase(playerOne);
}

function enemyChase(player){
	for(var i = 0; i < player.currentRoom.enemyQnt; i++){
		playerOne.currentRoom.enemyArray[i].chase(player);
	}
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
	drawDoors(playerOne.currentRoom, BORDER_WIDTH, 'red', 'grey');

	//draw shots	
	for(var i = 0; i < contShots; i++){
		colorCircle(shotsArray[i].x, shotsArray[i].y, shotsArray[i].size, 'grey');
	}

	//draw enemies
	//for now, using 5x5 as standar matrices size
	for (var i = 0; i < 5; i++){
		for (var j = 0; j < 5; j++){
			//draw ememies on player current room
			for(var k = 0; k < playerOne.currentRoom.enemyQnt; k++){
				var currEnemy = playerOne.currentRoom.enemyArray[k];
				colorRect(currEnemy.x, currEnemy.y, ENEMY_SQUARE, ENEMY_SQUARE, 'blue');	
			}
		}
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
}

function setupPlayers(){
	playerOne = new player(levelOne.playerInitialX, levelOne.playerInitialY);
}