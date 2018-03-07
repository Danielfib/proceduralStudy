const PLAYER_MOVESPEED = 10;
const DISTANCE_AFTER_DOOR = 50;

function player(){
	this.x = 400;
	this.y = 300;	

	this.currentLevel = levelOne;
	this.currentRoomCoordX = 2;
	this.currentRoomCoordY = 2;
	//this.currentRoom = levelOne.roomsArray[this.currentRoomCoord]; //player for now starts at second room
	this.currentRoom = levelOne.roomsArray[2][2]; //player for now starts at second room in cross example

	this.keyHeld_North = false;
	this.keyHeld_South = false;
	this.keyHeld_West = false;
	this.keyHeld_East = false;

	this.holdNorth = false;
	this.holdSouth = false;	
	this.holdWest = false;
	this.holdEast = false;

	this.move = function() {
		var nextX = this.x;
		var nextY = this.y;

		if (this.keyHeld_North && (!this.holdNorth)){
			nextY -= PLAYER_MOVESPEED;
		}
		if (this.keyHeld_West && (!this.holdWest)){
			nextX -= PLAYER_MOVESPEED;
		}
		if (this.keyHeld_South && (!this.holdSouth)){
			nextY += PLAYER_MOVESPEED;
		}
		if (this.keyHeld_East && (!this.holdEast)){
			nextX += PLAYER_MOVESPEED;
		}

		//still to consider colision(assuming all walking locations are valid)
		//simple border collision
		//testing for upper border
		if (this.y - 5 <= BORDER_WIDTH){
			this.holdNorth = true;
		} else {
			this.holdNorth = false;
		}
		//tesing for east border
		if (this.x + 5 >= canvas.width - BORDER_WIDTH){
			this.holdEast = true;
		} else {
			this.holdEast = false;
		}
		//testing for west border
		if (this.x - 5 <= BORDER_WIDTH){
			this.holdWest = true;
		} else {
			this.holdWest = false;
		}
		//testing for south border
		if (this.y + 5 >= canvas.height - BORDER_WIDTH){
			this.holdSouth = true;
		} else {
			this.holdSouth = false;
		}
		this.x = nextX;
		this.y = nextY;
	
	}

	this.switchRooms = function(doorEntered){
		//console.log("oi" + doorEntered);
		//west = 0, east = 1, north = 2, south = 3
		if(doorEntered == 0
			&& this.currentLevel.intArray[this.currentRoomCoordX][this.currentRoomCoordY-1] != 0){
			
			console.log("entered West door");			
			//if there is a room to the left, change the player current room
			this.currentRoomCoordY--;
			this.currentRoom = this.currentLevel.roomsArray[this.currentRoomCoordX][this.currentRoomCoordY];
			console.log("entered room to the left");

			//now, set player position to next room's door
			this.x = canvas.width - DISTANCE_AFTER_DOOR;
			
		} else if (doorEntered == 1
			&& this.currentLevel.intArray[this.currentRoomCoordX][this.currentRoomCoordY+1] != 0){
			
			console.log("entered East door");
			//if there is a room to the right, change the player current room
			this.currentRoomCoordY++;
			this.currentRoom = this.currentLevel.roomsArray[this.currentRoomCoordX][this.currentRoomCoordY];
			console.log("entered room to the right");

			//now, set player position to next room's door
			this.x = DISTANCE_AFTER_DOOR;

		} else if (doorEntered == 2
			&& this.currentLevel.intArray[this.currentRoomCoordX-1][this.currentRoomCoordY] != 0){

			console.log("entered North door");
			//if there is a room to the north, change the player current room
			this.currentRoomCoordX--;
			this.currentRoom = this.currentLevel.roomsArray[this.currentRoomCoordX][this.currentRoomCoordY];
			console.log("entered room to the north");

			//now, set player position to next room's door
			this.y = canvas.height - DISTANCE_AFTER_DOOR;

		} else if (doorEntered == 3
			&& this.currentLevel.intArray[this.currentRoomCoordX+1][this.currentRoomCoordY] != 0){
			
			console.log("entered South door");
			//if there is a room to the south, change the player current room
			this.currentRoomCoordX++;
			this.currentRoom = this.currentLevel.roomsArray[this.currentRoomCoordX][this.currentRoomCoordY];
			console.log("entered room to the south");

			//now, set player position to next room's door
			this.y = DISTANCE_AFTER_DOOR;
		}
	}
}


//later organize input.js
document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyReleased);

//keySet flags the pressing and releasing of the key
function keySet(keyEvent, setTo){
	if (keyEvent.keyCode == 37) {															
		playerOne.keyHeld_West = setTo;
	}//left arrow
	if (keyEvent.keyCode == 38) {
		playerOne.keyHeld_North = setTo;
	}//left arrow
	if (keyEvent.keyCode == 39) {
		playerOne.keyHeld_East = setTo;
	}//left arrow
	if (keyEvent.keyCode == 40) {
		playerOne.keyHeld_South = setTo;
	}//left arrow
}

function keyPressed(evt){
	console.log("apertou");
	keySet(evt, true);

	evt.preventDefault();
}

function keyReleased(evt){
	keySet(evt, false);
}





