var $ = require("jquery");
var VView = require("../");

describe('VirtualView', function() {
	var $testBody = $("<div>");
	$testBody.appendTo($("body"));

	describe('Rendering', function() {
		var V, v;

		it('should correctly create a view', function() {
			V = VView.extend({
				tagName: "p"
			});
			v = new V();
			v.appendTo($testBody);
		});

		it('can correctly be rendered as html', function() {
			v.html("<b>hello</b>");
			expect($testBody.html()).to.equal("<p><b>hello</b></p>");
		});

		it('can correctly be rendered as updated', function() {
			v.html("<b>hello 2</b>");
			expect($testBody.html()).to.equal("<p><b>hello 2</b></p>");
		});

		it('can correctly be removed', function() {
			v.remove();
			v.$el.remove();
			expect($testBody.html()).to.equal("");
		});


	});

	describe('Widget', function() {
		var V, v, TestWidget;

		it('should correctly create a view', function() {
			TestWidget =  VView.CustomElementWidget(function(elem) {
				var container = document.createElement("span");
	            container.textContent = "Hello "+elem.textContent;
	            return container;
			});
			V = VView.extend({
				patchVirtualElement: function(el) {
					if (el.tagName == "TEST") {
						return new TestWidget(el);
					}
				}
			});
			v = new V();
			v.appendTo($testBody);
		});

		it('should correctly be replaced', function() {
			v.html("This is a test, <test>World</test>");
			expect($testBody.html()).to.equal("<div>This is a test, <span>Hello World</span></div>");
		});
	});

});
