var shotsArray = []; //will receive all the shots, for drawing and collision check
var contShots = 0; //starts ate 0 but will count up, after, think how to remove shot from array when get offscreen
//maybe moveShots can check this, and if it gets offscreen, splices the array
//shots will be drawn and moved with a for on setInterval, with the shotsArray, anyway


function shot(x, y, direction, speed, damage, size){
	this.x = x;
	this.y = y;
	this.direction = direction; //west == 1; east == 2; north == 3; south == 4
	this.speed = speed;
	this.damage = damage;
	this.size = size;

	this.moveShots = function(){
		if(this.x > canvas.width || this.x < 0 
		|| this.y > canvas.height || this.y < 0) { //if it gets offscreen
			//remove shot from array
		} else { //if is on the canvas area
			if(direction == 1){
				this.x -= this.speed;
			} else if (direction == 2){
				this.x += this.speed;
			} else if (direction == 3){
				this.y -= this.speed;
			} else {
				this.y += this.speed;
			}
		}
		
	}
}