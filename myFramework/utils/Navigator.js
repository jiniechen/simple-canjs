define(["myFramework/MyExports","myFramework/ui/popup/Mask"], function(exports,Mask) {
	//var _pages = [];

	function getPages() {
		return exports.Pages;
	}

	function getPage(name) {
		var _ps = getPages();
		for (_p in _ps) {
			if (_ps[_p].name == name)
				return _ps[_p];
		}
		return undefined;
	}

	function navigateTo(name) {

		var _p = getCurrentPage();
		if (_p && _p.name == name)
			return;
		var _newPage = getPage(name);
		if(_newPage==undefined)
			return;
		Mask.show();
		if (!_newPage.dialog) {
			if (_p)
				_p.hide();
		};
		_newPage.show();
		Mask.hide();
	}
	;

	function getCurrentPage() {
		var $p = $("#page");
		var _name = $p.attr("data-page");
		if (_name)
			return getPage(_name);
		else
			return undefined;
	}

	function redirectTo(url) {
		location.href = url;
	}

	
	exports.Navigator.getPages=getPages,
	exports.Navigator.getPage = getPage,
	exports.Navigator.getCurrentPage = getCurrentPage,
	exports.Navigator.swithPage = navigateTo,
	exports.Navigator.runApp = redirectTo
	
	
	return exports.Navigator;
});