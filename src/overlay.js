(function () {
    var m = window.m = window.m || {}
    m.overlay = m.overlay || {};
    var $overlayDOM = $('<div id="amj-overlay" class="amj-overlay" style="position: fixed;left: 0;right: 0;top:0;bottom:0;z-index: 9999;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.5);display: none;"></div>');

    var disableDefaultHandel = function (event) {
        event.preventDefault();
    }

    function getElement() {
        var $o = $('#amj-overlay');
        if (!$o.length)
            $o = $overlayDOM.clone().prependTo('body').hide();
        return $o;
    }

    m.overlay.getElement = getElement;
    m.overlay.setElement = function (o) {
        var $o = $(o);
        $overlayDOM = $o.attr('id', 'amj-overlay');
        $('#amj-overlay').replaceWith($o);
    }
    m.overlay.show = function () {
        var $o = getElement();
        $o.show();
        $('html').css('overflow', 'hidden')
        $(window).off('touchmove.disable scroll').on('touchmove.disable', disableDefaultHandel);
        return $o;
    }
    m.overlay.hide = function () {
        getElement().remove();
        $('html').css('overflow', 'auto');
        $(window).off('touchmove.disable scroll');
    }
    m.overlay.append = function (dom) {
        var $overlay = m.overlay.getElement();
        $overlay.empty().append(dom);
    }
})();