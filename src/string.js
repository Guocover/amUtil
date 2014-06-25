/**
 *
 * @namespace
 *
 * @memberof AJ
 * */
var string = {};

/**
 * 计算字符串长度的方法，中文算两个，英文算一个，特殊字符不算
 *
 * @memberof AJ.string
 * @param {!str} str - 需要计算长度的字符串
 *
 * @returns {int|undefined} 如果传入的不是string字符串，一律返回undefined
 *
 * @desc 计算字符串长度的方法
 *
 * @example
 * AJ.string.getFullLen($(this).val())
 */
string.getFullLen = function (str) {
	if (!isStr(str)) {
		return undefined;
	}

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
};

function isStr(o) {
	return Object.prototype.toString.call(o) === "[object String]";
}

module.exports = string;