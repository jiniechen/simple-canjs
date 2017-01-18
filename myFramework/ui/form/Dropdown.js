define(["text!myFramework/ui/form/Dropdown.stache"],function(tpl){
	can.Component.extend({
		tag:"dropdown",
		template:can.stache(tpl),
		helpers:MF.StacheHelpers,
		viewModel:function(attrs,parentScope,el){

			
			
			var group =  attrs.group;
				

			var _scope=parentScope;

			while (_scope.scope){
				_scope =_scope.scope;
			};
			
			return {
				name:undefined,
				options:_scope.attr("page")[group],
				key:"",
				value:"",
				scope:_scope,
				error:new can.Map({
					flag:false,
					message:undefined
				})
			}
		}
		
		
	});
});