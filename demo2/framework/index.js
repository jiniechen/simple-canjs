requirejs.config({
	// baseUrl : ".",
	paths : {
		mzui : "../lib/mzui.min",
		canjs : "../lib/can.zepto.min",
		canjsStache : "../lib/can.stache",
		canjsValidation:"../lib/can.map.validations",
		mobiscroll: "../lib/mobiscroll.custom-3.0.0-beta6.min",
		myFramework : "../myFramework",
		text : "../requirejs/text",// 文本加载器
		app : "../myFramework/loader/AppLoader", // 自定义加载器
		html : "../myFramework/loader/HtmlPageLoader" ,// 自定义加载器
		stache : "../myFramework/loader/StachePageLoader", // 自定义加载器
		boot : "../myFramework/Booter" // 自定义加载器
	},
	config : {
		text : {

		},
		app : {

		},
		html : {

		},
		stache : {

		},
		boot : {

		}
	}
});

requirejs(["boot!App","myFramework/MyExports"],function(AppObject,exports){
	//window.App=AppObject;
	window.exports=exports;
	window.Pages=exports.Pages;
	window.getPage=exports.Navigator.getPage;
	window.getApp=exports.tools.App.getApp;
	window.Remote=exports.tools.Remote;
	window.Mask=exports.Mask;
	window.Navigator=exports.Navigator;
	window.getCurrentPage=exports.Navigator.getCurrentPage;
	window.swithPage=exports.Navigator.swithPage;
	window.runApp=exports.Navigator.runApp;
	window._Page=exports.tools.Page;
	var endWith=function(text,str){
		var pos=text.indexOf(str);
		if (pos>=0){
			return text.length==pos+str.length;
		}
		return false;
	}
	window.showPage=function(__page,_stored){
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
			window._page=_page;
			_page.name=__page;
			if (_isStache)
				_page.setStache(text);
			else 
				_page.setHtml(text);
			if (_stored)
				Pages.push(_page);
			_page.show();
		},function(){
			alert("加载远程页面失败");
		});
	};
	
	$(function(){
		var _app=getApp();
		if (options)
			can.each(options,function(value,key){
				_app[key]=value;
			});
		_app.$laungh();
	});
});

