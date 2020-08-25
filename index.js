const NameGenerator = require('./lib/name');
const MobileGenerator = require('./lib/mobile');
const IDNumberGenerator = require('./lib/id_number');

module.exports = class DataGenerator {

	constructor() {
		this.Name = new NameGenerator();
		this.Mobile = new MobileGenerator();
		this.IDNumber = new IDNumberGenerator();
	}
};
