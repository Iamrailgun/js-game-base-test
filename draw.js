function DrawTest() {
	console.log('DrawTest');
}

function DrawRect(x, y, w, h, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, w, h);
}

function DrawText(x, y, text) {
	ctx.font = '25px serif';
	ctx.fillText(text , x, y);
}

function DrawArc(x, y, r, color) {
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.arc(x, y, r, 0, 2 * Math.PI, false);
	ctx.fill();
}