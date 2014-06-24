function showRet(context) {
	clearRet(context)
	$(this).parent().find(".ret").append(AJ.date.format(new Date(),"[yyyy-MM-dd hh:mm:ss]")).append(typeof context === "object" ? JSON.stringify(context) : context).append("<br />");
}
function clearRet(context){
	$(context).parent().find(".ret").html("");
}

function createUnitLayout() {
	testUnits.forEach(function (unit, index) {
		$("#tests").append(paresTpl(testUnits[index], index));
	});

}

function paresTpl(data, count) {
//        var id = "testId_" + 1000 + parseInt(Math.random() * 8999);
	var tpl = $(".tpl").clone(true).removeClass("tpl").show().html();
	for (var name in data) {
		if (name === "command") {
			tpl = tpl.replace("$$" + name, "testUnits[" + count + "].command(this)");
		} else {
			tpl = tpl.replace("$$" + name, typeof data[name] === "function" ? data[name]() : data[name]);
		}
	}
	return tpl;
}