const fs = require('fs');

const correctionValue = 2;

module.exports = class NameGenerator {

	constructor() {
		this.fnData = this.loadData(__dirname + '/../data/firstname.dat');
		this.lnData = this.loadData(__dirname + '/../data/lastname.dat');
	}

	loadData(filename) {

		let data = fs.readFileSync(filename).toString();
		let meta = {
			maxWeight: 0,
			scaledWeight: 0,
		};

		let records = data.split('\n');
		records.pop();
		records = records.map((line) => {
			let parts = line.split(' ')

			let weight =  parseInt(parts[1]);
			if (meta.maxWeight < weight)
				meta.maxWeight = weight;

			return {
				t: parts[0],
				w: weight,
			};
		})

		meta.scaledWeight = Math.round(meta.maxWeight * correctionValue);

		return {
			meta: meta,
			records: records,
		};
	}

	selectName(data) {

		let index = Math.floor(Math.random() * (data.records.length - 1));

		let weight = data.records[index].w;

		let chance = Math.floor(Math.random() * (data.meta.scaledWeight - 1)) + 1;
		
		if (chance <= weight) {
			return data.records[index].t;
		}

		return this.selectName(data);
	}

	selectFirstName() {
		return this.selectName(this.fnData)
	}

	selectLastName() {
		return this.selectName(this.lnData)
	}

	generate() {
		let firstNameSeed = Math.floor(Math.random() * 100) + 1;

		let firstName = [];
		if (firstNameSeed <= 95) {
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
