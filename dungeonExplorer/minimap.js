const MINIMAP_BORDER = 5;
var minimap, minimapCtx;

function setupMinimap(level){
	minimap = document.getElementById('minimap');
	minimapCtx = minimap.getContext('2d');

	//drwaw minimap
	colorRectMinimap(0, 0, minimap.width, minimap.height, 'black');
	drawMinimapRooms(level);
}

function colorRectMinimap(topLeftX, topLeftY, boxWidth, boxHeight, fillColor){
	minimapCtx.fillStyle = fillColor;
	minimapCtx.fillRect(topLeftX + MINIMAP_BORDER, topLeftY + MINIMAP_BORDER, boxWidth - MINIMAP_BORDER, boxHeight - MINIMAP_BORDER);
}

function drawMinimapRooms(level){
	//for drawing the room arrangement fixed on 2nd canvas:
	//divide secondCanvas.width and height by the rows and cols
	//use te result to tile draw. Lets go!
	var xFactor = minimap.width/level.rows;
	var yFactor = minimap.height/level.cols;
	//so we dont have to reference level everytime on the loop(maybe it will cause the second canvas not to update?)
	levelIntArray = level.intArray; 


	for(var i = 0; i < level.rows; i++){
		for(var j = 0; j < level.cols; j++){
			if(levelIntArray[i][j] == 1){
				colorRectMinimap(j * xFactor, i * yFactor, xFactor, yFactor, 'grey');
				//console.log("grey");
			}
			if(levelIntArray[i][j] == 2){
				colorRectMinimap(j * xFactor, i * yFactor, xFactor, yFactor, 'white');	
				//console.log("white");
			}
		}
	}

}