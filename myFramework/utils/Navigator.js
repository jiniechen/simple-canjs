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
		if(_newPage==undefined){
			Mask.show();
			showPage(name,true,function(_page){
				if (!_page.dialog)
					if (_p)
						_p.hide();
				Mask.hide();
			});
		}else{
			Mask.show();
			if (!_newPage.dialog) {
				if (_p)
					_p.hide();
			};
			_newPage.show();
			Mask.hide();
		}
	};

	function getCurrentPage() {
		var $p = $("#page");
		var _name = $p.attr("data-page");
		if (_name)
			return can.data($p,"pageObject");//getPage(_name);
		else
			return undefined;
	}

	function redirectTo(url) {
		location.href = url;
	}
	
	var endWith=function(text,str){
		var pos=text.indexOf(str);
		if (pos>=0){
			return text.length==pos+str.length;
		}
		return false;
	}
	
	function showPage(__page,_stored,callback){
		if (getPage(__page)){
			getPage(__page).show();
		}
		var _isStache=endWith(__page,".stache");
		var page=__page;
		if (_isStache)
			page=__page.substring(0,__page.length-7);
		else
			if (endWith(page,".html"))
				page=page.substring(0,page.length-5);
			else if (endWith(page,".htm"))
				page=page.substring(0,page.length-4);
		var pageDeferred=can.ajax({
			url:__page,
			type : "GET",
			dataType : "text/plain"
		});
		var jsDeferred=can.ajax({
			url:page+".js",
			type : "GET",
			dataType : "text/plain"
		});
		can.when(pageDeferred,jsDeferred).then(function(text,js){
			var _pageFunc=new Function("Page",js);
			var _page;
			_pageFunc(function(options){
				_page=_Page(options);
			});
			_page.name=__page;
			if (_isStache)
				_page.setStache(text);
			else 
				_page.setHtml(text);
			if (_stored)
				Pages.push(_page);
			_page.show();
			if (callback)
				callback(_page);
		},function(){
			alert("加载远程页面失败");
		});
	};

	
	exports.Navigator.getPages=getPages,
	exports.Navigator.getPage = getPage,
	exports.Navigator.getCurrentPage = getCurrentPage,
	exports.Navigator.switchPage = navigateTo,
	exports.Navigator.runApp = redirectTo
	exports.Navigator.showPage = showPage
	
	
	return exports.Navigator;
});