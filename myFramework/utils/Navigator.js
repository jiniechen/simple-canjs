define([], function() {
	var _pages = [];

	function getPages() {
		return _pages;
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
		MF.Mask.show();
		var _newPage = getPage(name);
		if (!_newPage.dialog) {
			if (_p)
				_p.hide();
		}
		;
		if (_newPage) {
			_newPage.show();
		};
		MF.Mask.hide();
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

	return {
		getPages : getPages,
		getPage : getPage,
		getCurrentPage : getCurrentPage,
		to : navigateTo,
		redirect : redirectTo
	};
});