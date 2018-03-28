//the measure of the side of the square the enemy is
//(for now, all enemies are squares and have the same size)
const ENEMY_SQUARE = 50;

var lvlOneEnemies = [];

function enemy(x, y, life){
	this.x = x;
	this.y = y;
	this.life = life;
}

function generateRandomEnemies(howMany, border){
	//for now, creates a certain number of enemies, in random positions on the room
	for (var i = 0; i < howMany; i++) {
		lvlOneEnemies[i] = new enemy(generateCoord('x', border), generateCoord('y', border), 2);
	}
	console.log("eae");
}

function generateCoord(which, border){
	if(which == 'x'){
		var x = Math.floor(Math.random()*canvas.width);
		if(x < border/2){
			x += border/2;
		} else if (x > canvas.width - border/2){
			x = (canvas.width - border/2) - ENEMY_SQUARE;
		}
		return x;
	} else if (which == 'y'){
		var y = Math.floor(Math.random()*canvas.height);
		if(y < border/2){
			y += border/2;
		} else if (y > canvas.height - border/2){
			y = (canvas.height - border/2) - ENEMY_SQUARE;
		}
		return y;
	}
}