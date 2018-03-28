//the measure of the side of the square the enemy is
//(for now, all enemies are squares and have the same size)
const ENEMY_SQUARE = 10;

var lvlOneEnemies = [];

function enemy(x, y, life){
	this.x = x;
	this.y = y;
	this.life = life;
}

function generateRandomEnemies(howMany){
	//for now, creates a certain number of enemies, in random positions on the room
	for (var i = 0; i < howMany; i++) {
		lvlOneEnemies[i] = new enemy(Math.floor(Math.random()*canvas.height), Math.floor(Math.random()*canvas.width), 2);
	}
	console.log("eae");
}

generateRandomEnemies(5);