function Log() {
	this.FUNCTION = document.getElementById('fct');
}



Log.prototype.info = function(element, value) {
	element.innerHTML = value;
};