requirejs([ "text!myFramework/ui/TitleBar.stache" ], function(tpl) {
	can.Component.extend({
		tag : "titlebar",
		template : can.stache(tpl),
		viewModel:function(attrs,parentScope,el){
			var _scope=parentScope;
			var	fixed = attrs.fixed == "false" ? "dock":"affix";
			while (_scope.scope){
				_scope=_scope.scope;
			};
			return {
				position:fixed,
				scope:_scope
			}
		},
		events:{
			"#menu click":function(){
				var _menu=getApp().menu;
				if (can.isFunction(_menu)){
					MF.Menu.show(_menu());
				}else
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