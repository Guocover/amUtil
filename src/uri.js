/**
 *
 * uri对象
 * @author 双十
 * @version 1.0.0
 *
 * */
var uri = {
	/**
	 * 解析url，将url解析成uri对象
	 * @param {string} url url字符串
	 * @returns {object} uri对象
	 * @example
	 * AJ.uri.parse(location.href);
	 * */
	parse: function (url) {
		var a = document.createElement('a');
		a.href = url;
		var uriObj =  {
			source: url,
			protocol: a.protocol.replace(':', ''),
			host: a.hostname,
			port: a.port,
			query: a.search,
			params: parseQueryString(a.search),
			file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
			hash: a.hash.replace('#', ''),
			path: a.pathname.replace(/^([^\/])/, '/$1'),
			relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
			segments: a.pathname.replace(/^\//, '').split('/')
		};
		uriObj.prototype.toString = function(){
			uri.stringify(uriObj);
		};
		return uriObj;
	},
	/**
	 *
	 * 将uri对象转换成string对象
	 * @param {object} uri uri对象
	 * @returns {string}
	 *
	 * @example
	 * console.log(AJ.uri.stringify(uri)); // http://www.alipay.com
	 *
	 * */
	stringify: function (uri) {
		var url = "";
		url += uri.protocol + ":";
		url += uri.host + uri.port ? ":" + uri.port : "";
		url += "//"+uri.path;
		url += uri.query;
		url += "#"+uri.hash;
		return url;
	},
	/**
	 *
	 * 设置querystring的值
	 * @param {!string|object} url url字符串或者是uri对象
	 * @param {!string} key querystring的名字
	 * @param {?string} value querystring的值，如果不传，或者传undefined|null 都认为是删除
	 *
	 * @returns {string|object} 如果传入的参数是string，则返回string，否则返回uri对象
	 *
	 * */
	setQuery: function (url, key, value) {
		var uri;
		if (isString(url)) {
			uri = this.parse(url);
		} else {
			uri = url;
		}



	}
};

function parseQueryString(search) {
	var ret = {},
		seg = search.replace(/^\?/, '').split('&'),
		len = seg.length, i = 0, s;
	for (; i < len; i++) {
		if (!seg[i]) {
			continue;
		}
		s = seg[i].split('=');
		//有些queryString没有value只有key
		ret[s[0]] = s.length > 0 ? decodeURIComponent(s[1]) : "";
	}
	return ret;
}

function isString(o) {
	return type(o) == '[object String]';
}

function type(o) {
	return Object.prototype.toString.call(o);
}

module.exports = uri;