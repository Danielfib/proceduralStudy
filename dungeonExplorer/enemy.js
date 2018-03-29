//the measure of the side of the square the enemy is
//(for now, all enemies are squares and have the same size)
const ENEMY_SQUARE = 20;

var lvlOneEnemies = [];

function enemy(x, y, life){
	this.x = x;
	this.y = y;
	this.life = life;
}

