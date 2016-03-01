var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var cWidth = canvas.width;
var cHeight = canvas.height;
var width = cWidth / 2;
var height = cHeight / 2;
var axesColor = "#222";
var curveColor = "#ff0000";
var gridStep = 20;
var limits = 10000;

ctx.translate(width - 0.5, height - 0.5);
ctx.scale(1, -1);

function logInfo(value) {
	var infos = document.getElementById("infos");

	infos.innerHTML += "<br>" + value;
}

function drawAxes(values, grid) {
	var i = 0;

	if(grid) {
		var gridColor = "#eee";

		ctx.strokeStyle = gridColor;
		for(i = - width; i < width; i += gridStep) { // (width = height);
			ctx.moveTo(i, - height);
			ctx.lineTo(i, height);
			ctx.moveTo(- width, i);
			ctx.lineTo(width, i);
		}
		ctx.stroke();
	}

	ctx.beginPath();
	for(i = - width; i < width; i+= gridStep) {
		if(values) {
			ctx.font = "9px Arial";
			ctx.textBaseline = "top";
			ctx.textAlign = "center";
			ctx.fillText(i, i, 4);
			ctx.textBaseline = "middle";
			ctx.textAlign = "right";
			ctx.fillText(i, - 6, i);
		}
		ctx.moveTo(i, 0);
		ctx.lineTo(i, -4);
		ctx.moveTo(0, i);
		ctx.lineTo(4, i);
	}

	ctx.moveTo(- width, 0);
	ctx.lineTo(width, 0);
	ctx.moveTo(0, - height);
	ctx.lineTo(0, height);
	ctx.strokeStyle = axesColor;
	ctx.stroke();
	ctx.closePath();
}

function drawCurve() {
	var x = -40;
	var a = 1;
	var b = 0;
	var c = 0;
	var fx = f(x, a, b, c);

	logInfo("f(x) = " + a +"x² + " + b + "x + " + c);

	ctx.beginPath();
	ctx.strokeStyle = curveColor;
	ctx.moveTo(x, fx);
	do{
		fx = f(x, a, b, c);
		ctx.lineTo(x*10, fx*2);
		x++;
	} while(fx > - limits && fx < limits);
	ctx.stroke();
	ctx.closePath();
}

function f(x, a, b, c) {
	if (typeof(a) === 'undefined') {
		a = 1;
		b = 0;
		c = 0;
	}

	return a * Math.pow(x, 2) + b * x + c;
}