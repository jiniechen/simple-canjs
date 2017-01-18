define(["text!myFramework/ui/form/Vcode.stache"],function(tpl){
	can.Component.extend({
		tag:"vcode",
		template:can.stache(tpl),
		helpers:MF.StacheHelpers,
		viewModel:function(attrs,parentScope,el){
			var _scope = parentScope;
			while (_scope.scope){
				_scope = _scope.scope;
			};
			return {
				name:undefined,
				label:"",
				tip:"",
				src:"",
				text:"",
				scope:_scope,
				error:new can.Map({
					flag:false,
					message:undefined
				})
			};
		}
	})
})