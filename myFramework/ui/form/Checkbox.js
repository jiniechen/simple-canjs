define(["text!myFramework/ui/form/Checkbox.stache"],function(tpl){
	can.Component.extend({
		tag:"checkbox",
		template:can.stache(tpl),
		helpers:MF.StacheHelpers,
		viewModel:function(attrs,parentScope,el){
			var _scope = parentScope;
			var group = attrs.group;
			while (_scope.scope){
				_scope = _scope.scope;
			};
			return {
				name:undefined,
				options:_scope.attr("page")[group],
				label:"",
				value:"",
				scope:_scope,
				error:new can.Map({
					flag:false,
					message:undefined
				})
			};
		}
	})
})