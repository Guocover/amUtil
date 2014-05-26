(function ($) {
    $.fn.touchEventBind = function (touch_options) {
        var touchSettings = $.extend({
            tapDurationThreshold: 250,                 //触屏大于这个时间不当作tap
            scrollSupressionThreshold: 10,             //触发touchmove的敏感度
            swipeDurationThreshold: 750,               //大于这个时间不当作swipe
            horizontalDistanceThreshold: 30,            //swipe的触发垂直方向move必须小于这个距离
            verticalDistanceThreshold: 75,              //swipe的触发水平方向move必须大于这个距离
            tapHoldDurationThreshold: 750,              //swipe的触发水平方向move必须大于这个距离
            doubleTapInterval: 250                      //swipe的触发水平方向move必须大于这个距离
        }, touch_options || {})

        var touch = {}, touchTimeout , delta , longTapTimeout;

        function parentIfText(node) {
            return 'tagName' in node ? node : node.parentNode
        }

        function swipeDirection(x1, x2, y1, y2) {
            var xDelta = Math.abs(x1 - x2), yDelta = Math.abs(y1 - y2)
            return xDelta >= yDelta ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
        }


        function longTap() {
            longTapTimeout = null
            touch.el.trigger('longTap');
            touch.longTap = true;
            touch = {};
        }

        function cancelLongTap() {
            if (longTapTimeout) clearTimeout(longTapTimeout)
            longTapTimeout = null
        }


        this.data('touch_event_bind', "true");
        this.bind('touchstart',function (e) {
            touchTimeout && clearTimeout(touchTimeout);

            touch.el = $(parentIfText(e.touches[0].target));
            now = Date.now();
            delta = now - (touch.last_touch_time || now);
            touch.x1 = e.touches[0].pageX;
            touch.y1 = e.touches[0].pageY;
            touch.touch_start_time = now;
            touch.last_touch_time = now;


            if (delta > 0 && delta <= touchSettings.doubleTapInterval) touch.isDoubleTap = true;

            longTapTimeout = setTimeout(function () {

                longTap();
            }, touchSettings.tapHoldDurationThreshold);

        }).bind('touchmove',function (e) {
                cancelLongTap();

                touch.x2 = e.touches[0].pageX;
                touch.y2 = e.touches[0].pageY;

                // prevent scrolling
                if (Math.abs(touch.x1 - touch.x2) > touchSettings.scrollSupressionThreshold) {
                    e.preventDefault();
                }

                touch.touch_have_moved = true;


            }).bind('touchend',function (e) {
                cancelLongTap();

                now = Date.now();
                touch_duration = now - (touch.touch_start_time || now);


                if (touch.isDoubleTap) {
                    touch.el.trigger('doubleTap');
                    touch = {};
                }
                else if (!touch.touch_have_moved && touch_duration < touchSettings.tapDurationThreshold) {
                    touch.el.trigger('tap');

                    touchTimeout = setTimeout(function () {
                        touchTimeout = null;
                        touch.el.trigger('singleTap');
                        touch = {};
                    }, touchSettings.doubleTapInterval);
                }
                else if (touch.x1 && touch.x2) {
                    if (touch_duration < touchSettings.swipeDurationThreshold && Math.abs(touch.x1 - touch.x2) > touchSettings.verticalDistanceThreshold && Math.abs(touch.y1 - touch.y2) < touchSettings.horizontalDistanceThreshold) {
                        touch.el.trigger('swipe').trigger(touch.x1 > touch.x2 ? "swipeLeft" : "swipeRight");
                        touch = {};
                    }
                }

            }).bind('touchcancel', function (e) {

                touchTimeout && clearTimeout(touchTimeout);
                cancelLongTap();
                touch = {};
            })
    }

    $.fn.touchbind = function (m, callback, touch_options) {
        if (this.data('touch_event_bind') != "true") {
            this.touchEventBind(touch_options);
        }

        this.bind(m, callback);
    }

    ;
    ['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function (m) {
        $.fn[m] = function (touch_options, callback) {
            if (typeof(touch_options) == "object" && typeof(callback) == "function") {
                return this.touchbind(m, callback, touch_options)
            }
            else if (typeof(touch_options) == "function") {
                var callback = touch_options;
                return this.touchbind(m, callback)
            }
        }
    })
})(Zepto)