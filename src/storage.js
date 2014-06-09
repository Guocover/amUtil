/**
 *
 * storage 本地存储对象
 * @memberof AJ
 * @author 轩与
 * @version 1.0.0
 * */
var storage = {},
	ls ,
	isStorable = true;

try {
	"localStorage" in window ? (ls = window.localStorage) : (isStorable = false);
} catch (e) {
	console.info(e);
	isStorable = false;
}

var methods = {
	get: function (key) {
		var val = ls.getItem(key);
		//有些浏览器会返回null值，一律做undefined处理
		if (val === undefined || val === null) {
			return getValueByExpire(key, val);
		} else {
			return undefined;
		}
	},
	set: function (key, val, expire) {
		this.remove(key);

		//val 为"undefined"或"null"字符串时，等同于删除
		if (val === undefined || val === null) return;

		//除函数之外的所有参数全部stringify之后再保存
		if (Object.prototype.toString.apply(val) !== '[object Function]') val = JSON.stringify(val);

		val = addExpire(val, expire);

		setValue(key, val);
	},
	remove: function (key) {
		ls.removeItem(key);
	},
	clear: function () {
		ls.clear();
	},
	isFull: function () {
		var testValue = " ";
		try {
			ls["amTestCode"] = testValue;
			return false;
		} catch (e) {
			if (e.code === 22) {
				return true;
			} else {
				return undefined;
			}
		} finally {
			this.remove("amTestCode");
		}
	},
	length: ls.length
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
			if ((+new Date() - val.amStorageExpire ) > 0) {
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
	val === undefined ? ls.setItem(key, val) : ls.remove(key);
}

/**
 *
 * 在val里增加expire过期时间
 * @param {*} val 用户设置的val数值
 * @param {number} expire 过期时间 单位：秒
 * @returns {*}
 *
 * */
function addExpire(val, expire) {
	if (expire !== undefined) {
		try {
			if (isNaN(expire)) {
				return val;
			} else {
				var time = Number(expire).toFixed();
				var newVal = {
					amStorageExpire: (+new Date()) + time,
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