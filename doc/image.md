## image
image提供了将图片文件转为base64编码的方法

### 示例代码

html
```


```
js
```

```



### 接口列表

```
	/**
	 * image转换base64编码方法
	 *
	 * @memberof AJ.toBase64
	 * @param {!path} path - 图片地址（需要同域,项目目录）
	 * @param {!function} callback - 返回数据
	 *
	 * @returns {string}
	 *
	 * @desc image转换base64编码方法
	 *
	 * @example
	 * AJ.image.toBase64("abc.png",function(base64Data){
		 *  //data:image/png;base64.....
		 * })
	 */
	 image.toBase64 = function (path, callback)

```

### 示例代码

```
	AJ.image.toBase64("abc.png",function(base64Data){
		//返回值base64Data即为结果，如"data:image/png;base64....."
	})
```

