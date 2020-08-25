const fs = require('fs');

const areas = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'J',
	'K',
	'L',
	'M',
	'N',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'X',
	'Y',
	'W',
	'Z',
	'I',
	'O'
];

module.exports = class IDNumberGenerator {

	constructor() {
	}

	selectAreaNumber() {

		let index = Math.floor(Math.random() * (areas.length - 1));

		return areas[index];
	}

	selectGender() {
		let percentage = Math.floor(Math.random() * 1000) + 1;

		if (percentage > 995) {
			return 7;
		}

		return (Math.floor(Math.random() * 2) + 1);
	}

	generateSerialNumber() {

		let nums = [];
		for (let i = 0; i < 7; i++) {
			let n = Math.floor(Math.random() * 9);

			nums.push(n);
		}

		return nums;
	}

	getAreaNums(area) {
		return Array.from((areas.indexOf(area) + 10).toString()).map((s) => {
			return parseInt(s);
		});
	}

	figureChecksum(idArr) {

		let sum = idArr[0];
		for (let i = 1; i < idArr.length; i++) {
			sum += idArr[i] * (10 - i);
		}

		let	s = sum % 10;

		if (s == 0)
			return 0;

		return 10 - s;
	}

	generate() {

		let area = this.selectAreaNumber();
		let gender = this.selectGender();
		let serial = this.generateSerialNumber();

		let arr = this.getAreaNums(area)
			.concat([ gender ])
			.concat(serial);

		let result = [
			area,
			gender,
		].concat(serial);

		result.push(this.figureChecksum(arr))

		return result.join('');

	}
}
