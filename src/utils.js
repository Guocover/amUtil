(function () {
    var m = window.m = window.m || {}
    m.utils = m.utils || {};
    //获取字符串的字数长度，中文算两个字
    m.utils.getCharLength = function (str) {
        var len = 0;
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                len++;
            } else {
                len += 2;
            }
        }
        return len;
    }
    //截取指定字数长度的字符串，中文算两个
    //hasDot为true则自动在最后加上省略号
    m.utils.subChar = function (str, len, hasDot) {
        var newLength = 0;
        var newStr = "";
        var chineseRegex = /[^\x00-\xff]/g;
        var singleChar = "";
        var strLength = str.replace(chineseRegex, "**").length;
        for (var i = 0; i < strLength; i++) {
            singleChar = str.charAt(i).toString();
            if (singleChar.match(chineseRegex) != null) {
                newLength += 2;
            }
            else {
                newLength++;
            }
            if (newLength > len) {
                break;
            }
            newStr += singleChar;
        }

        if (hasDot && strLength > len) {
            newStr += "...";
        }
        return newStr;
    }

    m.utils.dateFormatter = function (date, formatter) {
        var z = {M: date.getMonth() + 1, d: date.getDate(), h: date.getHours(), m: date.getMinutes(), s: date.getSeconds()};
        formatter = formatter.replace(/(M+|d+|h+|m+|s+)/g, function (v) {
            return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
        });
        return formatter.replace(/(y+)/g, function (v) {
            return date.getFullYear().toString().slice(-v.length)
        });
    }

    m.utils.getQueryString = function getQueryString(name) {
        var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
        if (reg.test(location.href)) return RegExp.$2.replace(/\+/g, " ");
    }

    m.utils.timeBlock = function () {
    }

    // 金额格式化，格式成 123,123,12.00这样的格式
    m.utils.moneyFormat = function (num) {
        if (isNaN(num)) {
            return "";
        }
        num = num + "";
        if (/^.*\..*$/.test(num)) {
            var pointIndex = num.lastIndexOf(".");
            var intPart = num.substring(0, pointIndex);
            var pointPart = num.substring(pointIndex + 1, num.length);
            intPart = intPart + "";
            var re = /(-?\d+)(\d{3})/
            while (re.test(intPart)) {
                intPart = intPart.replace(re, "$1,$2")
            }
            num = intPart + "." + pointPart;
        } else {
            num = num + "";
            var re = /(-?\d+)(\d{3})/
            while (re.test(num)) {
                num = num.replace(re, "$1,$2")
            }
        }
        return num;
    };

    // 修正js的浮点计算
    m.utils.calculate = {
        add: function (arg1, arg2) {
            arg1 = arg1.toString(), arg2 = arg2.toString();
            var arg1Arr = arg1.split("."),
                arg2Arr = arg2.split("."),
                d1 = arg1Arr.length == 2 ? arg1Arr[1] : "",
                d2 = arg2Arr.length == 2 ? arg2Arr[1] : "";
            var maxLen = Math.max(d1.length, d2.length);
            var m = Math.pow(10, maxLen);
            var result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen));
            var d = arguments[2];
            return typeof d === "number" ? Number((result).toFixed(d)) : result;
        },
        sub: function (arg1, arg2) {
            return m.utils.calculate.add(arg1, -Number(arg2), arguments[2]);
        }
    };

})();
