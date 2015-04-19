var $ = require("jquery");
var _ = require("hr.utils");
var View = require("hr.view");

var virtualDom = require("virtual-dom");
var html2hscript = require("html2hscript");

var VirtualView = View.Mixin(function(C) {
    return {
        initialize: function() {
            C.initialize.apply(this, arguments);

            this.vtree = null;
            this.vRootNode = null;
        },

        // Update html
        html: function(s) {
            var that = this;

            if (_.isString(s)) {
                html2hscript(s, function(err, hs) {
                    if (err) return;

                    that.hscript(hs);
                });
                return;
            }

            return C.html.call(this, s);
        },

        // Update the view using hscript
        hscript: function(newTree) {
            var h = virtualDom.h;
            if (_.isString(newTree)) newTree = eval(newTree);

            // Patch the tree
            newTree.children = this.patchVirtualTree(newTree.children);

            if (!this.vtree) {
                this.vRootNode = virtualDom.create(newTree);
                this.$el.append(this.vRootNode);
            } else {
                var patches = virtualDom.diff(this.vtree, newTree);
                this.vRootNode = virtualDom.patch(this.vRootNode, patches);
                tree = newTree;
            }

            this.vtree = newTree;
        },

        // Patch a virtual tree
        patchVirtualTree: function(tree) {
            var that = this;
            if (!that.patchVirtualElement) return tree;

            return _.map(tree, function(item) {
                var widget = that.patchVirtualElement(item);

                if (widget) return widget;
                if (item.children) item.children = that.patchVirtualTree(item.children);

                return item;
            });
        },

        // Patch a virtual element
        patchVirtualElement: null
    }
});

module.exports = VirtualView;
module.exports.CustomElementWidget = require("./widget");
