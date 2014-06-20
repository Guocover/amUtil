## string
string提供了计算字符串长度的方法

### 接口列表

```
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
	 * AJ.string.getStrLen($(this).val())
	 */
	string.getFullLen = function (str)

```

### 示例代码

```	
	var string = AJ.string;
	var length = string.getFullLen(str); //返回字符串str的长度
```
