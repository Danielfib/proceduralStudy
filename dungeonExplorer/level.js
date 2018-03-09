//the level is the set of rooms, that is, the room matrice
function level(numberOfRooms, rows, cols, difficulty){
	this.numberOfRooms = numberOfRooms;
	this.roomsArray;
	this.intArray;
	this.rows = rows;
	this.cols = cols;
	this.difficulty = difficulty;

	this.playerInitialX;
	this.playerInitialY;

	this.createLinearExample = function(){
		//for now, only creating passage to left and right
		for (var i = 0; i < numberOfRooms; i++){
			if (i == 0){
				//room at most left
				this.roomsArray[i] = new room(false, true, false, false);
			} else {
				if (i == numberOfRooms-1){
					//room at most right
					this.roomsArray[i] = new room(true, false, false, false);
				} else {
					//room in between extremes
					this.roomsArray[i] = new room(true, true, false, false);
				}
			}
		}
	}

	this.createCrossExample = function(){
		//with 5x5 matrice, statcly created, just to test room switching
		this.roomsArray[2][2] = new room(true, true, true, true);//center room
		this.intArray[2][2] = 1;
		this.roomsArray[2][1] = new room(false, true, false, false);//left room
		this.intArray[2][1] = 2;
		this.roomsArray[2][3] = new room(true, false, false, false);//right room
		this.intArray[2][3] = 3;
		this.roomsArray[1][2] = new room(false, false, false, true);//upper room
		this.intArray[1][2] = 4;
		this.roomsArray[3][2] = new room(false, false, true, false);//bottom room
		this.intArray[3][2] = 5;
	}

	this.generateRandomLevel = function(){
		var numRooms = this.difficulty*3;

		//getting a random number from 0 to # of rows and cols
		var xRCoord = Math.floor(Math.random() * (this.rows-1));
		var yRCoord = Math.floor(Math.random() * (this.cols-1));
		//first room
		this.roomsArray[xRCoord][yRCoord] = new room(false, false, false, false); 
		this.intArray[xRCoord][yRCoord] = 1;
		this.setPlayerInitialPosition(xRCoord, yRCoord);

		for(var c = 0; c < numRooms; c++){
			var newRoomDirection = Math.random();
			console.log(newRoomDirection);
			
			if (newRoomDirection < 0.25 && this.checkRoomExistOnDir(0, xRCoord, yRCoord)){ 
				//create a room to the west
				//if there is no room to the west, nor we're on left edge, create one
				this.intArray[xRCoord][yRCoord-1] = 1;
				this.roomsArray[xRCoord][yRCoord-1] = new room(false, false, false, false);
			} else if (newRoomDirection < 0.5 && this.checkRoomExistOnDir(1, xRCoord, yRCoord)){
				//create room to the east
				//if there is no room to the east, nor we're on right edge, create one
				this.intArray[xRCoord][yRCoord+1] = 1;
				this.roomsArray[xRCoord][yRCoord+1] = new room(false, false, false, false);
			} else if (newRoomDirection < 0.75 && this.checkRoomExistOnDir(2, xRCoord, yRCoord)){
				//create room to the north
				//if there is no room to the north, nor we're on upper edge, create one
				this.intArray[xRCoord-1][yRCoord] = 1;
				this.roomsArray[xRCoord-1][yRCoord] = new room(false, false, false, false);
			} else if (newRoomDirection < 1 && this.checkRoomExistOnDir(1, xRCoord, yRCoord)){ 
				//create room to the south
				//if there is no room to the south, nor we're on bottom edge, create one
				this.intArray[xRCoord+1][yRCoord] = 1;
				this.roomsArray[xRCoord+1][yRCoord] = new room(false, false, false, false);
			}
		}

		this.placeRoomsDoors();
	}

	this.checkRoomExistOnDir = function(dir, currentX , currentY){
		if (dir == 0){ //see if there is a room to the west
			if(currentY == 0){
				return false;
			} else if (this.intArray[currentX][currentY-1] == 0){
				return true;
			} else { 
				return false;
			}
		} else if (dir == 1){ //see if there is a room to the east
			if(currentY == (this.cols-1)){
				return false;
			} else if (this.intArray[currentX][currentY+1] == 0){
				return true;
			} else {
				return false;
			}
		} else if (dir == 2){ //see if there is a room to the north
			if(currentX == 0){
				return false;
			} else if (this.intArray[currentX-1][currentY] == 0){
				return true;
			} else {
				return false;
			}
		} else if (dir == 3){ //see if there is a room to the south
			if(currentX == (this.rows-1)){
				return false;
			} else if (this.intArray[currentX+1][currentY] == 0){
				return true;
			} else {
				return false;
			}
		} 
	}

	this.placeRoomsDoors = function(){
		/*This function is benefiting from matching doors:
		  if room A is neighbour to room B, then it set room A door to room B,
		  but also room B door to room A*

		  So, the loop [i][j] doesnt get to the right and bottom edges, because
		  they were checked by the previous loop*/
		for (var i = 0; i < this.rows-1; i++){
			for (var j = 0; j < this.cols-1; j++){
				if(this.intArray[i][j] != 0){
					//if room exists, check its neighbours and place doors
					if(this.intArray[i+1][j] != 0){//south neighbour
						//sets the pair of mathing doors, to optmize function (/2) (check down-up and left-down)
						this.roomsArray[i][j].hasSouthDoor = true;
						this.roomsArray[i+1][j].hasNorthDoor = true;
					}
					if(this.intArray[i][j+1] != 0){//east neighbour
						this.roomsArray[i][j].hasEastDoor = true;
						this.roomsArray[i][j+1].hasWestDoor = true;
					}
				}
			}
		}
	}

	this.setPlayerInitialPosition = function(x, y){
		this.playerInitialX = x;
		this.playerInitialY = y;
	}

	this.setupInitialMatrices = function(numRows, numCols){
		this.intArray = this.setupIntMatrix(numRows, numCols);
		this.roomsArray = this.setupRoomsMatrice(numRows, numCols);		
	}

	this.setupIntMatrix = function(numRows, numCols){
		var arr = [];
		for (var i = 0; i < numRows; i++){
			var columns = [];
			for(var j = 0; j < numCols; j++){
				columns[j] = 0; //0 is initial value
			}
			arr[i] = columns;
		}
		return arr;
	}

	this.setupRoomsMatrice = function(numRows, numCols){
		var arr2 = [];
		for (var i = 0; i < numRows; i++){
			var columns = [];
			for(var j = 0; j < numCols; j++){
				columns[j] = new room(false, false, false, false); //0 is initial value
			}
			arr2[i] = columns;
		}
		return arr2;
	}

}