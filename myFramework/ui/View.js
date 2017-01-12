requirejs([ "text!myFramework/ui/View.stache" ], function(tpl) {
	can.Component.extend({
		tag : "view",
		template : can.stache(tpl),
		viewModel : function(attrs,parentScope,el){
			//获取模版的viewModel
			var _scope=parentScope;
			while (_scope.scope){
				_scope=_scope.scope;
			}
			return {
				title:undefined,
				scope:_scope
			}
		}
	});
});