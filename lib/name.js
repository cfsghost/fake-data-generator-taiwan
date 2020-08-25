const fs = require('fs');

module.exports = class NameGenerator {

	constructor() {
		this.fnData = this.loadData('../data/firstname.dat');
		this.lnData = this.loadData('../data/lastname.dat');
	}

	loadData(filename) {

		let data = fs.readFileSync(filename).toString();
		let meta = {
			totalWeight: 0,
		};

		let records = data.split('\n');
		records.pop();
		records = records.map((line) => {
			let parts = line.split(' ')

			meta.totalWeight += parseInt(parts[1]);

			return {
				t: parts[0],
				w: parts[1]
			};
		})

		return {
			meta: meta,
			records: records,
		};
	}

	selectFirstName() {

		let index = Math.floor(Math.random() * (this.fnData.records.length - 1));

		return this.fnData.records[index].t;
	}

	selectLastName() {

		let index = Math.floor(Math.random() * (this.lnData.records.length - 1));

		return this.lnData.records[index].t;
	}

	generate() {
		let firstNameSeed = Math.floor(Math.random() * 100) + 1;

		let firstName = [];
		if (firstNameSeed <= 90) {
			for (let i = 0; i < 2; i++) {
				firstName.push(this.selectFirstName())
			}
		} else {
			// Single name
			firstName.push(this.selectFirstName())
		}

		return this.selectLastName() + firstName.join('');
	}
}
