/**
 *
 * image 图片方法
 *
 * @memberof AJ
 *
 * @author 杜黑
 * @version 1.0.0
 *
 * */
var image = {};
/**
 * image转换base64编码方法
 *
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
image.toBase64 = function (path, callback) {
	var eleCanvas = document.createElement('canvas'),
		ctx = eleCanvas.getContext('2d'),
		img = new Image();

	img.onload = function () {
		var dataValue = "", error;

		eleCanvas.width = img.width;
		eleCanvas.height = img.height;
		ctx.drawImage(img, 0, 0, img.width, img.height);
		try {
			dataValue = eleCanvas.toDataURL();
			eleCanvas = null;
		} catch (e) {
			console.error(e);
			error = e;
		}
		callback(dataValue, error);
	};
	img.onerror = function () {
		alert("图片无法加载，请检查对应地址的图片是否存在");
	};
	img.src = path;
};

module.exports = image;