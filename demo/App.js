App({
	window : {
		barTitleText : "我的首页",
		showBackButton : false,
		showMenuButton : true
	},
	tabBar : {
		list : [ {
			text : "导航1",
			page : "page1/index"
		}, {
			text : "导航2",
			page : "page2/index"
		}, {
			text : "导航3",
			page : "page2/test"
		} ]
	},
	showMe : function() {
		alert("show me");
	},
	onLaungh : function() {
		getApp().setBarTitleText("xx");
		getApp().setMenuButtonVisible(true);
	},
	menu : {
			list : [ {
				text : "设置回退按钮",
				icon : "icon-home",
				action : function(){
					getApp().setBackButtonVisible(true);
				}
			}, {
				text : "内容2",
				icon : "icon-home",
				action : function(){
					MF.Navigator.getPage("page1/index").viewModel.data.attr("field1","2323");
				}
			},
			{
				text : "跳转到 POC",
				icon : "icon-home",
				action : function(){
					MF.Navigator.redirect("../poc/index.html");
				}
			},
			{
				text : "Toast",
				icon : "icon-home",
				action : function(){
					;
				}
			}]
		},
	pages : [ "page1/index", "page2/index", "html!page2/test" ],
	imports : MF.defaultImports(["utils/Test"])
});