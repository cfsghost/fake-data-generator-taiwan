const fs = require('fs');

module.exports = class MobileGenerator {

	constructor() {
		this.data = this.loadData('../data/mobile.dat');
	}

	loadData(filename) {

		let data = fs.readFileSync(filename).toString();
		let records = data.split('\n');

		records.pop();

		return records;
	}

	selectFirstNumber() {

		let index = Math.floor(Math.random() * (this.data.length - 1));

		return this.data[index];
	}

	selectNumbers(num) {

		let nums = [];
		for (let i = 0; i < num; i++) {
			let n = Math.floor(Math.random() * 9);

			nums.push(n);
		}

		return nums.join('');
	}

	generate(area, totalNumber) {

		let result = '';
		if (area) {
			result = area.toString();
		}

		result += this.selectFirstNumber();
		result += this.selectNumbers(totalNumber - result.length);

		return result;
	}
}
