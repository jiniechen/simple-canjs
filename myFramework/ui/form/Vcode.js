requirejs(["text!myFramework/ui/form/Vcode.stache","myFramework/ui/WidgetFactory"],function(tpl,widgetFactory){
	widgetFactory.widget("vcode",tpl)
	.config(function(config){
		
	})
	.build()
	.plugin(function(el){
		var vm=$(el).viewModel();
	
		return {
			vm:vm,
			align:function(value){
				vm.attr("align",
					value== undefined?"left":(value == "right" ? "flex-end" :"center"));
			}
		};
	});
});