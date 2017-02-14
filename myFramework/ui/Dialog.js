requirejs(["text!myFramework/ui/Dialog.stache","myFramework/utils/Navigator"],function(tpl,Navigator){
	can.Component.extend({
		tag:"dialog",
		template:can.stache(tpl),
		viewModel:function(attrs,parentScope,el){	
			var _scope=parentScope;
			while (_scope.scope){
				_scope=_scope.scope;
			};
			var page = _scope.attr("page");
			var	closebtn = page.closeBtn == false ? "none":undefined;
			return {
				page:page,
				title:page.title,
				close :closebtn,
				height:"400px",
				width:"80%",
				top:"20%",
				left:"10%"
			};
		},
		events:{
			"#_closeBtn_ click":function(ev){
				this.viewModel.attr("page").hide();
			},
			"inserted" : function(el, ev){
				$(el).css("display","inline-block");
			}
		}
	});
});