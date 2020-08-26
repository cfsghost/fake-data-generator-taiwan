# 台灣的假資料產生器 (Fake Data Generator for Taiwan)


[![](https://img.shields.io/npm/v/fake-data-generator-taiwan?style=for-the-badge)](https://github.com/cfsghost/fake-data-generator-taiwan)

好用的台灣假資料產生器，用於隨機產生測試用的假個資。

## Supported Data types

目前已支援資料類型：

* 繁體中文姓名 (Traditional Chinese Name) : 常見三個字、單名、複姓（依照常用字權重）
* 台灣身分證字號 (ID Number)：符合規範的身分證字號、支援第三性保留編號（但出現機率只有千分之五）
* 手機號碼（Mobile Phone）：台灣地區常用的 09 開頭的合法手機號碼格式
* 台灣地址（Address）：合法格式的完整地址，包括城市、區域、街、巷、弄、門牌號（包括附號）及樓層

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

會隨機生成類似下面結果的假資料：

```shell
...
{
  idNum: 'Y286803761',
  name: '于柔建',
  phone: '0934840562',
  address: '彰化縣社頭鄉延平街433號之1'
}
{
  idNum: 'S265845381',
  name: '馬怡岱',
  phone: '0924248477',
  address: '臺中市大里區中興路１段298巷275號15樓'
}
{
  idNum: 'N118578439',
  name: '于培珊',
  phone: '0935754681',
  address: '苗栗縣苑裡鎮健康二街97號6樓'
}
{
  idNum: 'E243376680',
  name: '謝霖君',
  phone: '0938271546',
  address: '桃園市新屋區東勢315號15樓'
}
...
```

## License

Licensed under the MIT License

## Authors

Copyright(c) 2020 Fred Chien <<cfsghost@gmail.com>>
