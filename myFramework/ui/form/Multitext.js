define(["text!myFramework/ui/form/Multitext.stache"],function(tpl){
	can.Component.extend({
		tag:"multitext",
		template:can.stache(tpl),
		helpers:MF.StacheHelpers,
		viewModel:function(attrs,parentScope,el){
			var _scope=parentScope;
			while (_scope.scope){
				_scope=_scope.scope;
			};
			return {
				name:undefined,
				tip:"",
				row:"",
				scope:_scope,
				error:new can.Map({
					flag:false,
					message:undefined
				})
			}
		}
	});
});