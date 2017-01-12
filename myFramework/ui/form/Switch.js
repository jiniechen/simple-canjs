define(["text!myFramework/ui/form/Switch.stache"],function(tpl){
	can.Component.extend({
		tag:"switch",
		template:can.stache(tpl),
		helpers:MF.StacheHelpers,
		viewModel:function(attrs,parentScope,el){
			var _scope=parentScope;
			while (_scope.scope){
				_scope=_scope.scope;
			};
			return {
				name:undefined,
				label:"",
				scope:_scope,
				error:new can.Map({
					flag:false,
					message:undefined
				})
			}
		}
	});
});