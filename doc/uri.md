## uri
uri提供了对url进行对象化以及提供了便捷的方法，更加容易对url进行queryString的操作


### 示例代码
js
```javascript
	var uri = AJ.uri;
	var url = uri.parse(location.href); //返回一个uri对象
	uri.setParam(location.href,"name","value"); //返回当前的url并且在queryString上加上name=value的值

	uri.getParam("http://www.alipay.com?a=b","a");//返回b
```

### 接口列表
#### uri对象
 * source：源url
 * protocol：协议名 http https file
 * host：域名
 * port：端口号
 * query：query string数值
 * params：query string 对象
 * hast：hash数值
 * path：路径

```javascript
	/**
	 * 解析url，将url解析成uri对象
	 * @param {string} url url字符串,如果传入的是对象，这不做任何处理，返回
	 * @returns {object} uri对象
	 * @example
	 * AJ.uri.parse(location.href);
	 * */
	parse: function (url)

	/**
	 *
	 * 将uri对象转换成string对象
	 * @param {object} uri uri对象
	 * @returns {string}
	 *
	 * @example
	 * console.log(AJ.uri.stringify(uri)); // http://www.alipay.com
	 *
	 * */
	stringify: function (uri)

	/**
	 *
	 * 设置queryString的值
	 * @param {!string|object} url url字符串或者是uri对象
	 * @param {!string|object} name queryString的名字 如果是对象的话，则进行批量设置
	 * @param {?string} value queryString的值
	 *
	 * @returns {string|object} 如果传入的参数是string，则返回string，否则返回uri对象
	 *
	 * */
	setParam: function (url, name, value)

	/**
	 * 获取QueryString的值
	 * @param {!string|object} url url字符串或者是uri对象
	 * @param {!string} name 需要查找的名称
	 * @returns {string|undefined} 如果未找到，则返回undefined
	 *
	 * */
	getParam: function (url, name)

	/**
	 *
	 * 删除param中的name
	 * @param {string|object} url url字符串或者是uri对象
	 * @param {string} name queryString 中的名字
	 *
	 * @returns {string|object}  如果传入的参数是string，则返回string，否则返回uri对象
	 *
	 * */
	removeParam: function (url, name)

```

### Demo
**二维码地址**

![uri demo 二维码](https://i.alipayobjects.com/i/ecmng/png/201407/30M4zmFqUZ.png)

`手机观看效果更好`

查看[Demo](../examples/uri.html)