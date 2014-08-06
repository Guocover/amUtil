(function () {
	var MOD_NAMESPACE = "AJ";
	eval("window." + MOD_NAMESPACE + " = window." + MOD_NAMESPACE + " || {}");

	/**
	 * 模块的入口函数，主函数
	 */
	function main() {
		var mods = getMods();
		mods.forEach(function (modSrc) {
			loadMod(modSrc);
		});
	}

	/**
	 * 从html中head的头部获取模块的代码路径
	 * @returns {Array}
	 */
	function getMods() {
		var mods = [];
		var scripts = document.scripts;
		for (var i = 0; i < scripts.length; i++) {
			var script = scripts[i];
			if (script.src && script.src.indexOf(MOD_NAMESPACE + "Mod") > 0) {
				mods = script.src.substr(script.src.indexOf("?") + 1, script.src.length).split(",");
			}
		}
		return mods;
	}

	/**
	 * ajax载入mod的源代码
	 * @param {String} modSrc 模块代码路径
	 */
	function loadMod(modSrc) {
		var XMLHttpReq = new XMLHttpRequest();
		XMLHttpReq.onreadystatechange = function () {
			//如果是file文件访问，XMLHttpReq.status为0
			var isLocal = location.protocol.indexOf("file") >= 0;
			if (XMLHttpReq.readyState == 4 && ((isLocal && XMLHttpReq.status == 0) || (!isLocal && XMLHttpReq.status == 200) )) {
				transportModule(modSrc, XMLHttpReq.responseText);
			}
		};
		XMLHttpReq.open("GET", modSrc, false);
		XMLHttpReq.send();
	}

	/**
	 * 模块源代码进行模块分装转换
	 * @param {String} modSrc 模块代码路径
	 * @param {String} modSrcCode 模块源代码代码
	 */
	function transportModule(modSrc, modSrcCode) {
		transportWindowModule(modSrc, modSrcCode);
	}

	/**
	 * 将源代码进行window封装
	 * @param {String} modSrc 模块代码路径
	 * @param {String} modSrcCode 模块源代码代码
	 */
	function transportWindowModule(modSrc, modSrcCode) {
		var moduleWrapper = "(function(){$$modSrc})();";
		//将module.exports替换成全局变量
		var modName = modSrc.substr(modSrc.lastIndexOf("/") + 1, modSrc.length).replace(".js", "");
		modSrcCode = modSrcCode.replace("module.exports", "window." + MOD_NAMESPACE + "." + modName);
		var windowModuleCode = moduleWrapper.replace("$$modSrc", modSrcCode);

//		postModToServer(modName + ".windows", windowModuleCode);
//		document.write("<script type='text/javascript' src='" + "http://ux.alipay-inc.com/lib/getMod.php?modName=" + modName + ".windows" + "'></script>");

		document.write("<script type='text/javascript'>" + windowModuleCode + "</script>");

	}

	/**
	 *
	 * 将mod内容提交到服务器保存
	 * @param {string} modName 模块名称
	 * @param {string} modContent 模块js源代码
	 *
	 * */
	function postModToServer(modName, modContent) {
		var url = "http://ux.alipay-inc.com/lib/setMod.php";
		var XMLHttpReq = new XMLHttpRequest();
		XMLHttpReq.open("POST", url, false);
		XMLHttpReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		XMLHttpReq.send("modName=" + modName + "&modContent=" + encodeURIComponent(modContent));
	}

	main();
})();