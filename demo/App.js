App({
	showMe : function() {
		alert("show me");
	},
	onLaungh : function() {
		
	},
	onShow:function(){
		tabBar.addTab("page1/index.stache","导航1");
		tabBar.addTab("page2/index.stache","导航2");
		tabBar.addTab("page2/test.stache","导航3");
		
		titleBar.viewModel().attr("title","xx");
		titleBar.addMenu("设置回退按钮","icon-home",function(){
			titleBar.showLeftButton(true);
		});
		titleBar.addMenu("内容2","icon-home",function(){
			Navigator.getPage("page1/index.stache").data.attr("field1","2323");
			//data1.attr("sss","sdfdfs");
		});
		titleBar.addMenu("跳转到 POC","icon-home",function(){
			Navigator.runApp("../poc/index.html");
		});
		titleBar.addMenu("Toast","icon-home",function(){
			//getApp().showMe();
			exports.Mask.hide();
			var timer = setTimeout(function(){
				exports.Mask.toast("这是一个toast");
			},1);
			
		});
		if (Pages.length>0)
			Pages[0].show();
	}
});