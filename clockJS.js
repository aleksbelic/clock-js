var CANVAS_WIDTH = 300;
var CANVAS_HEIGHT = 300;
var CYRCLE_CENTER_X = 150;
var CYRCLE_CENTER_Y = 150;
var CYRCLE_RADIUS = 100;
var hourHandLengthProcent = 100;
var hourHandLength = CYRCLE_RADIUS * hourHandLengthProcent / 100;
var hourHandX;
var hourHandXLength;
var hourHandY;
var hourHandYLength;

var hour = new Date().getHours();
//console.log("hour: " + hour);
var min = new Date().getMinutes();
//console.log("min: " + min);

function getHourHandYLength(hourHandXLength) {
	return Math.sqrt(hourHandLength * hourHandLength - hourHandXLength * hourHandXLength);
}

document.addEventListener("DOMContentLoaded", function() {
	var canvas = document.getElementById('clockJS-canvas');
	canvas.setAttribute("width", CANVAS_WIDTH);
	canvas.setAttribute("height", CANVAS_HEIGHT);
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
		redraw(ctx);
		setInterval(function(){
			redraw(ctx);
		}, 1000);
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

function drawCircle(context) {
	context.beginPath();
	context.strokeStyle = '#000000';
	// arc(x, y, radius, startAngle, endAngle, anticlockwise)
	context.arc(CYRCLE_CENTER_X, CYRCLE_CENTER_Y, CYRCLE_RADIUS, 0, 2 * Math.PI);
	context.stroke();
}

function redraw(context) {
	var sec = new Date().getSeconds();
	proc = sec * 100 / 60;
	//console.log("proc: " + proc);
	angle = proc * 360 / 100;
	//console.log("angle: " + angle);
	hourHandXLength = hourHandLength * Math.sin(Math.PI * angle / 180);
	//console.log(hourHandLength * Math.sin(Math.PI * angle / 180));
	hourHandYLength = hourHandLength * Math.cos(Math.PI * angle / 180);
	//console.log(hourHandLength * Math.cos(Math.PI * angle / 180));
	testHand = new Hand(
		CYRCLE_CENTER_X, 
		CYRCLE_CENTER_Y, 
		CYRCLE_CENTER_X + hourHandXLength, 
		CYRCLE_CENTER_Y - hourHandYLength
	);
	context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	drawCircle(context);
	testHand.draw(context);
}