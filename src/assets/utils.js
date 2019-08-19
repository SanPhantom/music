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

function fas(num) {
    return num < 10 ? "0" + num : num;
}

function shuffle(arr) {
    let size = arr.length;
    let random;
    while (size !== 0) {
        random = (Math.random() * size--) >>> 0;
        [arr[size], arr[random]] = [arr[random], arr[size]];
    }
    return arr;
}

function formatTime(time) {
    // time = parseInt(time / 1000);
    let sec = parseInt(time % 60);
    let min = parseInt(time / 60);
    return fas(min) + ":" + fas(sec);
}

function debounce(func, wait, immediate) {
    let timeout;

    return function() {
        let context = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            var callNow = !timeout;
            timeout = setTimeout(() => {
                timeout = null;
            }, wait)
            if (callNow) func.apply(context, args)
        } else {
            timeout = setTimeout(function() {
                func.apply(context, args)
            }, wait);
        }
    }
}

function throttle(func, wait, type) {
    return function() {
        let context = this;
        let args = arguments;
        if (type === 1) {
            let previous = 0;
            let now = Date.now();

            if (now - previous > wait) {
                func.apply(context, args);
                previous = now;
            }
        } else if (type === 2) {
            let timeout;
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null;
                    func.apply(context, args)
                }, wait)
            }
        }
    }
}

export default {
    unitConvert,
    formatTime,
    shuffle,
    debounce,
    throttle
}
