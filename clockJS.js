var CYRCLE_CENTER_X = 75;
var CYRCLE_CENTER_Y = 75;
var CYRCLE_RADIUS = 50;

var d = new Date();
console.log(d.getHours());
console.log(d.getMinutes());

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
		ctx.lineTo(CYRCLE_CENTER_X + CYRCLE_RADIUS - 10, CYRCLE_CENTER_Y);
		ctx.stroke();
		
		// minute hand
		ctx.beginPath();
		ctx.strokeStyle = 'blue';
		ctx.lineWidth= '1';
		ctx.moveTo(CYRCLE_CENTER_X, CYRCLE_CENTER_Y);
		ctx.lineTo(CYRCLE_CENTER_X, CYRCLE_CENTER_Y + CYRCLE_RADIUS);
		ctx.stroke();
	}
});

