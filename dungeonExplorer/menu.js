function setupMenu() {
	menuCanvas = document.getElementById('menu');
	menuCtx = menuCanvas.getContext('2d');

	drawMenu();
}

function drawMenu(){
	colorRectMenu(0, 0, menuCanvas.width, menuCanvas.height, 'black');
}