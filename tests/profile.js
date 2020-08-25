const FakeDataGenerator = require('../');

let generator = new FakeDataGenerator();

const num = 100;

for (let i = 0; i < num; i++) {
	let name = generator.Name.generate();
	let mobile = generator.Mobile.generate(0, 10);

	let record = {
		name: name,
		phone: mobile,
	};

	console.log(record);
}

