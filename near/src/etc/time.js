function timeFunction() {
	let v = this;
	setInterval(function() {
		let date = new Date().toLocaleDateString();
		let time = new Date().toLocaleTimeString();
		this.v = date + ' ' + time;
		return v;
	}, 1000);
}
export { timeFunction };
