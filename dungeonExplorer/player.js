const PLAYER_MOVESPEED = 10;
const DISTANCE_AFTER_DOOR = 50;

function player(initialX, initialY){
	this.x = 400;
	this.y = 300;	

	this.currentLevel = levelOne;
	//setting initial position on level.intArray
	this.currentLevel.intArray[initialX][initialY] = 2;
	//current room coordinates for intArray and roomsArray
	this.currentRoomCoordX = initialX;
	this.currentRoomCoordY = initialY;
	//this.currentRoom = levelOne.roomsArray[this.currentRoomCoord]; //player for now starts at second room
	this.currentRoom = levelOne.roomsArray[this.currentRoomCoordX][this.currentRoomCoordY]; //player for now starts at second room in cross example

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
		//west = 0, east = 1, north = 2, south = 3
		if(doorEntered == 0	&& this.checkRoomExistence(0, -1)){			
			console.log("entered West door");			
			//if there is a room to the left, change the player current room
			this.changePlayerCurrentRoom(0, -1);
			//now, set player position next to passed door
			this.x = canvas.width - DISTANCE_AFTER_DOOR;			
		} else if (doorEntered == 1	&& this.checkRoomExistence(0, 1)){			
			console.log("entered East door");
			//if there is a room to the right, change the player current room
			this.changePlayerCurrentRoom(0, 1);
			//now, set player position next to passed door
			this.x = DISTANCE_AFTER_DOOR;
		} else if (doorEntered == 2	&& this.checkRoomExistence(-1, 0)){
			console.log("entered North door");
			//if there is a room to the north, change the player current room
			this.changePlayerCurrentRoom(-1, 0);
			//now, set player position next to passed door
			this.y = canvas.height - DISTANCE_AFTER_DOOR;
		} else if (doorEntered == 3 && this.checkRoomExistence(+1, 0)){			
			console.log("entered South door");
			//if there is a room to the south, change the player current room
			this.changePlayerCurrentRoom(1, 0);
			//now, set player position next to passed door
			this.y = DISTANCE_AFTER_DOOR;
		}
	}

	this.updatePlayerLocationOnLevel = function(deltaX, deltaY){
		this.currentLevel.intArray[this.currentRoomCoordX][this.currentRoomCoordY] = 1;
		this.currentLevel.intArray[this.currentRoomCoordX + deltaX][this.currentRoomCoordY + deltaY] = 2;

	}

	this.changePlayerCurrentRoom = function(deltaX, deltaY){
		//first, update player location on int matrix:
		this.updatePlayerLocationOnLevel(deltaX, deltaY);

		this.currentRoomCoordX += deltaX;
		this.currentRoomCoordY += deltaY;

		this.currentRoom = this.currentLevel.roomsArray[this.currentRoomCoordX][this.currentRoomCoordY];
	}

	this.checkRoomExistence = function(deltaX, deltaY){
		if(this.currentLevel.intArray[this.currentRoomCoordX + deltaX][this.currentRoomCoordY + deltaY] != 0 ){
			return true;
		} else {
			return false;
		}
	}
}