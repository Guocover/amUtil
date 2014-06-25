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
 * @returns {int}
 *
 * @desc 计算字符串长度的方法
 *
 * @example
 * AJ.string.getFullLen($(this).val())
 */
string.getFullLen = function (str) {
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

module.exports = string;