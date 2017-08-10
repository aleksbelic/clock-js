document.addEventListener("DOMContentLoaded", function() {
	var c = document.getElementById("clockJS-canvas");
	var context = c.getContext("2d");
	context.beginPath();
	context.arc(150, 75, 50, 0, 2 * Math.PI);
	context.stroke();
});

