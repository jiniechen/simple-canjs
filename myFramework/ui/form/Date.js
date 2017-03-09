requirejs(["text!myFramework/ui/form/Date.stache","myFramework/ui/WidgetFactory"],function(tpl,widgetFactory){
	widgetFactory.widget("date",tpl)
	.config(function(config){
	})
	.events(function(events){
		events.inserted=function(el, ev) {
			var type = this.viewModel.datetime
			type = type == "true" ? "datetime" : "date";
    		//获取标签上的起止时间
        	var stratDate = this.viewModel.start.trim(),
       		endDate = this.viewModel.end.trim();
        	//控件初始化时间
        	var now = new Date(),
		    minDate = new Date(stratDate),
		    maxDate = new Date(endDate);
		  	//控件初始化参数
		  	var config = {
		  		theme: 'mobiscroll',  
		        lang: 'zh',           
		        display: 'bottom',
		        dateFormat:"yy-mm-dd ",       
		        min: minDate,        
		        max: maxDate 
		  	}
		 	var instance = mobiscroll[type](el.find(".date"), config);
        }
	})
	.build(function(vm){
		vm.start="";
		vm.end="";
		
	})
	.plugin(function(_widget){
		_widget.align=function(value){
			this.vm.attr("align",value== undefined?"left":(value == "right" ? "flex-end" :"center"));
		};
	});
});