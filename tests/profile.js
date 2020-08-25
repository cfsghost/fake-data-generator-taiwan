const FakeDataGenerator = require('../');

let generator = new FakeDataGenerator();

const num = 100;

for (let i = 0; i < num; i++) {
	let name = generator.Name.generate();
	let mobile = generator.Mobile.generate(0, 10);
	let id = generator.IDNumber.generate();
	let address = generator.Address.generate();

	let record = {
		idNum: id,
		name: name,
		phone: mobile,
		address: address,
	};

	console.log(record);
}

