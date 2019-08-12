function strNumSize(tempNum) {
  var stringNum = tempNum + '';
  var index = stringNum.indexOf('.')
  var newNum = stringNum
  if (index !== -1) {
    newNum = stringNum.substring(0, index)
  };
  return newNum.length
}

function unitConvert(num, fixedNum) {
  var moneyUnits = ['', '万', '亿', '万亿']
  var dividend = 10000
  var curentNum = num
  // 转换数字
  var curentUnit = moneyUnits[0]
  // 转换单位
  for (var i = 0; i < 4; i++) {
    curentUnit = moneyUnits[i]
      // console.log(curentNum);
    if (strNumSize(curentNum) < 5) {
      break
    };
    curentNum = curentNum / dividend

  };
  var m = {
    num: 0,
    unit: ''
  }
  m.num = curentNum.toFixed(fixedNum)
  m.unit = curentUnit
  return m.num + m.unit;
}

export default {
  unitConvert
}
