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
	window.getApp=exports.tools.App.getApp;
	window.Remote=exports.tools.App.Remote;
	window.Mask=exports.Mask;
	window.Navigator=exports.Navigator;
	window.getCurrentPage=exports.Navigator.getCurrentPage;
	window.swithPage=exports.Navigator.swithPage;
	window.runApp=exports.Navigator.runApp;
	
	// 没有自定义的onShow，则使用默认的事件
	if (!AppObject.onShow){
		AppObject.onShow = function(view) {
			//显示首页
			if (Pages.length>0)
				Pages[0].show();
			if (AppObject.onLaungh)
				AppObject.onLaungh();
		};
	};
	AppObject.laungh(AppObject.onShow);
});

