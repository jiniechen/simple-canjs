requirejs.config({
	// baseUrl : ".",
	paths : {
		mzui : "../lib/mzui.min",
		canjs : "../lib/can.zepto.min",
		stache : "../lib/can.stache",
		myFramework : "../myFramework",
		text : "../requirejs/text",// 文本加载器
		template : "../requirejs/loadTemplate", // 自定义加载器
		html : "../requirejs/loadHtml" // 自定义加载器
	},
	config : {
		text : {

		},
		template : {

		},
		html : {

		}
	}
});

requirejs(
		[ "mzui" ],
		function() {
			requirejs(
					[ "canjs" ],
					function() {
						requirejs(
								[ "stache", "myFramework/Engine"],
								function() {
									window._DEBUG = true;
									window.App = MF.App;
									window.getApp = MF.getApp;
									requirejs(
											[
											 		"myFramework/utils/Import",
													"myFramework/page/PageObject",
													"myFramework/utils/Template",
													"myFramework/utils/StacheHelpers",
													"myFramework/ui/popup/Mask"
											],
											function() {
												requirejs(
														[ "App" ],
														function() {
															window.Page = MF.Page;
															var app = getApp();
															// 挂载DomReady事件
															$(function() {
																// 构建page对象，然后调用页面渲染
																MF.imports(app.imports,function(){
																MF.LoadPages(
																		app.pages,
																		function() {				
																			// 没有自定义的onShow，则使用默认的事件
																			if (!app.viewModel.onShow){
																				app.viewModel.onShow = function(
																						view) {
																					var _body = $("body");
																					if (app.viewModel.window.barTitleText)
																						_body.addClass("with-heading-top");
																					if (app.viewModel.tabBar.attr("list").length > 0)
																						_body.addClass("with-nav-bottom");
																					view.appendTo($("body"));
																					//显示首页
																					if (MF.Navigator.getPages().length>0)
																						MF.Navigator.getPages()[0].show();
																					if (app.onLaungh)
																						app.onLaungh();
																				};
																			};
																			app.laungh(app.viewModel.onShow);
																		});
															});
															});
														});
											});
								});
					});
		});
