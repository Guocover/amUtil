(function () {
    var m = window.m = window.m || {};
    if (!m.overlay) {
        console.error('toast组件加载失败，未加载依赖组件:overlay');
        return false;
    }
    m.toast = m.toast || {};

    var SHOWTIMEOUT = 3000;
    var STO_toast;

    var $toastTpl = $('<div id="amj-toast" class="am-toast" ' +
        'style="position: absolute;z-index: 999;background: #000;border-radius: 5px;padding:9px 20px;max-width:200px;color:#fff;font-size:16px;word-break: break-all;">' +
        '<div class="am-toast-content">' +
        '</div>' +
        '</div>');

    function getElement() {
        var $o = $('#amj-toast');
        if (!$o.length)
            $o = $toastTpl.clone().prependTo('body').hide();
        return $o;
    }

    function hide() {
        m.overlay.hide();
    }

    m.toast.getElement = getElement;
    m.toast.setElement = function (o) {
        var $o = $(o);
        $toastTpl = $o.attr('id', 'amj-toast');
        $('#amj-toast').replaceWith($o);
    }
    m.toast.show = function (msg, showTimeout, callback) {
        //先用blur隐藏键盘
        $(':focus').each(function () {
            this.blur();
        });
        var $toast = getElement();
        var $toastContent = $toast.find('div.am-toast-content').empty();

        msg && $toastContent.text(msg).show();
        var $overlay = m.overlay.getElement();
        $overlay.css('background', 'none');
        m.overlay.append($toast);
        $toast.show();
        m.overlay.show();

        var w = $toast.width(), h = $toast.height();
        $toast.css({
            'margin-left': "-" + w / 2 + "px",
            'margin-top': "-" + h / 2 + "px",
            'left': '50%',
            'top': '50%'
        });

        clearTimeout(STO_toast);
        STO_toast = setTimeout(function () {
            hide();
            callback && callback();
        }, showTimeout || SHOWTIMEOUT);
    }

    m.toast.hide = hide;
})();