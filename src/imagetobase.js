;
(function(){
    var AJ = window.AJ = window.AJ || {}
    AJ.imagetobase = AJ.imagetobase || {};

    var setPath = function(path){
        var eleCan;
        var getBody = document.getElementsByTagName("body");
        var ctx;
        var img = new Image();
        var dataValue = "";

        //判断页面有没有已经append的canvase元素
        if(document.getElementById('imagetobase')){
            eleCan = document.getElementById('imagetobase');
        }else{
            eleCan = document.createElement('canvas').setAttribute("id", "imagetobase");
            getBody.appendChild(eleCan);
        }
        ctx = eleCan.getContext('2d');

        img.onload = function(){
            eleCan.width  = img.width;
            eleCan.height = img.height;
            // ctx.translate(img.width-1, img.height-1);
            // ctx.rotate(Math.PI);
            ctx.drawImage(img, 0, 0, img.width, img.height);
            dataValue = eleCan.toDataURL();
        }
        img.src = path;

        return dataValue;
    }
    AJ.imagetobase.setPath = setPath;
})()