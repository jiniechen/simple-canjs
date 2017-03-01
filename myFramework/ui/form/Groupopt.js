requirejs(["text!myFramework/ui/form/Groupopt.stache","myFramework/ui/WidgetFactory"],function(tpl,widgetFactory){
	widgetFactory.widget("groupopt",tpl)
	.config(function(config){
	})
	.events(function(events){
		events.inserted=function(el, ev) {
			var instance = mobiscroll.select(el.find("select"),{
        		theme: 'mobiscroll',  
		        lang: 'zh',           
		        display: 'bottom',
		        dateFormat:"yy-mm-dd ",
			    group: true,  
		        
        	});
		    el.viewModel().mobi = instance;      	
	    }
	})
	.build()
	.plugin(function(_widget){
		_widget.align=function(value){
			this.vm.attr("align",value== undefined?"left":(value == "right" ? "flex-end" :"center"));
		};
	});
});
