## date
date提供了获取当前时间戳和格式化指定日期的方法

### 接口列表

```

	/**
	 * 日期格式化方法
	 *
	 * @memberof AJ.date
	 * @param {!Date} date - 日期对象
	 * @param {?String} formatter - 指定格式化格式
	 *
	 * @returns {String}
	 *
	 * @desc 日期格式化方法
	 *
	 * @example
	 * var d = new Date();
	 * var ds = AJ.date.format(d,'yy-MM-dd'); //2014-05-03
	 * var ds = AJ.date.format(d,'yy/M/d'); //2014/5/3
	 * var ds = AJ.date.format(d,'yy/MM/d hh:mm:ss'); //2014/5/3 18:31:24
	 */
	format: function (date, formatter)
	
	/**
	 * 当前时间时间戳
	 *
	 * @memberof AJ.date
	 *
	 * @returns {Number}
	 *
	 * @desc 当前时间时间戳
	 *
	 * @example
	 * var nowStamp= AJ.date.now();
	 */
	now: function ()

```

### 示例代码

```
	var date = AJ.date;
	var d = new Date();
	var ds = date.format(d,'yy-MM-dd'); //2014-05-03
	var dnow = date.now(); //返回当前时间戳，如：1403104207894
```

### 演示 可选