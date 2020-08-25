const fs = require('fs');

module.exports = class AddressGenerator {

	constructor() {
		this.addrData = this.loadData('../data/address.csv');
	}

	loadData(filename) {

		let data = fs.readFileSync(filename).toString('utf16le');

		let lines = data.split('\n');

		// ignore last line
		lines.pop();

		return lines.map((line) => {

			let parts = line.split(',');

			let conditions = parts[4].replace('\r', '');
			let all = false;
			let type = '';

			if (conditions.indexOf('單全') != -1) {
				all = true;
				type = 'o';
			} else if (conditions.indexOf('雙全') != -1) {
				all = true;
				type = 'e';
			} else if (conditions.indexOf('連全') != -1) {
				all = true;
				type = 'c';
			} else if (conditions.indexOf('全') != -1) {
				all = true;
			} else if (conditions.indexOf('單') != -1) {
				type = 'o';
			} else if (conditions.indexOf('雙') != -1) {
				type = 'e';
			} else if (conditions.indexOf('連') != -1) {
				type = 'c';
			}

			// Clearing
			conditions = conditions
				.replace(/ /g, '')
				.replace(/　/g, '')
				.replace(/連/g, '')
				.replace(/單全/g, '')
				.replace(/雙全/g, '')
				.replace(/雙/g, '')
				.replace(/單/g, '')
				.split('至')
				.filter((data) => data);

			conditions = conditions.map((c) => {

				let raw = c;
				let lane = 0;
				let alley = 0;
				let num = 0;
				let sub = 0;
				let floor = 0;
				let follow = false;
				let type = null;

				let parts = c.split('巷');
				if (parts.length > 1) {
					lane = parseInt(parts[0]);
					c = parts[1];

				}

				parts = c.split('弄');
				if (parts.length > 1) {
					alley = parseInt(parts[0]);
					c = parts[1];
				}

				parts = c.split('樓');
				if (parts.length > 1) {
					floor = parseInt(parts[0]);
					c = parts[1];
				}

				if (c.indexOf('以上') != -1) {
					type = 'g';
					c = c.replace('以上', '');
				} else if (c.indexOf('以下') != -1) {
					type = 'l';
					c = c.replace('以下', '');
				}

				if (c.indexOf('及附號') != -1) {
					follow = true;
					c = c.replace('及附號', '');
				}

				if (c.indexOf('含附號') != -1) {
					follow = true;
					c = c.replace('含附號', '');
				}

				if (c.indexOf('號') != -1) {
					c = c.replace('號', '');

					// Sub
					let nums = c.split('之');
					if (nums.length > 1) {
						sub = parseInt(nums[1]);
					}

					num = parseInt(nums[0]);
				}

				return {
					lane: lane,
					alley: alley,
					num: num,
					sub: sub,
					floor: floor,
					type: type,
					follow: follow,
				};
			});

			return {
				zip: parts[0],
				city: parts[1],
				dist: parts[2],
				road: parts[3],
				all: all,
				type: type,
				conditions: conditions,
			}
		});
	}

	selectRoad() {

		let index = Math.floor(Math.random() * (this.addrData.length - 1));

		return this.addrData[index];
	}

	selectNumbers(min, max) {
		return Math.floor(Math.random() * max) + min;
	}

	selectFloor() {

		let floor = this.selectNumbers(1, 24);
		if (floor > 1) {
			return floor + '樓';
		}

		return '';
	}

	selectAddress(road) {

		let addr = [
			road.city,
			road.dist,
			road.road,
		];

		if (!road.conditions.length) {

			return addr
				.concat([ this.selectNumbers(1, 500) + '號' ])
				.concat([ this.selectFloor() ])
				.join('');
		}

		if (road.conditions[0].lane) {
			addr.push(road.conditions[0].lane + '巷');
		}

		if (road.conditions[0].alley) {
			addr.push(road.conditions[0].alley + '弄');
		}

		if (road.conditions[0].sub) {
			addr.push(this.selectNumbers(1, 500) + '之' + this.selectNumbers(1, 3) + '號')
		} else {
			addr.push(this.selectNumbers(1, 500) + '號')
		}

		return addr
			.concat([ this.selectFloor() ])
			.join('');
	}

	generate() {
		let road = this.selectRoad();
		return this.selectAddress(road);
	}
};
