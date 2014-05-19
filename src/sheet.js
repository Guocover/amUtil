(function () {
    var m = window.m = window.m || {};
    if (!m.overlay) {
        console.error('sheet组件加载失败，未加载依赖组件:overlay')
        return false;
    }
    m.sheet = m.sheet || {};
    var $sheetTpl = $('<div class="am-sheet" id="amj-sheet">' +
        '<div class="am-sheet-container">' +
        '<div class="am-sheet-header" style="display: none"></div>' +
        '<div class="am-sheet-content">' +
        '</div>' +
        '<div class="am-sheet-footer">' +
        '<button type="button" class="am-button am-sheet-cancel" data-tag="cancel">取消</button>' +
        '</div>' +
        '</div>' +
        '</div>');

    var $buttonTpl = $('<button type="button" class="am-button am-button-white am-sheet-button"></button>');

    function getElement() {
        var $o = $('#amj-sheet');
        if (!$o.length)
            $o = $sheetTpl.clone().prependTo('body').hide();
        return $o;
    }

    function hide() {
        m.overlay.hide();
    }

    m.sheet.getElement = getElement;
    m.sheet.setElement = function (o) {
        var $o = $(o);
        $sheetTpl = $o.attr('id', 'amj-sheet');
        $('#amj-sheet').replaceWith($o);
    }
    m.sheet.show = function (title, buttonList, callback) {
        //先用blur隐藏键盘
        $(':focus').each(function(){this.blur();});

        if (Object.prototype.toString.call(title) == "[object Array]") {
            callback = buttonList;
            buttonList = title;
            title = undefined;
        }
        var $sheet = getElement();
        var $sheetContent = $sheet.find('div.am-sheet-content').empty();
        if (title) {
            $sheet.find('div.am-sheet-header').text(title).show();
        }
        buttonList && $.each(buttonList, function (i, v) {
            var $b;
            if (typeof(v) == "string") {
                $b = $buttonTpl.clone().text(v);
            } else {
                $b = $(v);
            }
            $b.attr('data-tag', i)
                .appendTo($sheetContent)
                .on('click', function () {
                    var rtv = $.isFunction(callback) ? callback(i, $b[0]) : null;
                    if (rtv != false) {
                        hide();
                    }
                });
        });

        $sheet.find('[data-tag=cancel]').on('click', function () {
            var rtv = $.isFunction(callback) ? callback('cancel', this) : null;
            if (rtv != false) {
                hide();
            }
        });
        m.overlay.append($sheet);
        $sheet.show();
        m.overlay.show();
        return $sheet;
    }

    m.sheet.hide = hide;
})();