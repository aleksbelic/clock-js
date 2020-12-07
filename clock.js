// canvas
const CANVAS_SIZE = 300;
const CANVAS_BORDER = '1px solid #d3d3d3';

// clock face
const CIRCLE_RADIUS = 140;
const CIRCLE_CENTER_X = CANVAS_SIZE / 2;
const CIRCLE_CENTER_Y = CANVAS_SIZE / 2;
const CIRCLE_BORDER_COLOR = 'black';
const CIRCLE_BORDER_WIDTH = 1;
const DOT_SIZE = 1;
const DOT_DISTANCE_PERC = 90;
const DOT_COLOR = 'black';

// clock hands
const HOUR_HAND_LENGTH_PERC = 60;
const HOUR_HAND_LENGTH = CIRCLE_RADIUS * HOUR_HAND_LENGTH_PERC / 100;
const HOUR_HAND_WIDTH = 2;
const HOUR_HAND_COLOR = 'blue';
const MIN_HAND_LENGTH_PERC = 80;
const MIN_HAND_LENGTH = CIRCLE_RADIUS * MIN_HAND_LENGTH_PERC / 100;
const MIN_HAND_WIDTH = 2;
const MIN_HAND_COLOR = 'red';
const SEC_HAND_LENGTH_PERC = 80;
const SEC_HAND_LENGTH = CIRCLE_RADIUS * SEC_HAND_LENGTH_PERC / 100;
const SEC_HAND_WIDTH = 2;
const SEC_HAND_COLOR = 'green';

let hour = new Date().getHours();
let min = new Date().getMinutes();
let sec = new Date().getSeconds();

document.addEventListener('DOMContentLoaded', function() {
	let canvas = document.createElement('canvas');
	canvas.id = 'clockJS-canvas';
	canvas.width = CANVAS_SIZE;
	canvas.height = CANVAS_SIZE;
	canvas.style.border = CANVAS_BORDER;

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
		context.moveTo(CIRCLE_CENTER_X, CIRCLE_CENTER_Y);
		context.lineTo(CIRCLE_CENTER_X + handXLength, CIRCLE_CENTER_Y - handYLength);
		context.stroke();
	}
}

function drawCircle(context) {
	context.beginPath();
	context.strokeStyle = CIRCLE_BORDER_COLOR;
	context.lineWidth = CIRCLE_BORDER_WIDTH;
	// arc(x, y, radius, startAngle, endAngle, anticlockwise)
	context.arc(CIRCLE_CENTER_X, CIRCLE_CENTER_Y, CIRCLE_RADIUS, 0, 2 * Math.PI);
	context.stroke();
}

function drawDots(context) {
	let dotCenterX = 0;
	let dotCenterY = 0;
	context.fillStyle = DOT_COLOR;
	for (let angle = 0; angle < 360; angle += 6) {
		context.beginPath();
		dotCenterX = CIRCLE_CENTER_X + (CIRCLE_RADIUS * DOT_DISTANCE_PERC / 100 * Math.sin(Math.PI * angle / 180));
		dotCenterY = CIRCLE_CENTER_Y - (CIRCLE_RADIUS * DOT_DISTANCE_PERC / 100 * Math.cos(Math.PI * angle / 180));
		// context.fillRect(x, y, width, height);
		context.fillRect(dotCenterX, dotCenterY, (angle % 15 == 0) ? DOT_SIZE * 3: DOT_SIZE, (angle % 15 == 0) ? DOT_SIZE * 3: DOT_SIZE);
		context.stroke();
	}
}

function redraw(context) {
	secHand = new Hand(SEC_HAND_LENGTH, SEC_HAND_WIDTH, SEC_HAND_COLOR);
	sec = new Date().getSeconds();
	secAngle = sec * 6; // sec * 100 / 60 * 360 / 100;
	
	minHand = new Hand(MIN_HAND_LENGTH, MIN_HAND_WIDTH, MIN_HAND_COLOR);
	min = new Date().getMinutes();
	minAngle = (min * 60 + sec) / 10; // ((min * 60 + sec) * 100 / 3600) * 360 / 100;
	
	hourHand = new Hand(HOUR_HAND_LENGTH, HOUR_HAND_WIDTH, HOUR_HAND_COLOR);
	hour = new Date().getHours();
	hourAngle = ((hour % 12) * 60 + min) * 0.5; // ((hour % 12) * 60 + min) * 100 / 720) * 360 / 100;
	
	context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); // clear canvas
	
	drawCircle(context);
	drawDots(context);
	hourHand.draw(context, hourAngle);
	minHand.draw(context, minAngle);
	secHand.draw(context, secAngle);
}
