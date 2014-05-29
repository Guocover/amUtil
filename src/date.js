(function(){
    /**
     *
     * AJ alipayJavascript
     * @namespace AJ
     * @author 雷骏 <leijun.wulj@alipay.com>
     * @version 1.0.0
     *
     * */
    var AJ = window.AJ = window.AJ || {};
    /**
     *
     * @namespace
     *
     * @memberof AJ
     * */
    AJ.date = AJ.date || {
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
        format: function (date, formatter) {
            var z = {
                y: date.getFullYear(),
                M: date.getMonth() + 1,
                d: date.getDate(),
                h: date.getHours(),
                m: date.getMinutes(),
                s: date.getSeconds(),
                S: date.getMilliseconds(),
                q: Math.floor((date.getMonth() + 3) / 3),
                w: date.getDay()
            };
            return formatter.replace(/([yMdhmsqSw])+/g, function (v,t) {
                switch(t){
                    case 'y':
                        return z[t].toString().slice(-v.length);
                    case 'q':
                    case 'S':
                        return z[t];
                    case 'w':
                        var week = {
                            '0' : '\u65e5',
                            '1' : '\u4e00',
                            '2' : '\u4e8c',
                            '3' : '\u4e09',
                            '4' : '\u56db',
                            '5' : '\u4e94',
                            '6' : '\u516d'
                        };
                        return week[z[t]];
                    default:
                        return ((v.length > 1 ? '0' : '') + z[t]).slice(-2);
                }
            });
        },
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
        now:function(){
            if (!Date.now) {
                return Date.now();
            }else{
                return (new Date).getTime();
            }
        }
    };
})();