## string
string提供了计算字符串长度的方法，中文算两个，英文算一个

### 示例代码
js
```	
	var str = "alipay";
	var length = AJ.string.getFullLen(str); //返回字符串str的长度
```

### 接口列表

```
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
	string.getFullLen = function (str)

```

### Demo
**二维码地址**

![string demo 二维码](https://i.alipayobjects.com/i/ecmng/png/201407/30M3qmQJZf.png)

`手机观看效果更好`

查看[Demo](../examples/string.html)

