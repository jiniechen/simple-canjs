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
			"inserted" : function(el, ev){
				var _dialog=$(el);
				var _dom=$(el).children().detach();
				_dom.insertAfter(_dialog);
				$("#_closeBtn_").click(function(ev){
					ev.preventDefault();
					var _closeBtn=$(ev.target).prev();
					_closeBtn.parent().prev().viewModel().page.hide();
					ev.stopPropagation();
				});
			}
		}
	});
});
