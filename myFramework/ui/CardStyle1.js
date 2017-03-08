requirejs(["text!myFramework/ui/CardStyle2.stache","myFramework/ui/WidgetFactory"],function(tpl,widgetFactory){
	widgetFactory.widget("cardstyle2",tpl)
	.config(function(config){
		config.extendVM=function(vm,attrs,parentScope,el){
			vm.title="";
			vm.img="";
			vm.time="";
			vm.content="";
		}
	})
	.build()
	.plugin(function(_widget){
	});
});