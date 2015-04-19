hr.vview [![Build Status](https://travis-ci.org/HappyRhino/hr.vview.png?branch=master)](https://travis-ci.org/HappyRhino/hr.vview)
=============================

> View using Virtual dom

## Installation

```
$ npm install hr.vview
```

## Documentation

##### Basic usages

This module provides a mixin for `hr.view` that set `view.html()` to use a virtual-dom and improve performance.

```js
var VirtualView = require("hr.vview");

var MyView = VirtualView.extend({
	defaults: {
		count: 0
	},
	initialize: function() {
		MyView.__super__.initialize.apply(this, arguments);

		this.interval = setInterval(function() {
			this.options.count++;
		}.bind(this), 500);
	},

	render: function() {
		this.html("<b>Hello</b>, the count is <span>"+this.options.count+"</span>");
		return this.ready();
	},

	remove: function() {
		clearInterval(this.interval);

		return MyView.__super__.remove.apply(this, arguments);
	}
});
```

It can also be used with template mixin:

```js
var MyView = VirtualView
	.inherit(View.Template)
	.extend({
		template: "..."
	});
```

##### Custom element

Custom dynamic element can be used by patching the virtual tree:

```js
var OtherViewWidget = VirtualView.CustomElementWidget(function() {
	myView = new OtherView();
	myView.update();
	return myView.$el;
});

var MyView = VirtualView.extend({
	render: function() {
		this.html("This is <my-widget></my-widget>");
		return this.ready();
	},

	// Patch the vitual tree to replace <my-widget></my-widget>
	patchVirtualElement: function(el) {
		if (el.tagName == "MY-WIDGET") {
			return new OtherViewWidget(el);
		}
	}
});
```
