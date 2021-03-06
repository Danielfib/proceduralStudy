const ADJ_ROOM_CHANCE_DECREASE = 3;
function room(hasWestDoor, hasEastDoor, hasNorthDoor, hasSouthDoor, x, y, level) {
	this.x = x;
	this.y = y;
	this.levelNumber = level; //using index to lvlArray
	this.hasWestDoor = hasWestDoor;
	this.hasEastDoor = hasEastDoor;
	this.hasNorthDoor = hasNorthDoor;
	this.hasSouthDoor = hasSouthDoor;

	this.isPlayerOnWestDoor = false;
	this.isPlayerOnEastDoor = false;
	this.isPlayerOnNorthDoor = false;
	this.isPlayerOnSouthDoor = false;

	this.adjRoomChance = 0.65; //it mean that random() has to get > 0.65 to happen

	//setting how many enemies in room based on level difficulty:
	this.enemyQnt = lvlArray[this.levelNumber].difficulty * 2;
	this.enemyArray = [];

	this.checkDoorCollision = function(player){
		//function being called succesfully
		//must now implement all door collision detection
		if((player.y < 275 + BORDER_WIDTH && player.y > 275)
		&& player.x > canvas.width - BORDER_WIDTH
		&& this.hasEastDoor
		//if there's no more enemies
		&& player.currentRoom.enemyQnt == 0){
			//console.log("East Door activated");
			player.switchRooms(1);
		}
		if((player.y < 275 + BORDER_WIDTH && player.y > 275) 
		&& player.x < BORDER_WIDTH
		&& this.hasWestDoor
		&& player.currentRoom.enemyQnt == 0){
			//console.log("West Door activated");
			player.switchRooms(0);
		}

		if((player.x < 375 + BORDER_WIDTH && player.x > 375)
		&& player.y < BORDER_WIDTH
		&& this.hasNorthDoor
		&& player.currentRoom.enemyQnt == 0){
			//console.log("North Door activated");
			player.switchRooms(2);
		}
		if((player.x < 375 + BORDER_WIDTH && player.x > 375)
		&& player.y > canvas.height - BORDER_WIDTH
		&& this.hasSouthDoor
		&& player.currentRoom.enemyQnt == 0){
			//console.log("South Door activated");
			player.switchRooms(3);
		}		
	}

	this.createAdjacentRoom = function(){ //method extraction?
		var createdRoom = false;
		//to be called on room creation
		//will check all for direction and maybe create a room on each one, IF there's none on each direction
		
		//bug: i was calling on every room creation, but i can only call after base matrix is done
		//this way, this method only get into action by the cross created rooms, and not the base null matrix rooms
		if(this.x > 0 && this.x < 4 && this.y > 0 && this.y < 4 && lvlArray[this.levelNumber].isBaseMatrixDone){
			if(lvlArray[this.levelNumber].intArray[this.x][this.y-1] == 0 && Math.random() > this.adjRoomChance){//has no room to the west
				lvlArray[this.levelNumber].placeNewRoom(this.x, this.y-1);
				this.adjRoomChance += ADJ_ROOM_CHANCE_DECREASE;
				createdRoom = true;
			}
			if(lvlArray[this.levelNumber].intArray[this.x][this.y+1] == 0 && Math.random() > this.adjRoomChance){//has no room to the east
				lvlArray[this.levelNumber].placeNewRoom(this.x, this.y+1);
				this.adjRoomChance += ADJ_ROOM_CHANCE_DECREASE;
				createdRoom = true;
			}
			if(lvlArray[this.levelNumber].intArray[this.x-1][this.y] == 0 && Math.random() > this.adjRoomChance){//has no room to the north
				lvlArray[this.levelNumber].placeNewRoom(this.x-1, this.y);
				this.adjRoomChance += ADJ_ROOM_CHANCE_DECREASE;
				createdRoom = true;
			}
			if(lvlArray[this.levelNumber].intArray[this.x+1][this.y] == 0 && Math.random() > this.adjRoomChance){//has no room to the south
				lvlArray[this.levelNumber].placeNewRoom(this.x+1, this.y);
				this.adjRoomChance += ADJ_ROOM_CHANCE_DECREASE;
				createdRoom = true;
			}

			if(createdRoom) {
				//then, update the level edge counters
				//^to fix bug on infinite loop
				lvlArray[this.levelNumber].updateLevelEdgeCounters();
			}
		}
	}


	
	if(lvlArray[this.levelNumber].roomCount < lvlArray[this.levelNumber].maxRooms && ENABLE_ADJ_ROOMS){
		this.createAdjacentRoom();
	}
	
	this.generateRandomEnemies = function(border) {
		var howMany = this.enemyQnt;
		for (var i = 0; i < howMany; i++) {
			this.enemyArray[i] = new enemy(this.generateCoord('x', border), this.generateCoord('y', border), 1, i, this);
		}
		//console.log("eae");
	}

	this.generateCoord = function(which, border){
		if(which == 'x'){
			var x = Math.floor(Math.random()*canvas.width);
			if(x < border/2){
				x += border/2;
			} else if (x+ENEMY_SQUARE > canvas.width - border/2){
				x = (canvas.width - border/2) - ENEMY_SQUARE;
			}
			return x;
		} else if (which == 'y'){
			var y = Math.floor(Math.random()*canvas.height);
			if(y < border/2){
				y += border/2;
			} else if (y+ENEMY_SQUARE > canvas.height - border/2){
				y = (canvas.height - border/2) - ENEMY_SQUARE;
			}
			return y;
		}
	}

	this.resetEnemyNumber = function(){
		for(var i = 0; i < this.enemyQnt; i++){
			this.enemyArray[i].enemyNum = i;
		}
	}

	//create random enemies:
	this.generateRandomEnemies(BORDER_WIDTH);
}