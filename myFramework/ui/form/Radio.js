define(["text!myFramework/ui/form/Radio.stache"],function(tpl){
	can.Component.extend({
		tag:"radio",
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