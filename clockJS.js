// canvas
let canvasSize = 300;
let canvasBorder = '1px solid #d3d3d3';

// clock face
let circleRadius = 140;
let circleCenterX = canvasSize / 2;
let circleCenterY = canvasSize / 2;
let circleBorderColor = 'black';
let circleBorderWidth = 1;
let dotSize = 1; // px
let dotDistancePercent = 90;
let dotColor = 'black';

// clock hands
let hourHandLengthPercent = 60;
let hourHandLength = circleRadius * hourHandLengthPercent / 100;
let hourHandWidth = 2;
let hourHandColor = 'blue';
let minHandLengthPercent = 80;
let minHandLength = circleRadius * minHandLengthPercent / 100;
let minHandWidth = 2;
let minHandColor = 'red';
let secHandLengthPercent = 80;
let secHandLength = circleRadius * secHandLengthPercent / 100;
let secHandWidth = 2;
let secHandColor = 'green';

let hour = new Date().getHours();
let min = new Date().getMinutes();
let sec = new Date().getSeconds();

document.addEventListener('DOMContentLoaded', function() {
	let canvas = document.createElement('canvas');
	canvas.id = 'clockJS-canvas';
	canvas.width = canvasSize;
	canvas.height = canvasSize;
	canvas.style.border = canvasBorder;

	document.body.appendChild(canvas);
	
	if (canvas.getContext) {
		let ctx = canvas.getContext('2d');
		redraw(ctx);
		setInterval(function() {
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
	
	draw(context, angle) {
		let handXLength = this.length * Math.sin(Math.PI * angle / 180);
		let handYLength = this.length * Math.cos(Math.PI * angle / 180);
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
	let dotCenterX = 0;
	let dotCenterY = 0;
	context.fillStyle = dotColor;
	for (let angle = 0; angle < 360; angle += 6) {
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
	hourAngle = ((hour % 12) * 60 + min) * 0.5; // ((hour % 12) * 60 + min) * 100 / 720) * 360 / 100;
	
	context.clearRect(0, 0, canvasSize, canvasSize); // clear canvas
	
	drawCircle(context);
	drawDots(context);
	hourHand.draw(context, hourAngle);
	minHand.draw(context, minAngle);
	secHand.draw(context, secAngle);
}
