const PLAYER_MOVESPEED = 7;

function player(){
	this.x = 400;
	this.y = 300;	

	this.keyHeld_North = false;
	this.keyHeld_South = false;
	this.keyHeld_West = false;
	this.keyHeld_East = false;

	this.move = function() {
		var nextX = this.x;
		var nextY = this.y;

		if (this.keyHeld_North){
			nextY -= PLAYER_MOVESPEED;
		}
		if (this.keyHeld_West){
			nextX -= PLAYER_MOVESPEED;
		}
		if (this.keyHeld_South){
			nextY += PLAYER_MOVESPEED;
		}
		if (this.keyHeld_East){
			nextX += PLAYER_MOVESPEED;
		}

		//still to consider colision(assuming all walking locations are valid)
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





