$(document).ready(function () {
    // body...
    (function () {
        var AMJ = window.AMJ || {};
        AMJ.Dialog = {
            dialog: function (options, cb) {
                // if showing
                var confirm = $(".am-dialog");
                if (confirm[0]) {
                    return;
                }
                function init() {
                    // lost focus
                    $.each($("input,textarea"), function () {
                        $(this).blur();
                    });
                    $("input").attr("disabled", "disabled");
                    $('textarea').attr("disabled", "disabled");

                    // deal with options
                    options.title = options.title || "提示";
                    options.text = options.text;
                    options.ok = options.ok || "确定";
                    options.cancel = options.cancel || typeof(options.cancel) == "string" ? "取消" : null;
                    options.no = options.no || typeof(options.no) == "string" ? "否" : null;
                    cb = cb || function (argument) {
                        //do nothing
                    };
                }

                function domInit() {
                    // dialog dom
                    var title = "<div class='am-dialog-header'><h3>" + options.title + "</h3></div>";
                    var text = "<div class='am-dialog-body'><p class='am-dialog-brief'>" + options.text + "</p></div>";

                    // button dom
                    var btn_cancel = !!options.cancel ? ("<div class='am-flexbox-item'><button class='am-button am-button-white am-btn-cancel'>" + options.cancel + "</button></div>") : "";
                    var btn_no = !!options.no ? ("<div class='am-flexbox-item'><button class='am-btn-no am-button am-button-white'>" + options.no + "</button></div>") : "";
                    var btn_ok = ("<div class='am-flexbox-item'><button class='am-btn-ok am-button am-button-blue'>" + options.ok + "</button></div>");
                    var buttons = '<div class="am-dialog-footer"><div class="am-flexbox">' + btn_cancel + btn_no + btn_ok + '</div></div>'

                    var dialog = "<div class='am-dialog'>" + title + text + buttons + "</div>";
                    var layer = '<div class="am-dialog-layer">' + dialog + '<div class="am-dialog-blacklayer"></div><div class="am-dialog-touchthrough"></div></div>';

                    // append dom &　basic css
                    $("body").append(layer);
                    confirm = $(".am-dialog");
                    layer = $('.am-dialog-layer');

                    layer.css({
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        left: 0
                    });
                    layer.find('.am-dialog-blacklayer').css({
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.8)",
                        "z-index": 100
                    });
                    // 防止穿透层
                    layer.find('.am-dialog-touchthrough').css({
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        background: "transparent",
                        "pointer-events": "none",
                        "z-index": "10"
                    });

                    // position
                    confirm.css({
                        position: "absolute",
                        "top": "50%",
                        "left": "50%",
                        "z-index": 9999
                    });

                    var confirmWidth = confirm.offset().width / 2;
                    var confirmHeight = confirm.height() / 2;
                    confirm.css({
                        "margin-top": -(confirmHeight) + "px",
                        "margin-left": -(confirmWidth) + "px"
                    });
                    return layer;
                }

                // remove disable
                function removeAttr() {
                    $("input").removeAttr("disabled");
                    $('textarea').removeAttr("disabled");
                }

                init();
                var layer = domInit();

                // button callback
                $('.am-btn-ok', layer).on('click', function (e) {
                    cb("ok");
                    layer.remove();
                    removeAttr();
                });
                $('.am-btn-cancel', layer).on('click', function (e) {
                    cb("cancel");
                    layer.remove();
                    removeAttr();
                });
                $('.am-btn-no', layer).on('click', function (e) {
                    cb('no');
                    layer.remove();
                    removeAttr();
                })
            },
            alert: function () {
                var options = {};
                var cb = null;

                for (var i = arguments.length - 1; i >= 0; i--) {
                    if (typeof(arguments[i]) == 'function') {
                        cb = arguments[i];
                    } else if (!options.text) {
                        options.text = arguments[i];
                    } else {
                        options.title = arguments[i];
                    }
                }
                this.dialog(options, cb);
            },
            confirm: function () {
                var options = {
                    ok: "",
                    cancel: ""
                };
                var cb = null;

                for (var i = arguments.length - 1; i >= 0; i--) {
                    if (typeof(arguments[i]) == 'function') {
                        cb = arguments[i];
                    } else if (!options.text) {
                        options.text = arguments[i];
                    } else {
                        options.title = arguments[i];
                    }
                }
                this.dialog(options, cb);

            },
            info: function () {
                var options = {
                    ok: "",
                    cancel: "",
                    no: ""
                };
                var cb = null;

                for (var i = arguments.length - 1; i >= 0; i--) {
                    if (typeof(arguments[i]) == 'function') {
                        cb = arguments[i];
                    } else if (!options.text) {
                        options.text = arguments[i];
                    } else {
                        options.title = arguments[i];
                    }
                }
                this.dialog(options, cb);
            }
        };

        AMJ.init = function () {
            window.AMJ = AMJ;
            console.log("load AMJ");
        };

        AMJ.init();

    })();

});