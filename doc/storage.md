## storage
storage提供了页面的数据存储的模式，采用了localstorage的机制进行数据存储

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
	 * @param {*} val 设置的存储数值
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

### 示例代码

```
	var storage = AJ.storage;
	storage.set("key1","value1");
	storage.get("key1"); //返回value1
```

### 演示 可选
