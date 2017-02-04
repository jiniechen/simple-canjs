requirejs([ "text!myFramework/ui/ScrollViewItem.stache" ], function(tpl) {
	can.Component.extend({
		tag : "scrollviewitem",
		template : can.stache(tpl),
		viewModel : {
			id:undefined,
			contextName : undefined,
			data : undefined
		}
	});
});