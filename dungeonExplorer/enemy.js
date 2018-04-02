//the measure of the side of the square the enemy is
//(for now, all enemies are squares and have the same size)
const ENEMY_SQUARE = 20;
const ENEMY_HITBOX = 5;

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
				//this index here:
				thisRoom.enemyArray.splice(this.enemyNum, 1);
				thisRoom.enemyQnt--;
				thisRoom.resetEnemyNumber();
			}
		}
	}
}

