(function () {
    var m = window.m = window.m || {}
    if (!window.localStorage) {
        console.error('本浏览器不支持localStorage')
        return false;
    }
    m.storage = m.storage || {};
    //最大缓存条数默认为100条;
    m.storage.maxlen = 100;
    var KEY_INDEX_ARRAY = JSON.parse(localStorage.getItem('KEY_INDEX_ARRAY') || "[]");
    if (Object.prototype.toString.call(KEY_INDEX_ARRAY) != "[object Array]")  KEY_INDEX_ARRAY = [];
    function refresh() {
        m.storage.length = KEY_INDEX_ARRAY.length;
        localStorage.setItem('KEY_INDEX_ARRAY', JSON.stringify(KEY_INDEX_ARRAY));
    }

    refresh();
    var getItem = function (key) {
        var item;
        if (typeof (key) == "number") {
            key = KEY_INDEX_ARRAY[key];
            if (!key) return;
        }
        item = localStorage.getItem(key);
        return item;
    }

    var setItem = function (key, value) {
        if (m.storage.length >= m.storage.maxlen) {
            return false;
        }
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            return false;
        }
        //如果已存在索引，刷新到栈顶
        for (var ii in KEY_INDEX_ARRAY) {
            if (key == KEY_INDEX_ARRAY[ii]) {
                KEY_INDEX_ARRAY.splice(ii, 1);
                break;
            }
        }
        KEY_INDEX_ARRAY.push(key);
        refresh();
    }
    var removeItem = function (key) {
        if (typeof (key) == "number") {
            key = KEY_INDEX_ARRAY.splice(key, 1)[0];
            if (!key) return;
        } else {
            for (var i in KEY_INDEX_ARRAY) {
                if (KEY_INDEX_ARRAY[i] == key) {
                    KEY_INDEX_ARRAY.splice(i, 1);
                }
            }
        }
        localStorage.removeItem(key);
        refresh();
    }

    var splice = function (i, len) {
        var arr = KEY_INDEX_ARRAY.splice(i, len);
        var rtv = [];
        for (var i in arr) {
            var key = arr[i];
            var val = getItem(key);
            rtv.push(val);
            localStorage.removeItem(key);
        }
        refresh();
        return rtv;
    }

    m.storage.setItem = setItem;
    m.storage.getItem = getItem;
    m.storage.removeItem = removeItem;
    m.storage.splice = splice;
})();