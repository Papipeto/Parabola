var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var log = new Log();

function Parabola() {
	this.cWidth = canvas.width;
	this.cHeight = canvas.height;
	this.width = this.cWidth / 2;
	this.height = this.cHeight / 2;
	this.axesColor = "#222";
	this.curveColor = "#ff0000";
	this.gridStep = 20;
	this.limits = 10000;
	this.x = -40;
	this.a = 1;
	this.b = 0;
	this.c = 0;
	this.fx = this.f(this.x, this.a, this.b, this.c);

	ctx.translate(this.width - 0.5, this.height - 0.5);
	ctx.scale(1, -1);

	this.draw();
}

Parabola.prototype.drawAxes = function(values, grid) {
	var i = 0;

	if(grid) {
		var gridColor = "#eee";

		ctx.strokeStyle = gridColor;
		for(i = - this.width; i < this.width; i += this.gridStep) { // (this.width = this.height);
			ctx.moveTo(i, - this.height);
			ctx.lineTo(i, this.height);
			ctx.moveTo(- this.width, i);
			ctx.lineTo(this.width, i);
		}
		ctx.stroke();
	}

	ctx.beginPath();
	for(i = - this.width; i < this.width; i+= this.gridStep) {
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

	ctx.moveTo(- this.width, 0);
	ctx.lineTo(this.width, 0);
	ctx.moveTo(0, - this.height);
	ctx.lineTo(0, this.height);
	ctx.strokeStyle = this.axesColor;
	ctx.stroke();
	ctx.closePath();
};

Parabola.prototype.drawCurve = function() {

	ctx.beginPath();
	ctx.strokeStyle = this.curveColor;
	ctx.moveTo(this.x, this.fx);
	do{
		this.fx = this.f(this.x, this.a, this.b, this.c);
		ctx.lineTo(this.x*10, this.fx*2);
		this.x++;
	} while(this.fx > - this.limits && this.fx < this.limits);
	ctx.stroke();
	ctx.closePath();
};

Parabola.prototype.draw = function() {
	log.info(log.FUNCTION, "f(x) = " + this.a +"x² + " + this.b + "x + " + this.c);
	ctx.clearRect(0, 0, this.cWidth, this.cHeight);
	this.drawAxes(false, true);
	this.drawCurve();
};

Parabola.prototype.f = function(x, a, b, c) {
	return a * Math.pow(x, 2) + b * x + c;
};

Parabola.prototype.setValue = function(variable, value) {
	this[variable] = value;
};