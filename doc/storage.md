## storage
storage提供了页面的数据存储的模式，采用了localstorage的机制进行数据存储


### 示例代码
js
```
	var storage = AJ.storage;
	storage.set("key1","value1");
	storage.get("key1"); //返回value1
	storage.clear();	//清空所有键值
	storage.getExpiredDate("key1")		//获取key1键值的过期时间
```


### 接口列表

```
	/**
	 *
	 * 获取储存内容
	 * @param {string} key 存储内容的key值
	 * @returns {string|undefined} 返回值为undefined没找到该内容
	 *
	 * @example
	 * var content = AJ.storage.get("name");
	 *
	 * */
	get: function (key)

	/**
	 * 设置储存内容
	 * @param {string} key 存储的key值，区分大小写
	 * @param {*} val 设置的存储数值，除了object对象会做JSON.stringify处理，其他皆会转成string类型
	 * @param {?number|date} expire 过期时间,如果是date类型，则是过期日期，如果是number则是过几秒后过期 单位：秒
	 *
	 * @returns {undefined|object} 成功返回undefined，不成功，返回一个异常对象
	 *
	 * */
	set: function (key, val, expire)

	/**
	 * 删除存储值
	 * @param {string} key 储存的键值
	 *
	 * */
	remove: function (key)

	/**
	 * 清空所有键值
	 *
	 * */
	clear: function ()

	/**
	 *
	 * 获取过期日期
	 * @param {string} key 键值
	 * @returns {undefined|date} 如果该key不存在或者没有日期，则返回undefined,否则返回date对象
	 *
	 * */
	getExpiredDate: function (key)

```

### Demo
**二维码地址**

![storage demo 二维码](https://i.alipayobjects.com/i/ecmng/png/201407/30M1hg3eRT.png)

`手机观看效果更好`

查看[Demo](../examples/storage.html)


### 规则说明
1.  该storage设置的key值和原生的通用，不过要使用过期功能，则必须使用该组件。建议在代码中不要把该组件和原生混用，以便出现不符预期的情况
2.  原生storage如果传入的value为object的时，会转成[object Object]，该组件会对object进行JSON.stringify处理，其他类型皆和原生storage处理一致
3.  该组件的输出value为string，不会强制做JSON.parse，需要使用方根据事情情况，自行处理
4.  该组件对于异常，键值不存在，storage不支持等情况，api的返回皆为undefined