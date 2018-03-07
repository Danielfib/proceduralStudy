//the level is the set of rooms, that is, the room matrice
function level(numberOfRooms){
	this.numberOfRooms = numberOfRooms;
	this.roomsArray;
	this.intArray;
	this.rows = 5;
	this.cols = 5;

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