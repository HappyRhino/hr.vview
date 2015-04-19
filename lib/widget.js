var virtualDom = require("virtual-dom");

var CustomElementWidget = function(fn) {
    var Widget = function (vnode) {
        this.currVnode = vnode;
    };
    Widget.prototype = _.extend(Widget.prototype, {
        type: "Widget",
        init: function () {
            return fn(virtualDom.create(this.currVnode));
        },
        update: function (prev, elem) {
            var prevVnode = prev.currVnode;
            var currVnode = this.currVnode;

            var patches = virtualDom.diff(prevVnode, currVnode);

            // Has changed
            if (_.size(patches) > 1) {
                return this.init();
            }
            return elem;
        }
    });

    return Widget;
};

module.exports = CustomElementWidget;