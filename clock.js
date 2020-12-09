const canvas = {
	width: 300,
	height: 300,
	border: '1px solid #d3d3d3'
}

class Clock {
	constructor(userCanvasId) {
		let userCanvas = document.getElementById(userCanvasId)
		userCanvas.width = canvas.width
		userCanvas.height = canvas.height
		userCanvas.style.border = canvas.border;
		if (userCanvas.getContext) {
			let ctx = userCanvas.getContext('2d')
			redraw(ctx);
			setInterval(function() {
				redraw(ctx);
			}, 1000);
		}
	}
}

class Hand {
	constructor(length, width, color) {
		this.length = length
		this.width = width
		this.color = color
	}
	
	draw(context, angle) {
		let handXLength = this.length * Math.sin(Math.PI * angle / 180)
		let handYLength = this.length * Math.cos(Math.PI * angle / 180)
		context.beginPath()
		context.strokeStyle = this.color
		context.lineWidth = this.width
		context.moveTo(circle.center.x, circle.center.y)
		context.lineTo(circle.center.x + handXLength, circle.center.y - handYLength)
		context.stroke()
	}
}

// clock face
const circle = {
	radius: 140,
	center: {
		x: canvas.width / 2,
		y: canvas.height / 2,
	},
	border: {
		width: 1,
		color: 'black'
	},
	dot: {
		size: 1,
		distancePerc: 90,
		color: 'black',
	}
}

function drawCircle(context) {
	context.beginPath()
	context.strokeStyle = circle.border.color
	context.lineWidth = circle.border.width
	// arc(x, y, radius, startAngle, endAngle, anticlockwise)
	context.arc(circle.center.x, circle.center.y, circle.radius, 0, 2 * Math.PI)
	context.stroke()
}

function drawDots(context) {
	context.fillStyle = circle.dot.color
	for (let angle = 0; angle < 360; angle += 6) {
		context.beginPath()
		let dotCenterX = circle.center.x + (circle.radius * circle.dot.distancePerc / 100 * Math.sin(Math.PI * angle / 180))
		let dotCenterY = circle.center.y - (circle.radius * circle.dot.distancePerc / 100 * Math.cos(Math.PI * angle / 180))
		// context.fillRect(x, y, width, height)
		context.fillRect(dotCenterX, dotCenterY, (angle % 15 == 0) ? circle.dot.size * 3: circle.dot.size, (angle % 15 == 0) ? circle.dot.size * 3: circle.dot.size)
		context.stroke()
	}
}

function redraw(context) {
	let date = new Date()
	let hour = date.getHours()
	let min = date.getMinutes()
	let sec = date.getSeconds()
	
	let hourAngle = ((hour % 12) * 60 + min) * 0.5 // ((hour % 12) * 60 + min) * 100 / 720) * 360 / 100
	let minAngle = (min * 60 + sec) / 10 // ((min * 60 + sec) * 100 / 3600) * 360 / 100
	let secAngle = sec * 6 // sec * 100 / 60 * 360 / 100
	
	context.clearRect(0, 0, canvas.width, canvas.height) // clear canvas
	
	drawCircle(context)
	drawDots(context)
	new Hand(circle.radius * 0.6, 2, 'blue').draw(context, hourAngle)
	new Hand(circle.radius * 0.8, 2, 'red').draw(context, minAngle)
	new Hand(circle.radius * 0.8, 2, 'green').draw(context, secAngle)
}
