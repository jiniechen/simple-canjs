define(["text!myFramework/ui/Dialog.stache"],function(tpl){
	can.Component.extend({
		tag:"dialog",
		template:can.stache(tpl),
		viewModel:function(attrs,parentScope,el){
			var _scope=parentScope;
			while (_scope.scope){
				_scope=_scope.scope;
			};
			return {page:_scope.attr("page")};
		},
		events:{
			"#_closeBtn_ click":function(ev){
				this.viewModel.attr("page").hide();
			},
			"inserted" : function(el, ev){
				//chrome存在bug
				$(el).css("display","inline-block");
			}
		}
	});
});