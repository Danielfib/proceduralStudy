document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyReleased);
//walking on WASD
const KEY_BINDING_WALK_UP = 87;
const KEY_BINDING_WALK_DOWN = 83;
const KEY_BINDING_WALK_RIGHT = 68;
const KEY_BINDING_WALK_LEFT = 65;


//shooting on arrows
const KEY_BINDING_SHOOT_UP = 38;
const KEY_BINDING_SHOOT_DOWN = 40;
const KEY_BINDING_SHOOT_RIGHT = 39;
const KEY_BINDING_SHOOT_LEFT = 37;


//keySet flags the pressing and releasing of the key
function keySet(keyEvent, setTo){
	//MOVE
	if (keyEvent.keyCode == KEY_BINDING_WALK_LEFT) {															
		playerOne.keyHeld_West = setTo;
	}
	if (keyEvent.keyCode == KEY_BINDING_WALK_UP) {
		playerOne.keyHeld_North = setTo;
	}
	if (keyEvent.keyCode == KEY_BINDING_WALK_RIGHT) {
		playerOne.keyHeld_East = setTo;
	}
	if (keyEvent.keyCode == KEY_BINDING_WALK_DOWN) {
		playerOne.keyHeld_South = setTo;
	}
}

function shootSet(keyEvent, setTo){
	//SHOOT
	//these for atribuitions fixes the "not shooting when 2 keys pressed" bug
	//but this method (using shootSet and shootRelease) leads up to this:
	//when key A is pressed, and with holding A, B is pressed, when B is released, it doesnt shoot A
	if (keyEvent.keyCode == KEY_BINDING_SHOOT_LEFT){
		playerOne.keyHeld_ShootWest = setTo;
		playerOne.keyHeld_ShootEast = !setTo;
		playerOne.keyHeld_ShootNorth = !setTo;
		playerOne.keyHeld_ShootSouth = !setTo;
	}
	if (keyEvent.keyCode == KEY_BINDING_SHOOT_RIGHT){
		playerOne.keyHeld_ShootWest = !setTo;
		playerOne.keyHeld_ShootEast = setTo;
		playerOne.keyHeld_ShootNorth = !setTo;
		playerOne.keyHeld_ShootSouth = !setTo;	
	}
	if (keyEvent.keyCode == KEY_BINDING_SHOOT_UP){
		playerOne.keyHeld_ShootWest = !setTo;
		playerOne.keyHeld_ShootEast = !setTo;
		playerOne.keyHeld_ShootNorth = setTo;
		playerOne.keyHeld_ShootSouth = !setTo;
	}
	if (keyEvent.keyCode == KEY_BINDING_SHOOT_DOWN){
		playerOne.keyHeld_ShootWest = !setTo;
		playerOne.keyHeld_ShootEast = !setTo;
		playerOne.keyHeld_ShootNorth = !setTo;
		playerOne.keyHeld_ShootSouth = setTo;
	}
}

function shootRelease(keyEvent, setTo){
	if (keyEvent.keyCode == KEY_BINDING_SHOOT_LEFT){
		playerOne.keyHeld_ShootWest = setTo;
	}
	if (keyEvent.keyCode == KEY_BINDING_SHOOT_RIGHT){
		playerOne.keyHeld_ShootEast = setTo;	
	}
	if (keyEvent.keyCode == KEY_BINDING_SHOOT_UP){
		playerOne.keyHeld_ShootNorth = setTo;
	}
	if (keyEvent.keyCode == KEY_BINDING_SHOOT_DOWN){
		playerOne.keyHeld_ShootSouth = setTo;
	}
}

function keyPressed(evt){
	//console.log("apertou");
	keySet(evt, true);
	shootSet(evt, true);
	evt.preventDefault();
}

function keyReleased(evt){
	keySet(evt, false);
	shootRelease(evt, false);
}