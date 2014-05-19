(function () {
    var m = window.m = window.m || {}
    m.keyboard = m.keyboard || {};
    var isSupportTouch = "ontouchend" in document ? true : false;
    var vMousedown = isSupportTouch ? "touchstart" : 'mousedown',
        vMouseup = isSupportTouch ? "touchend" : 'mouseup',
        vClick = isSupportTouch ? "touchend" : 'click';

    var $keyboardTpl = $('<div id="am-keyboard" class="am-keyboard">' +
        '<div class="am-keyboard-toolbar"><button class="am-keyboard-close">完成</button></div>' +
        '</div>');
    var keyboardMap = {};
    var add = function (name, keysArr) {
        var $keyboard = $keyboardTpl.clone();
        for (var rowI in keysArr) {
            var row = keysArr[rowI];
            if (row) {
                var $row = $('<div class="am-keyboard-row"></div>');
                for (var keyI in row) {
                    var key = row[keyI];
                    var keyText = "";
                    var keyClass = "";
                    if (key === "%del%") {
                        keyText = "<i></i>";
                        keyClass = "am-keyboard-key-del"
                    }
                    else keyText = key + '';
                    var $key = $('<button class="am-keyboard-key ' + keyClass + '" data-am-key="' + key + '">' + keyText + '</button>');
                    if (key === '') {
                        $key.addClass('disabled');
                    }
                    $row.append($key);
                }
                $keyboard.append($row);
            }
        }
        initKeyEvent($keyboard);
        keyboardMap[name] = $keyboard;
        return $keyboard;
    }
    var getKeyboard = function (name) {
        return keyboardMap[name];
    }
    var locationInput = function (sessionid) {
        //todo 动画滚动效果
        var windowH = $(window).height();
        var keyboardH = $('#am-keyboard').height();
        var input = m.input.get(sessionid);
        var $input = input.element;
        var viewH = windowH - keyboardH - $input.height();
        var $inputOffset = $input.offset();
        window.scrollTo(0, ($inputOffset.top - viewH / 2));
    }

    var show = function (name) {
        hide();
        var $keyboard = getKeyboard(name), $b = $('body');
        $b.append($keyboard).height($b.height() + $keyboard.height());
        var id = $keyboard.attr('data-for');
        locationInput(id);
        $b.on(vMouseup + ".keyboard", function (event) {
            var $t = $(event.target);
            var isKeyboard = !!$t.parents('#am-keyboard').length, isInput = !!$t.attr('data-session'), isPrtInput = !!$t.parents('[data-session]').length;
            if (!(isKeyboard || isInput || isPrtInput)) {
                hide();
            }
        });
    }

    var hide = function () {
        $('body').off(vMouseup + ".keyboard");
        var $keyboard = $('#am-keyboard');
        var id = $keyboard.attr('data-for');
        var input = m.input.get(id);
        if (input) {
            //todo 优化代码
            input.element.removeAttr('readonly');
            input.element.find('[readonly="readonly"]').removeAttr('readonly');
        }
        $('body').height($('body').height() - $keyboard.height());
        $keyboard.remove();
    }

    var initKeyEvent = function ($keyboard) {
        $keyboard.on('touchmove', function (event) {
            event.preventDefault();
            return false;
        });
        $keyboard.find('.am-keyboard-close').on('click', function () {
            hide();
        });

        $keyboard.find('.am-keyboard-key')
            .on(vMousedown, function () {
                $(this).addClass('hover');
            })
            .on(vMouseup, function () {
                $(this).removeClass('hover');
            })
        $keyboard.find('.am-keyboard-key').on(vClick, function () {
            var id = $('#am-keyboard').attr('data-for');
            var input = m.input.get(id);
            locationInput(id);
            if (input) {
                var key = $(this).attr('data-am-key');
                var val = (input.val() || "") + "";
                if (key === "%del%") {
                    input.setValue(key);
                } else {
                    input.val(val + key);
                }
            }
        });
    }

    //默认键盘
    add('money', [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        ['.', 0, '%del%']
    ]);
    add('6password', [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        ['', 0, '%del%']
    ]);

    m.keyboard.add = add;
    m.keyboard.getElement = getKeyboard;
    m.keyboard.show = show;
    m.keyboard.hide = hide;
})();