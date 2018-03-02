//graphic functions
function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor){
	ctx.fillStyle = fillColor;
	ctx.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor){
	ctx.fillStyle = fillColor;
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	ctx.fill();
}

function drawBorder(canvasHeight, canvasWidth, borderWidth, borderColor){
	colorRect(0, 0, canvasWidth, borderWidth/2, borderColor); //upper wall
	colorRect(0, 0, borderWidth/2, canvasHeight, borderColor); //western wall
	colorRect(canvasWidth - borderWidth/2, 0, borderWidth/2, canvasHeight, borderColor); //eastern wall
	colorRect(0, canvasHeight - borderWidth/2, canvasWidth, borderWidth/2, borderColor); //southern wall
}