const PLAYER_MOVESPEED = 10;

function player(){
	this.x = 400;
	this.y = 300;	

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





