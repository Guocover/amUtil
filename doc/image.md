## image
image提供了将图片文件转为base64编码的方法

### 示例代码
js
```javascript
	AU.image.toBase64("abc.png",function(base64Data,error){
		//返回值base64Data即为结果，如"data:image/png;base64....."，
	})
```

### 接口列表

```javascript
	/**
	 * image转换base64编码方法
	 *
	 * @memberof AU.toBase64
	 * @param {!path} path - 图片地址（需要同域,项目目录）
	 * @param {!function} callback - 返回数据 callback有两个参数，如除非异常，error为具体的Exception对象，如果非异常的情况，为undefined
	 *
	 * @desc 图片转换base64编码
	 *
	 * @example
	 * AU.image.toBase64("abc.png",function(base64Data,error){
     *  //data:image/png;base64.....
	 * })
	 */
	 image.toBase64 = function (path, callback)

```

### Demo
**二维码地址**

![图片转码测试 demo 二维码](https://i.alipayobjects.com/i/ecmng/png/201407/30Lzw1F4Q3.png)

`手机观看效果更好`

查看[Demo](../examples/image.html)


### 规则说明
1. 不支持跨域图片的base64编码
2、不支持file形式的图片base64编码