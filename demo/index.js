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
	window.switchPage=exports.Navigator.switchPage;
	window.runApp=exports.Navigator.runApp;
	window._Page=exports.tools.Page;
	window.showPage=exports.Navigator.showPage;
	window.swithPage=exports.Navigator.swithPage;
	
	// 没有自定义的onShow，则使用默认的事件
	if (!AppObject.onShow){
		AppObject.onShow = function(view) {
			alert("空接口App.onShow，App没有进行初始化");
		};
	};
	AppObject.laungh(AppObject.onShow);
});

