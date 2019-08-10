function strNumSize (tempNum) {
  var stringNum = tempNum.toString()
  var index = stringNum.indexOf('.')
  var newNum = stringNum
  if (index !== -1) {
    newNum = stringNum.substring(0, index)
  };
  return newNum.length
}

function unitConvert (num) {
  var moneyUnits = ['', '万', '亿', '万亿']
  var dividend = 10000
  var curentNum = num
  // 转换数字
  var curentUnit = moneyUnits[0]
  // 转换单位
  for (var i = 0; i < 4; i++) {
    curentUnit = moneyUnits[i]
    if (strNumSize(curentNum) < 5) {
      break
    };
    curentNum = curentNum / dividend
  };
  var m = {
    num: 0,
    unit: ''
  }
  m.num = curentNum.toFixed(0)
  m.unit = curentUnit
  return m
}

export default {
  unitConvert
}
