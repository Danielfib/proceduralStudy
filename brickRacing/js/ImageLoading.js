var carPic = document.createElement("img");
var car2Pic = document.createElement("img");

/*used for loading all track images
/this whole change in image loading was to be able
/to if adding a new image, just add the new constant and a ew line in loadImages()
/and be able to after that, use the number in the trackGrid straight away
*/
var trackImgsArr = [];

//set automaically based on imageList on loadImages()
var picsToLoad = 0;

//guarantees that all images are loads
//before starting the game
function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
    if (picsToLoad == 0){
    	ImageLoadingDoneSoStartGame();
    }
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady();
	imgVar.src = "images/"+fileName; //since all files are inside images folder
}

function loadImageForTrackCode(trackCode, fileName) {
	trackImgsArr[trackCode] = document.createElement("img");
	beginLoadingImage(trackImgsArr[trackCode], fileName);
}

function loadImages() {
	//imageList as array of objects, which atributes can be referred to
	//as following: imageList[i].varName (that would return carPic, for example)
	var imageList = [
		{varName: carPic, theFile: "player1car.png"},
		{varName: car2Pic, theFile: "player2car.png"},
		
		{trackType: TRACK_ROAD, theFile: "track_road.png"},
		{trackType: TRACK_WALL, theFile: "track_wall.png"},
		{trackType: TRACK_GOAL, theFile: "track_goal.png"},
		{trackType: TRACK_TREE, theFile: "track_tree.png"},
		{trackType: TRACK_FLAG, theFile: "track_flag.png"},
	];

	picsToLoad = imageList.length;

	for (var i = 0; i < imageList.length; i++){
		if(imageList[i].varName != undefined){
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);		
		} else {
			loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
		}
	}
}

