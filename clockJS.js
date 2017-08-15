// canvas
var canvasSize = 300;
var canvasBorder = '1px solid #d3d3d3';

// clock face
var circleRadius = 140;
var circleCenterX = canvasSize / 2;
var circleCenterY = canvasSize / 2;
var circleBorderColor = '#000000';
var circleBorderWidth = 1;
var dotSize = 1; // px
var dotDistancePercent = 90;
var dotColor = '#000000';

// clock hands
var hourHandLengthPercent = 60;
var hourHandLength = circleRadius * hourHandLengthPercent / 100;
var hourHandWidth = 2;
var hourHandColor = 'blue';
var minHandLengthPercent = 80;
var minHandLength = circleRadius * minHandLengthPercent / 100;
var minHandWidth = 2;
var minHandColor = 'red';
var secHandLengthPercent = 80;
var secHandLength = circleRadius * secHandLengthPercent / 100;
var secHandWidth = 2;
var secHandColor = 'green';

var hour = new Date().getHours();
var min = new Date().getMinutes();
var sec = new Date().getSeconds();

document.addEventListener('DOMContentLoaded', function() {
	var canvas = document.getElementById('clockJS-canvas');
	canvas.setAttribute('width', canvasSize);
	canvas.setAttribute('height', canvasSize);
	canvas.style.border = canvasBorder;
	
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
		redraw(ctx);
		setInterval(function(){
			redraw(ctx);
		}, 1000);
	}
});

class Hand {
	constructor(length, width, color) {
		this.length = length;
		this.width = width;
		this.color = color;
	}
	
	draw(context, angle){
		var handXLength = this.length * Math.sin(Math.PI * angle / 180);
		var handYLength = this.length * Math.cos(Math.PI * angle / 180);
		context.beginPath();
		context.strokeStyle = this.color;
		context.lineWidth = this.width;
		context.moveTo(circleCenterX, circleCenterY);
		context.lineTo(circleCenterX + handXLength, circleCenterY - handYLength);
		context.stroke();
	}
}

function drawCircle(context) {
	context.beginPath();
	context.strokeStyle = circleBorderColor;
	context.lineWidth = circleBorderWidth;
	// arc(x, y, radius, startAngle, endAngle, anticlockwise)
	context.arc(circleCenterX, circleCenterY, circleRadius, 0, 2 * Math.PI);
	context.stroke();
}

function drawDots(context) {
	var dotCenterX = 0;
	var dotCenterY = 0;
	context.fillStyle = dotColor;
	for (var angle = 0; angle < 360; angle += 6) {
		context.beginPath();
		dotCenterX = circleCenterX + (circleRadius * dotDistancePercent / 100 * Math.sin(Math.PI * angle / 180));
		dotCenterY = circleCenterY - (circleRadius * dotDistancePercent / 100 * Math.cos(Math.PI * angle / 180));
		// context.fillRect(x, y, width, height);
		context.fillRect(dotCenterX, dotCenterY, (angle % 15 == 0) ? dotSize * 3: dotSize, (angle % 15 == 0) ? dotSize * 3: dotSize);
		context.stroke();
	}
}

function redraw(context) {
	secHand = new Hand(secHandLength, secHandWidth, secHandColor);
	sec = new Date().getSeconds();
	secAngle = sec * 6; // sec * 100 / 60 * 360 / 100;
	
	minHand = new Hand(minHandLength, minHandWidth, minHandColor);
	min = new Date().getMinutes();
	minAngle = (min * 60 + sec) / 10; // ((min * 60 + sec) * 100 / 3600) * 360 / 100;
	
	hourHand = new Hand(hourHandLength, hourHandWidth, hourHandColor);
	hour = new Date().getHours();
	hourAngle = (hour * 60 + min) * 0.25; // ((hour * 60 + min) * 100 / 1440) * 360 / 100;
	
	context.clearRect(0, 0, canvasSize, canvasSize); // clear canvas
	
	drawCircle(context);
	drawDots(context);
	hourHand.draw(context, hourAngle);
	minHand.draw(context, minAngle);
	secHand.draw(context, secAngle);
}