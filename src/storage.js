/**
 *
 * storage 本地存储
 * @memberof AJ
 * @author 轩与
 * @version 1.0.0
 * */
var storage = {},
	ls ,
	isStorable = true;

/**
 *
 * storage模块初始化
 *
 * */
function init() {
	try {
		"localStorage" in window ? (ls = window.localStorage) : (isStorable = false);
	} catch (e) {
		console.info(e);
		isStorable = false;
	}
}

init();

var methods = {
	/**
	 *
	 * 获取储存内容
	 * @param {string} key 存储内容的key值
	 * @returns {*} 返回值为undefined意味着没找到该储存内容
	 *
	 * @example
	 * var content = AJ.storage.get("name");
	 *
	 * */
	get: function (key) {
		var val = ls.getItem(key);
		//有些浏览器会返回null值，一律做undefined处理
		return val === undefined || val === null ? undefined : getValueByExpire(key, val);
	},
	/**
	 * 设置储存内容
	 * @param {string} key 存储的key值，区分大小写
	 * @param {*} val 设置的存储数值 传入 undefined或者null 则认为是删除
	 * @param {?number|date} expire 过期时间,如果是date类型，则是过期日期，如果是number则是过几秒后过期 单位：秒
	 *
	 * */
	set: function (key, val, expire) {
		this.remove(key);

		//val 为"undefined"或"null"字符串时，等同于删除
		if (val === undefined || val === null) return;

		expire && (val = addExpire(val, expire));

		//除函数之外的所有参数全部stringify之后再保存
		if (Object.prototype.toString.apply(val) !== '[object Function]') val = JSON.stringify(val);

		setValue(key, val);
	},
	/**
	 * 删除存储值
	 * @param {string} key 储存的键值
	 *
	 * */
	remove: function (key) {
		ls.removeItem(key);
	},
	/**
	 * 清空所有键值
	 *
	 * */
	clear: function () {
		ls.clear();
	}
};

addMethod(methods);

/**
 *
 * 为storage对象增加方法，之所以采用方法来增加对象，是为了在此对象，横切入storage的方法来判断storage的可用性，不需要为每个方法都进行处理
 * @param {object} methods storage定义的方法 json对象，key为方法名，value为具体方法实现
 *
 * */
function addMethod(methods) {
	var unSupportTip = function () {
		console.warn('抱歉，您的浏览器暂不支持localstoarage的使用! 无法使用该接口!');
	};
	for (var methodName in methods) {
		storage[methodName] = isStorable ? methods[methodName] : unSupportTip;
	}
}

/**
 *
 * 根据过期标志来获取内容
 * @param {string} key 储存的名称
 * @param {string} storageValue 存储内容
 * @returns {string|undefined} 如果键值不存在，则返回undefined
 *
 * */
function getValueByExpire(key, storageValue) {
	try {
		var val = JSON.parse(storageValue);
		if (val.amStorageExpire) {
			if ((+new Date() - Date.parse(val.amStorageExpire)) > 0) {
				ls.removeItem(key);
				return undefined;
			} else {
				return val.amStorageValue;
			}
		} else {
			return val;
		}
	} catch (e) {
		console.warn(e);
		return storageValue;
	}
}

/**
 *
 * 设置storage的内部实现方法
 * @param {string} key 存储的key值
 * @param {*} val 存储的value值，如果是undefined，则执行删除
 *
 * */
function setValue(key, val) {
	try {
		val !== undefined && val !== null ? ls.setItem(key, val) : ls.remove(key);
	} catch (e) {
		if (e.code == 22) {
			console.log("storage已满，无法在储存新的数据");
		} else {
			console.error(e);
		}
	}
}

/**
 *
 * 在val里增加expire过期时间
 * @param {*} val 用户设置的val数值
 * @param {number|date} expire 过期时间 单位：秒
 * @returns {*}
 *
 * */
function addExpire(val, expire) {
	if (expire !== undefined) {
		try {
			if (Object.prototype.toString.apply(expire) === '[object Date]') {
				var newVal = {
					amStorageExpire: expire,
					amStorageValue: val
				};
				return newVal;
			} else if (isNaN(expire)) {
				return val;
			} else {
				var time = Number(expire).toFixed();
				var newVal = {
					amStorageExpire: new Date((+new Date()) + time * 1000),
					amStorageValue: val
				};
				return newVal;
			}
		} catch (e) {
			console.warn(e);
			return val;
		}
	} else {
		return val;
	}
}

module.exports = storage;