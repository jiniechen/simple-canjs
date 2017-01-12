define(["text!myFramework/ui/form/Command.stache"],function(tpl){
	can.Component.extend({
		tag:"command",
		template:can.stache(tpl),
		helpers:MF.StacheHelpers,
		viewModel:function(attrs,parentScope,el){
			var _scope=parentScope;
			while (_scope.scope){
				_scope=_scope.scope;
			};
			return {
				name:undefined,
				size:"",
				type:"success",
				text:"",
				scope:_scope
			}
		}
	});
});