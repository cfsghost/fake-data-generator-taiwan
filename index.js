const NameGenerator = require('./lib/name');
const MobileGenerator = require('./lib/mobile');

module.exports = class DataGenerator {

	constructor() {
		this.Name = new NameGenerator();
		this.Mobile = new MobileGenerator();
	}
};
