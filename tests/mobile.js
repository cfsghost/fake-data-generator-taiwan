const FakeDataGenerator = require('../');

let generator = new FakeDataGenerator();

let mobile = generator.Mobile.generate(0, 10);

console.log(mobile);
