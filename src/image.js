;
(function () {
	/**
	 *
	 * AJ alipayJavascript
	 * @namespace AJ
	 * @author 凯达 <wb-zhenkd@alipay.com>
	 * @version 1.0.0
	 *
	 * */
	var AJ = window.AJ = window.AJ || {}
	/**
	 *
	 * @namespace
	 *
	 * @memberof AJ
	 * */
	AJ.image = AJ.image || {};

	/**
	 * image转换base64编码方法
	 *
	 * @memberof AJ.image2base64
	 * @param {!path} path - 图片地址（需要同域,项目目录）
	 * @param {!function} callback - 返回数据
	 *
	 * @returns {string}
	 *
	 * @desc image转换base64编码方法
	 *
	 * @example
	 * AJ.image.image2base64("abc.jpg",function(base64Data){
     *  //data:image/png;base64.....
     * })
	 */
	var image2base64 = function (path, callback) {

		var eleCanvas = document.createElement('canvas'),
			ctx = eleCanvas.getContext('2d'),
			img = new Image();

		img.onload = function () {
			var dataValue = "";

			eleCanvas.width = img.width;
			eleCanvas.height = img.height;
			ctx.drawImage(img, 0, 0, img.width, img.height);
			try {
				dataValue = eleCanvas.toDataURL();
				eleCanvas = null;
			} catch (e) {
				console.warn(e);
			}
			callback(dataValue);
		};
		img.onerror = function () {
			alert("图片无法加载，请检查对应地址的图片是否存在");
		}

		img.src = path;

	}
	AJ.image.image2base64 = image2base64;
})();