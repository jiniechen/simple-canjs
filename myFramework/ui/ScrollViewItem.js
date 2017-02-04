requirejs([ "text!myFramework/ui/ScrollViewItem.stache" ], function(tpl) {
	can.Component.extend({
		tag : "scrollviewitem",
		template : can.stache(tpl),
		viewModel : function(attrs,parentScope,el){
			return {
				id:el.getAttribute("id"),
				contextName : undefined,
				data : undefined
			}
		}
	});
});