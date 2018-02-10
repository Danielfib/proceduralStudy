const GROUNDSPEED_DECAY_MULT = 0.96;
const DRIVE_POWER = 0.94;
const REVERSE_POWER = 0.5;
const TURN_RATE = 0.08;
const MIN_SPEED_TO_TURN = 0.5;

//car class
function carClass(){
    this.x = 75;
    this.speed = 0;
    this.y = 75;
    this.ang = 0;
    this.myCarPic; //which picture to use on the car
    this.name = "Untitled car";

    //getting it to move separatedly from other cars:
    this.keyHeld_Gas = false;
    this.keyHeld_Reverse = false;
    this.keyHeld_TurnLeft = false;
    this.keyHeld_TurnRight = false;

    this.controlKeyUp;
    this.controlKeyDown;
    this.controlKeyRight;
    this.controlKeyLeft;

    this.setupInput = function(upKey, rightKey, downKey, leftKey){
        this.controlKeyUp = upKey;
        this.controlKeyDown = downKey;
        this.controlKeyRight = rightKey;
        this.controlKeyLeft = leftKey;
    }


    //notation to function inside a class
    this.reset = function(whichImage, carName){
        this.name = carName;
        this.myCarPic = whichImage;
        this.speed = 0;

        for(var eachRow = 0; eachRow < TRACK_ROWS; eachRow++){
            for(var eachCol = 0; eachCol < TRACK_COLS; eachCol++){
                
                //tratando como sendo um array unidimensional
                //o index vai dizer qual é o quadrado
                var arrayIndex =rowColToArrayIndex(eachCol, eachRow);
                
                if (trackGrid[arrayIndex] == TRACK_PLAYERSTART){
                    trackGrid[arrayIndex] = TRACK_ROAD;
                    this.ang = -Math.PI/2;
                    this.x = eachCol * TRACK_W + TRACK_W/2;
                    this.y = eachRow * TRACK_H + TRACK_H/2;
                    return;
                }
            }
        }
        console.log("DID NOT FIND PLAYER START(GRIDCODE:"+TRACK_PLAYERSTART+")");
    }


    this.move = function(){
        this.speed *= GROUNDSPEED_DECAY_MULT;

        if(this.keyHeld_Gas){
            this.speed += DRIVE_POWER;
        }
        if(this.keyHeld_Reverse){
            this.speed -= REVERSE_POWER;
        }
        if (Math.abs(this.speed) > MIN_SPEED_TO_TURN){
            if(this.keyHeld_TurnLeft){
                this.ang -= TURN_RATE;
            }
            if(this.keyHeld_TurnRight){
                this.ang += TURN_RATE;
            }
        }


        this.x += Math.cos(this.ang) * this.speed;
        this.y += Math.sin(this.ang) * this.speed;

        carTrackHandling(this);
    }

    this.draw = function() {
        drawBitmapCenteredWithRotation(this.myCarPic, this.x, this.y, this.ang);
    }
}