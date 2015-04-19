var $ = require("jquery");
var VView = require("../");

describe('VirtualView', function() {
	var $testBody = $("<div>");
	$testBody.appendTo($("body"));

	describe('Rendering', function() {
		var V = VView.extend({});
		var v = new V();
		v.appendTo($testBody);

		it('can correctly be rendered as html', function() {
			v.html("<b>hello</b>");
			expect($testBody.html()).to.equal("<div><b>hello</b></div>");
		});

		it('can correctly be rendered as updated', function() {
			v.html("<b>hello 2</b>");
			expect($testBody.html()).to.equal("<div><b>hello 2</b></div>");
		});

	});

});
