requirejs(["text!myFramework/ui/TabBar.stache"],function(tpl){
	can.Component.extend({
		tag:"tabbar",
		template:can.stache(tpl),
		events:{
			"nav a click":function(el){
				MF.Navigator.to(el.attr("data-url"));
			}
		}
	});
});