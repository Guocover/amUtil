(function () {
    var m = window.m = window.m || {};
    if (!m.storage) {
        console.error('sheet组件加载失败，未加载依赖组件:storage')
        return false;
    }
    m.ajaxCache = m.ajaxCache || {};
    var defDelay = 200;
    var ajax = function (url, settings, cacheKey) {
        if (typeof (url) == "string") {
            settings = settings || {};
            settings.url = url;
        } else {
            cacheKey = settings;
            settings = url;
            url = undefined;
        }
        if (settings.cache !== false) {
            var delayTime = settings.delay == undefined ? defDelay : settings.delay;
            //如果没有指定缓存key，用url+param作为key
            if (!cacheKey) {
                cacheKey = settings.url;
                var param = settings.data;
                if (param != undefined) {
                    param = $.param(param);
                    var chr = cacheKey.indexOf("?") > 0 ? "&" : "?";
                    cacheKey += chr + param;
                }
            }
            //原success
            var successFn = settings.success;
            var isLocalRan = false;

            var getCacheST = setTimeout(function () {
                var dataStr = m.storage.getItem(cacheKey);
                if (dataStr) {
                    var data = JSON.parse(dataStr);
                    if (!!successFn) {
                        successFn(data, "local");
                        isLocalRan = true;
                    }
                }
            }, delayTime);

            //代理原success;
            settings.success = function (data) {
                //如果在delay之前成功回调则直接使用在线数据
                clearTimeout(getCacheST);
                var onlineDataStr = JSON.stringify(data);
                // 如果在线数据与缓存数据相同，并且已经执行过本地缓存回调，则不重复执行
                if (isLocalRan) {
                    var localCacheStr = m.storage.getItem(cacheKey);
                    if (onlineDataStr == localCacheStr) {
                        return false;
                    }
                }
                successFn(data, "online");
                m.storage.setItem(cacheKey, onlineDataStr);
            }
        }
        $.ajax(settings);
    }
    m.ajaxCache = ajax;
})();