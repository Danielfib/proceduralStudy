var canvas, ctx;

var ballX = 75;
var ballSpeedX = 5;
var ballSpeedY = 7;
var ballY = 75;

const BRICK_W = 80;
const BRICK_H = 40;
const BRICK_COLS = 10;
const BRICK_ROWS = 7;
const BRICK_GAP = 2;
var brickGrid = new Array(BRICK_COLS * BRICK_ROWS);

const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_DIST_FROM_EDGE = 40;
var paddleX = 400;

var mouseX = 0;
var mouseY = 0;

function updateMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    
    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;

    paddleX = mouseX - PADDLE_WIDTH/2;
}

function brickReset(){
    for(var i = 0; i<BRICK_COLS * BRICK_ROWS; i++){
        brickGrid[i] = true;
    }
}

window.onload = function (){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    var fps = 30;
    setInterval(updateAll, 1000/fps);

    canvas.addEventListener('mousemove', updateMousePos);
    brickReset();
}

function updateAll(){
    moveAll();
    drawAll();
}

function ballReset(){
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

function ballMove(){
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(ballY > canvas.height){ //bottom
        ballReset();
        ballSpeedY *= -1;
    }
    if(ballY < 0){ //top
        ballSpeedY *= -1;
    }

    if(ballX > canvas.width){ //right
        ballSpeedX *= -1;
    }
    if(ballX < 0){ //left
        ballSpeedX *= -1;
    }

}

function ballBrickHandling(){
    var ballBrickCol = Math.floor(ballX / BRICK_W);
    var ballBrickRow = Math.floor(ballY / BRICK_H);
    var brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow);
    
    if (ballBrickCol >= 0 && ballBrickCol < BRICK_COLS &&
        ballBrickRow >= 0 && ballBrickRow < BRICK_ROWS){
            //colision
            if(brickGrid[brickIndexUnderBall]){
                brickGrid[brickIndexUnderBall] = false;

                //previous x and y positions of the ball
                var prevBallX = ballX - ballSpeedX;
                var prevBallY = ballY - ballSpeedY;
                //previous column and row of the ball
                var prevBrickCol = Math.floor(prevBallX/BRICK_W);
                var prevBrickRow = Math.floor(prevBallY/BRICK_H);

                var bothTestsFailed = true;

                //ball hit brick by the side
                if(prevBrickCol != ballBrickCol){
                    var adjBrickSide = rowColToArrayIndex(prevBrickCol, ballBrickRow);

                    //if corner is "covered"
                    if(!brickGrid[adjBrickSide]){
                        ballSpeedX *= -1;
                    }
                    bothTestsFailed = false;
                }
                //ball hit brick by up or down
                if (prevBrickRow != ballBrickRow){
                    var adjBrickTopBot = rowColToArrayIndex(ballBrickCol, prevBrickRow);

                    if(!brickGrid[adjBrickTopBot]){
                        ballSpeedY *= -1;
                    }
                    bothTestsFailed = false;
                }
                
                //preventes the armpit case
                if(bothTestsFailed){
                    ballSpeedX *= -1;
                    ballSpeedY *= -1;
                }
            }
    }
}

function ballPaddleHandling(){
    //four edges of the paddle
    var paddleTopEdgeY = canvas.height - PADDLE_DIST_FROM_EDGE;
    var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
    var paddleLeftEdgeX = paddleX;
    var paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;
    //if the ball overlaps with the paddle
    if (ballY > paddleTopEdgeY && 
        ballY < paddleBottomEdgeY &&
        ballX > paddleLeftEdgeX &&
        ballX < paddleRightEdgeX) {
            ballSpeedY *= -1;

            //ball control with the paddle:
            var centerOfPaddleX = paddleX + PADDLE_WIDTH/2;
            var ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
            ballSpeedX = ballDistFromPaddleCenterX * 0.4;
    }
}

function moveAll() {
    ballMove();
    ballBrickHandling();   
    ballPaddleHandling();    
}

function rowColToArrayIndex(col, row){
    return BRICK_COLS * row + col;
}

function drawBricks() {
    for(var eachRow = 0; eachRow < BRICK_ROWS; eachRow++){
        for(var eachCol = 0; eachCol < BRICK_COLS; eachCol++){
            
            //tratando como sendo um array unidimensional
            //o index vai dizer qual é o quadrado
            var arrayIndex =rowColToArrayIndex(eachCol, eachRow);
            
            if (brickGrid[arrayIndex]){
                colorRect(BRICK_W*eachCol,BRICK_H*eachRow, 
                    BRICK_W-BRICK_GAP,BRICK_H - BRICK_GAP, 'blue');
            }
        }
    }
}

function drawAll(){
    //clear screen
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    
    //drae ball
    colorCircle(ballX, ballY, 10, 'red');

    colorRect(paddleX, canvas.height - PADDLE_DIST_FROM_EDGE,
                PADDLE_WIDTH, PADDLE_THICKNESS, 'white');

    drawBricks();
    
   
}

function colorText(showWords, textX, textY, fillColor){
    ctx.fillStyle = fillColor;
    ctx.fillText(showWords, textX, textY);
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor){
    ctx.fillStyle = fillColor;
    ctx.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.arc(centerX,centerY, radius,0, Math.PI*2, true);
    ctx.fill();
}