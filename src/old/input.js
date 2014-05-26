(function () {
    var m = window.m = window.m || {}
    m.input = m.input || {};

    var inputMap = {};
    var customInputFn = {
        "money": {
            formatter: function (value) {
                var dotArr = value.match(/\./g) || [];
                if (dotArr.length <= 1) {
                    this.value = value;
                }
            },
            render: undefined
        },
        "6password": {
            formatter: function (value) {
                if (value === undefined) {
                    return this.value;
                } else {
                    var length = value.toString().length;
                    if (length <= 6) {
                        this.value = value;
                    }
                }

            },
            render: function () {
                var length = (this.value + "").length;
                this.element.find('input').val(this.value).trigger('change');
                this.element.find("li").each(function () {
                    var $t = $(this);
                    if ($t.index() < length) {
                        $t.find('i').css('visibility', 'visible');
                    } else {
                        $t.find('i').css('visibility', 'hidden');
                    }
                })
            }
        }
    };

    var build = function (ele, type) {
        var id = Math.random().toString().substr(2);
        var $t = $(ele);
        inputMap[id] = new Input(id, $t, type);
        bindKeyboard(inputMap[id], type);
        return inputMap[id];
    }

    var getInput = function (id) {
        return inputMap[id];
    }

    var add = function (type, fn) {
        customInputFn[type] = fn;
    }

    var Input = function (id, $ele, type) {
        this.id = id;
        this.element = $ele;
        this.type = type;
    }

    Input.prototype.val = function (value) {
        if (value === undefined) {
            return this.value;
        } else {
            var fn = customInputFn[this.type];
            if (fn != undefined) {
                if (fn.formatter) {
                    fn.formatter.call(this, value);
                } else {
                    this.value = value;
                }
                if (fn.render) {
                    fn.render.call(this, this.value);
                } else {
                    this.element.val(this.value);
                }
            } else {
                this.value = value;
                this.element.val(this.value);
            }
        }
    }

    Input.prototype.setValue = function (value) {
        if (value === "%del%") {
            this.value = this.value.substr(0, this.value.length - 1);
            var fn = customInputFn[this.type];
            if (fn != undefined) {
                if (fn.render) {
                    fn.render.call(this, this.value);
                } else {
                    this.element.val(this.value);
                }
            } else {
                this.element.val(this.value);
            }
        }
    }

    var bindKeyboard = function (input, type) {
        input.element.attr('data-session', input.id);
        var $keyboard = m.keyboard.getElement(type);
        var $input = input.element[0].tagName.toLowerCase() == "input" ? input.element : input.element.find('input');
        if ($keyboard) {
            $input.on('focus', function (event) {
                event.preventDefault();
                this.blur();
                $(this).attr('readonly', 'readonly');
                $keyboard.attr('data-for', input.id);
                m.keyboard.show(type);
            });
            return true;
        } else {
            $input.on('keyup change', function () {
                input.value = $(this).val();
            })
            return false;
        }
    }

    m.input.build = build;
    m.input.get = getInput;
    m.input.add = add;
})();