function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng){
    ctx.save();
    ctx.translate(atX, atY);
    ctx.rotate(withAng);
    ctx.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
    ctx.restore();
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