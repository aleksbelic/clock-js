var CYRCLE_CENTER_X = 75;
var CYRCLE_CENTER_Y = 75;
var CYRCLE_RADIUS = 50;
var hourHandLengthProcent = 80;
var hourHandLength = CYRCLE_RADIUS * hourHandLengthProcent / 100;
var hourHandX;
var hourHandXLength;
var hourHandY;
var hourHandYLength;

var d = new Date();
//console.log(d.getHours());
//console.log(d.getMinutes());

function getHourHandYLength(hourHandXLength) {
	return Math.sqrt(hourHandLength * hourHandLength - hourHandXLength * hourHandXLength);
}

document.addEventListener("DOMContentLoaded", function() {
	var canvas = document.getElementById('clockJS-canvas');
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
		ctx.beginPath();
		ctx.strokeStyle = '#000000';
		// arc(x, y, radius, startAngle, endAngle, anticlockwise)
		ctx.arc(CYRCLE_CENTER_X, CYRCLE_CENTER_Y, CYRCLE_RADIUS, 0, 2 * Math.PI);
		ctx.stroke();
		
		// hour hand
		ctx.beginPath();
		ctx.strokeStyle = 'red';
		ctx.lineWidth= '2';
		ctx.moveTo(CYRCLE_CENTER_X, CYRCLE_CENTER_Y);
		hourHandX = CYRCLE_CENTER_X + hourHandLength - 20;
		hourHandXLength = CYRCLE_CENTER_X - hourHandX;
		hourHandYLength = getHourHandYLength(hourHandXLength);
		hourHandY = CYRCLE_CENTER_Y - hourHandYLength;

		ctx.lineTo(hourHandX, hourHandY);
		ctx.stroke();
		
		console.log("hourHandLength: " + hourHandLength);
		console.log("hourHandX: " + hourHandX);
		console.log("hourHandY: " + hourHandY);
		
		// minute hand
		ctx.beginPath();
		ctx.strokeStyle = 'blue';
		ctx.lineWidth= '1';
		ctx.moveTo(CYRCLE_CENTER_X, CYRCLE_CENTER_Y);
		ctx.lineTo(CYRCLE_CENTER_X, CYRCLE_CENTER_Y + CYRCLE_RADIUS);
		ctx.stroke();
		
		testHand = new Hand(0, 0, 150, 150);
		testHand.draw(ctx);
	}
});

class Hand {
	constructor(startPosX, startPosY, endPosX, endPosY) {
		this.startPosX = startPosX;
		this.startPosY = startPosY;
		this.endPosX = endPosX;
		this.endPosY = endPosY;
	}
	
	draw(context){
		context.beginPath();
		context.strokeStyle = 'green';
		context.lineWidth= '1';
		context.moveTo(this.startPosX, this.startPosY);
		context.lineTo(this.endPosX, this.endPosY);
		context.stroke();
	}
}