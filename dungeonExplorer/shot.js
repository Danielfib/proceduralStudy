var shotsArray = []; //will receive all the shots, for drawing and collision check
var contShots = 0; //starts ate 0 but will count up, after, think how to remove shot from array when get offscreen
//moveShots checks this, and if it gets offscreen, splices the array

function shot(x, y, direction, speed, damage, size, index){
	this.x = x;
	this.y = y;
	this.direction = direction; //west == 1; east == 2; north == 3; south == 4
	this.speed = speed;
	this.damage = damage;
	this.size = size;

	this.arrayIndex = index;

	this.moveShots = function(){
		if(direction == 1){
			this.x -= this.speed;
		} else if (direction == 2){
			this.x += this.speed;
		} else if (direction == 3){
			this.y -= this.speed;
		} else {
			this.y += this.speed;
		}
		this.removeIfInBorder();	
	}
		
	
	this.removeIfInBorder = function(){
		if(this.y < BORDER_WIDTH/2 || this.y > canvas.height - BORDER_WIDTH/2
		|| this.x < BORDER_WIDTH/2 || this.x > canvas.width - BORDER_WIDTH/2){
			this.manageShotRemoval();			
		}
	}
			
	 this.manageShotRemoval = function(){
	 	//removing shot:
	 	shotsArray.splice(this.arrayIndex, 1);
	 	contShots--;		
	 	//upadating all shots arrayIndexes:
	 	for (var i = 0; i < contShots; i++){
	 		shotsArray[i].arrayIndex = i;
	 	}		
	 }
}