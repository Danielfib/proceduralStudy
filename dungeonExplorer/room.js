function room(hasWestDoor, hasEastDoor, hasNorthDoor, hasSouthDoor) {
	this.hasWestDoor = hasWestDoor;
	this.hasEastDoor = hasEastDoor;
	this.hasNorthDoor = hasNorthDoor;
	this.hasSouthDoor = hasSouthDoor;

	this.checkDoorCollision = function(player){
		//function being called succesfully
		//must now implement all door collision detection
		if(player.x < 200 && player.y < 200){
			console.log("alo");
		}
		
	}
}