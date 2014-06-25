## image
image提供了将图片文件转为base64编码的方法

### 示例代码
js
```
	AJ.image.toBase64("abc.png",function(base64Data,error){
		//返回值base64Data即为结果，如"data:image/png;base64....."，
	})
```

### 接口列表

```
	/**
	 * image转换base64编码方法
	 *
	 * @memberof AJ.toBase64
	 * @param {!path} path - 图片地址（需要同域,项目目录）
	 * @param {!function} callback - 返回数据 callback有两个参数，如除非异常，error为具体的Exception对象，如果非异常的情况，为undefined
	 *
	 * @desc 图片转换base64编码
	 *
	 * @example
	 * AJ.image.toBase64("abc.png",function(base64Data,error){
     *  //data:image/png;base64.....
	 * })
	 */
	 image.toBase64 = function (path, callback)

```

### 规则说明
1. 不支持跨域图片的base64编码
2、不支持file形式的图片base64编码