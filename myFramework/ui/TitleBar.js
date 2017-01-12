requirejs([ "text!myFramework/ui/TitleBar.stache" ], function(tpl) {
	can.Component.extend({
		tag : "titlebar",
		template : can.stache(tpl),
		events:{
			"#menu click":function(){
				var _menu=getApp().menu;
				if (_menu.list)
					if (_menu.list.length>0)
						MF.Menu.show(_menu);
			},
			"#back click":function(){
				var _back=getApp().viewModel.window.backList.pop();
				var _page=MF.Navigator.getCurrentPage();
				if (_back){
					_page.backPageHide();	
					if (getApp().viewModel.window.backList.length==0)
						getApp().viewModel.window.attr("showLeftButton",false);
					_back.show();
				}
			}
		}
	});
});