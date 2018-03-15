function room(hasWestDoor, hasEastDoor, hasNorthDoor, hasSouthDoor, x, y, level) {
	this.xMatrix = x;
	this.yMatrix = y;
	this.level = level; //maybe this is bad, memory recursion, high usage
	this.hasWestDoor = hasWestDoor;
	this.hasEastDoor = hasEastDoor;
	this.hasNorthDoor = hasNorthDoor;
	this.hasSouthDoor = hasSouthDoor;

	this.isPlayerOnWestDoor = false;
	this.isPlayerOnEastDoor = false;
	this.isPlayerOnNorthDoor = false;
	this.isPlayerOnSouthDoor = false;

	this.checkDoorCollision = function(player){
		//function being called succesfully
		//must now implement all door collision detection
		if((player.y < 275 + BORDER_WIDTH && player.y > 275)
			&& player.x > canvas.width - BORDER_WIDTH
			&& this.hasEastDoor){
			//console.log("East Door activated");
			player.switchRooms(1);
		}
		if((player.y < 275 + BORDER_WIDTH && player.y > 275) 
			&& player.x < BORDER_WIDTH
			&& this.hasWestDoor){
			//console.log("West Door activated");
			player.switchRooms(0);
		}

		if((player.x < 375 + BORDER_WIDTH && player.x > 375)
			&& player.y < BORDER_WIDTH
			&& this.hasNorthDoor){
			//console.log("North Door activated");
			player.switchRooms(2);
		}
		if((player.x < 375 + BORDER_WIDTH && player.x > 375)
			&& player.y > canvas.height - BORDER_WIDTH
			&& this.hasSouthDoor){
			//console.log("South Door activated");
			player.switchRooms(3);
		}		
	}

	this.createAdjacentRoom = function(){
		//this variable can decide either to create 2 adjacent rooms, just 1, or none
		var hasAdjacentRoom = Math.random();

		if (hasAdjacentRoom > 0.9){
			//create two rooms
		} else if (hasAdjacentRoom > 0.5){
			//create one room
		}
	}
}