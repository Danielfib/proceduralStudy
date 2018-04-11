//the measure of the side of the square the enemy is
//(for now, all enemies are squares and have the same size)
const ENEMY_SQUARE = 20;
const ENEMY_HITBOX = 5;
const ENEMY_SPEED = 2;

var lvlOneEnemies = [];

function enemy(x, y, life, enemyNum, thisRoom){
	this.x = x;
	this.y = y;
	this.life = life;
	this.enemyNum = enemyNum;
	this.thisRoom = thisRoom;

	this.checkIfShot = function(){
		//for each shot
		for(var i = 0; i < contShots; i++){
			//collision checking
			if(shotsArray[i].x > this.x - ENEMY_HITBOX && shotsArray[i].x < (this.x+ENEMY_SQUARE) + ENEMY_HITBOX
			&& shotsArray[i].y > this.y - ENEMY_HITBOX && shotsArray[i].y < (this.y+ENEMY_SQUARE) + ENEMY_HITBOX){
				console.log("acertou mizeravi");
				thisRoom.enemyArray.splice(this.enemyNum, 1);
				thisRoom.enemyQnt--;
				thisRoom.resetEnemyNumber();
			}
		}
	}

	this.chase = function(player){
		//chase movement based on 4 quadrants
		if(player.x - ENEMY_SQUARE/2 <= this.x){
			this.x -= ENEMY_SPEED;
		} else {
			this.x += ENEMY_SPEED;
		}
		if(player.y - ENEMY_SQUARE/2 <= this.y){
			this.y -= ENEMY_SPEED;
		} else {
			this.y += ENEMY_SPEED;
		}
	}
}