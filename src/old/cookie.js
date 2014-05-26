(function () {
    var m = window.m = window.m || {}
    m.cookie = m.cookie || {};
    var domainPrefix = window.location.host;
    var cookie = {
        set: function (name, value, expiredays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + expiredays);
            document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
            return true;
        },
        get: function (name) {
            var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)");
            var m = window.document.cookie.match(r);
            return (!m ? "" : m[1]);
        },
        remove: function (name, domain, path) {
            window.document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + domainPrefix + ";"));
        }
    };
    m.cookie = cookie;
})();