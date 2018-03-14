var minimap, minimapCtx;

function setupMinimap(){
	minimap = document.getElementById('minimap');
	minimapCtx = minimap.getContext('2d');
}

function colorRectMinimap(topLeftX, topLeftY, boxWidth, boxHeight, fillColor){
	minimapCtx.fillStyle = fillColor;
	minimapCtx.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}
