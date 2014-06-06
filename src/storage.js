(function () {
    /**
     *
     * AJ alipayJavascript
     * @namespace AJ
     * @author 圆非
     * @version 1.0.0
     *
     * */
    var AJ = window.AJ = window.AJ || {};

    var storage = {},
        ls = window.localStorage;

    if (!window.localStorage) {
        storage.get = storage.get = storage.remove = storage.clear = function () {
            console.log('抱歉，您的浏览器暂不支持localstoarage的使用！');
        }

        storage.length = 0;
    } else {
        storage = {
            'get': function (key) {
                var val = ls.getItem(key);
                //查询不存在的key时，有的浏览器返回null，这里统一返回undefined
                if (val === null) {
                    return undefined;
                }

                try {
                    return JSON.parse(val);
                } catch (e) {
                    return val;
                }
            },
            'set': function (key, val) {
                //修复 iPhone/iPad 'QUOTA_EXCEEDED_ERR' 错误的bug
                if (this.get(key)) {
                    this.remove(key);
                }

                //val 不存在, 或者为"undefined"或"null"字符串时，等同于删除操作
                if (!val || val === 'undefined' || val === 'null') return undefined;

                //除函数之外的所有参数全部stringify之后再保存
                if (Object.prototype.toString.apply(val) !== '[object Function]') val = JSON.stringify(val);

                // 增加判断是否达到存储上限逻辑
                try {
                    ls.setItem(key, val);
                    return true;
                } catch (e) {
                    return false;
                }
            },
            'remove': function (key) {
                ls.removeItem(key);
            },
            'clear': function () {
                ls.clear();
            },
            'length': ls.length
        };
    }

    AJ.storage = AJ.storage || storage;
})();