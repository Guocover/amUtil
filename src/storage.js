/**
 *
 * storage 本地存储
 * @memberof AJ
 * @author 轩与
 * @version 1.0.0
 * */
var storage = {},
	ls,
	isStorable = true,
	methods,
	expiredListTableKey = "aj.storage.expiredList";

// storage接口定义
methods = {
	/**
	 *
	 * 获取储存内容
	 * @param {string} key 存储内容的key值
	 * @returns {string|undefined} 返回值为undefined没找到该内容
	 *
	 * @example
	 * var content = AJ.storage.get("name");
	 *
	 * */
	get: function (key) {
		var val = ls.getItem(key);
		//safari返回null,chrome返回undefined，一律做undefined处理
		return val === undefined || val === null ? undefined : getValueByExpire(key, val);
	},
	/**
	 * 设置储存内容
	 * @param {string} key 存储的key值，区分大小写
	 * @param {*} val 设置的存储数值
	 * @param {?number|date} expire 过期时间,如果是date类型，则是过期日期，如果是number则是过几秒后过期 单位：秒
	 *
	 * @returns {undefined|object} 成功返回undefined，不成功，返回一个异常对象
	 *
	 * */
	set: function (key, val, expire) {
		//fix iphone/ipad bug
		this.remove(key);

		expire && addExpire(key, expire);

		return setValue(key, val);
	},
	/**
	 * 删除存储值
	 * @param {string} key 储存的键值
	 *
	 * */
	remove: function (key) {
		deleteExpiredDate(key);
		ls.removeItem(key);
	},
	/**
	 * 清空所有键值
	 *
	 * */
	clear: function () {
		ls.clear();
	},
	/**
	 *
	 * 获取过期日期
	 * @param {string} key 键值
	 * @returns {undefined|date} 如果该key不存在或者没有日期，则返回undefined,否则返回date对象
	 *
	 * */
	getExpiredDate: function (key) {
		if (!ls.getItem(key)) {
			return undefined;
		} else {
			return getExpiredDate(key);
		}
	}
};

/**
 *
 * storage模块初始化
 *
 * */
function init() {
	if ("localStorage" in window) {
		try {
			ls = window.localStorage;
			if (ls !== null) {
				ls.setItem("aj.storage.test.key", "");
				isStorable = true;
				ls.removeItem("aj.storage.test.key");
			} else {
				isStorable = false;
			}
		} catch (e) {
			console.info(e);
			// safari private browser mode
			if (e.code == 22 && ls.length === 0) {
				isStorable = false;
			}
		}
	} else {
		isStorable = false;
	}
}

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
	if (isExpired(key)) {
		ls.removeItem(key);
		return undefined
	} else {
		return storageValue;
	}
}

/**
 *
 * 设置storage的内部实现方法
 * @param {string} key 存储的key值
 * @param {*} val 存储的value值
 * @returns {undefined|object}  如果设置成功，返回undefined,否则是个异常对象
 *
 * */
function setValue(key, val) {
	try {
		Object.prototype.toString.apply(val) === '[object Object]' && (val = JSON.stringify(val));
		ls.setItem(key, val);
		return undefined;
	} catch (e) {
		if (e.code == 22) {
			console.log("storage已满，无法在储存新的数据");
		} else {
			console.error(e);
		}
		return e;
	}
}

/**
 *
 * 在过期索引表中增加此key的设置
 * @param {*} key 用户设置的key数值
 * @param {number|Date} expire 过期时间 单位：秒
 *
 * */
function addExpire(key, expire) {
	if (expire !== undefined) {
		try {
			var indexTable = ls.getItem(expiredListTableKey);
			indexTable = indexTable ? JSON.parse(indexTable) : {};

			expire = Object.prototype.toString.apply(expire) === '[object Date]' ? expire.getTime() : ((+new Date()) + expire * 1000);

			indexTable[key] = expire;

			ls.setItem(expiredListTableKey, JSON.stringify(indexTable));
		} catch (e) {
			console.warn(e);
		}
	}
}

/**
 *
 * 判断是否过期，从index表中查找
 * @param {string} key 储存键值
 * @returns {boolean}
 * */
function isExpired(key) {
	var indexTable = ls.getItem(expiredListTableKey);
	if (!indexTable) return false;

	indexTable = JSON.parse(indexTable);
	for (var indexKey in indexTable) {
		if (indexKey == key) {
			var expired = Number(indexTable[indexKey]) - (+new Date()) < 0;
			expired && deleteExpiredDate(key);
			return expired;
		}
	}
	return false;
}

/**
 *
 * 获取过期日期
 * @param {string} key 储存键值
 * @returns {undefined|Date} 未查询到日期则返回undefined,否则为Date日期对象
 * */
function getExpiredDate(key) {
	var indexTable = ls.getItem(expiredListTableKey);
	if (!indexTable) return undefined;

	indexTable = JSON.parse(indexTable);
	for (var indexKey in indexTable) {
		if (indexKey == key) {
			//查询下如果key值在storage已经不存在，则删除此键值，并且返回undefined
			if (!ls.getItem(key)) {
				deleteExpiredDate(key);
				return undefined;
			} else {
				return new Date(indexTable[key]);
			}

		}
	}
	return undefined;
}

/**
 *
 * 删除过期日期索引表中的key
 * @param {!string} key 储存键值
 *
 * */
function deleteExpiredDate(key) {
	var indexTable = ls.getItem(expiredListTableKey);
	if (!indexTable) return;

	indexTable = JSON.parse(indexTable);
	delete indexTable[key];

	ls.setItem(expiredListTableKey, JSON.stringify(indexTable));
}

init();
addMethod(methods);

///**
// *
// * 计算剩余的空间
// *
// * */
//function calculateCapacity(count) {
////	var testLength = [];
////	testLength[5000000] = 0;
////	var start = +new Date();
////	var testVal = testLength.join();
////	console.log("elapsedTime:", +new Date() - start);
////	var testVal1 = testVal.slice(5000000);
////
////	console.log(testVal1.length);
//	var testLength = [];
//	testLength[2500000] = 0;
//
//	var trySet = function (val) {
//		var isSetSuccess = false;
//
//		var start = +new Date();
//		var tryVal = testLength.join();
//		console.log("elapsedTime:", +new Date() - start);
//		try {
//			window.localStorage.setItem("am.tk", tryVal);
//			isSetSuccess = true;
//		} catch (e) {
//			console.info(e);
//			if (e.code == 22) {
//				isSetSuccess = false;
//			} else {
//				isSetSuccess = undefined;
//			}
//		} finally {
//			window.localStorage.removeItem("am.tk");
//		}
//
//		return isSetSuccess;
//	};
//	var min = 0 , max = 2500000, current = parseInt((max - min) / 2), ret;
//	for (var i = 0; i < count; i++) {
////		console.log(current);
//		ret = trySet(current);
//		if (ret === false) {
//			max = current;
//		} else {
//			min = current;
//		}
//		current = min + parseInt((max - min) / 2);
//	}
//	console.log(current);
//}
//window.calculateCapacity = calculateCapacity;

module.exports = storage;