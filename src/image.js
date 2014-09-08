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

/**
 * 第一期兼容srcset
 *
 * @desc 兼容w3c的srcset属性
 *
 * @example
 * AJ.image.imageFill()
 */
 image.imageFill = function () {
    imageFillOnce();
    var intervalId = setInterval(function () {
        imageFillOnce();
        if (/^loaded|^i|^c/.test(document.readyState)) {
            clearInterval(intervalId);
            return;
        }
    }, 250);
};
/*
*@param 通过srcset属性遍历到image的dom
*/
var getSrcSetAttr = function (_self) {
    var srcSetAttr = _self.getAttribute("srcset");
    var srcSetOption = srcSetAttr.split(",");
    var srcSetPare = [];

    //对属性内容进行格式化，最后拼成对象
    if (/^.+,.+x$/.test(srcSetAttr)) {
        for (var i = 0, len = srcSetOption.length; i < len; i++) {
            var srcSetOptionVal;
            var srcSetOptionParse = {};

            //判断srcset的格式
            if (/^.+\s.+x$/.test(srcSetOption[i])) {
                srcSetOptionVal = srcSetOption[i].split(" ");
                srcSetOptionParse.src = srcSetOptionVal[0];
                srcSetOptionParse.dpi = srcSetOptionVal[1];
                srcSetPare.push(srcSetOptionParse);
            } else {
                console.warn(srcSetOption[i] + ":srcset属性格式错误");
            }
        }
    } else {
        console.warn("srcset属性格式错误");
    }

    return srcSetPare;
};
/*
*@param 经过格式化后的srcset属性值（包括dpi和对应src）
*@param 当前screen的dpi值
*@param 通过srcset属性遍历到image的dom
*/
var applySrcset = function(getSrcParsed,getDprX,_self){
    if (getSrcParsed.length) {
        for (var i = 0, len = getSrcParsed.length; i < len; i++) {
            if(getSrcParsed[i].dpi === getDprX){
                _self.src = getSrcParsed[i].src;
            }
        }
    }
};

var imageFillOnce = function () {
    var srcsetSupported = "srcset" in document.createElement("img");
    var getDpr = window.devicePixelRatio || 1;

	//判断是否支持srcset的属性
    if (srcsetSupported === false) {
        var eleSrcSet = document.querySelectorAll("img[srcset]");
        var getSrcParsed;
        var getDprX = getDpr + "x";

        //遍历到拥有srcset属性的img节点，后进行判断dpi然后更换图片的操作
        if (eleSrcSet.length) {
            for(var i= 0,len = eleSrcSet.length;i<len;i++){
                var _self = eleSrcSet[i];
                getSrcParsed = getSrcSetAttr(_self);
                applySrcset(getSrcParsed,getDprX,_self);
            };
        }
    }
    ;
};

module.exports = image;