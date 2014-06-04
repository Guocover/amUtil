;
(function(){
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
    AJ.image2base64 = AJ.image2base64 || {};

    /**
     * image转换base64编码方法
     *
     * @memberof AJ.image2base64
     * @param {!path} src - 图片地址（需要同域,项目目录）
     * @param {?callback} data - 返回数据
     *
     * @returns {String}
     *
     * @desc image转换base64编码方法
     *
     * @example
     * AJ.image2base64.convertBase64("abc.jpg",function(base64Data){
     *  //data:image/png;base64.....
     * })
     */
    var convertBase64 = function(path,callback){
        var eleCan;
        var ctx;
        var img = new Image();
        var dataValue = "";

        //判断页面有没有已经append的canvase元素
        eleCan = document.createElement('canvas');
        ctx = eleCan.getContext('2d');

        // img.crossOrigin="*";
        img.onload = function(){
            eleCan.width  = img.width;
            eleCan.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            dataValue = eleCan.toDataURL();
            callback(dataValue);
        }
        img.src = path;
        img.crossOrigin = "Anonymous";

    }
    AJ.image2base64.convertBase64 = convertBase64;
})()