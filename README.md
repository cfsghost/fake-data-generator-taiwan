# 台灣的假資料產生器 (Fake Data Generator for Taiwan)


[![](https://img.shields.io/npm/v/fake-data-generator-taiwan?style=for-the-badge)](https://github.com/cfsghost/fake-data-generator-taiwan)

好用的台灣假資料產生器，用於隨機產生測試用的假個資。

It is a useful library to generate fake data for testing in Taiwan.

## Supported Data types

目前已支援資料類型：

* 繁體中文姓名 (Traditional Chinese Name) : 常見三個字、單名、複姓
* 台灣身分證字號 (ID Number)：符合規範的身分證字號、支援第三性保留編號
* 手機號碼（Mobile Phone）：台灣地區常用的 09 開頭的手機號碼
* 台灣地址（Address）：合法的完整地址，包括城市、區域、街、巷、弄、門牌號（包括附號）及樓層

## Installation

可直接使用 `npm` 安裝：

```shell
npm install fake-data-generator-taiwan
```

## Examples

詳細使用方法可參考 `tests` 內的 scripts 檔，使用範例如下：

```javascript
const FakeDataGenerator = require('fake-data-generator-taiwan');

let generator = new FakeDataGenerator();

// 產生一百組假資料
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
```

## License

Licensed under the MIT License

## Authors

Copyright(c) 2020 Fred Chien <<cfsghost@gmail.com>>
