var canvas, ctx;

var blueCar = new carClass();
var greenCar = new carClass();

window.onload = function (){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    //loading screen
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    colorText("Loading Images", canvas.width/2, canvas.height/2, 'white');

    loadImages();
};

function ImageLoadingDoneSoStartGame(){
    var fps = 30;
    setInterval(updateAll, 1000/fps);

    setupInput();

    loadLevel(levelOne);
};

function loadLevel(whichLevel){
    //copies one array into other, because only
    //arrayA = arrayB would not work, because arrayA will
    //point to the same memory space, and not be a copy of it.
    trackGrid = whichLevel.slice();
    blueCar.reset(carPic, "Green Machine");
    greenCar.reset(car2Pic, "Blue Storm");
}

function updateAll(){
    moveAll();
    drawAll();
}

function moveAll() {
    blueCar.move();
    greenCar.move();
    //car track handling went to car.move()     
}

function drawAll(){  
    drawTracks();
    blueCar.draw(blueCar);
    greenCar.draw(greenCar);
}