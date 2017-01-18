define(["text!myFramework/ui/form/Date.stache"],function(tpl){
	
	can.Component.extend({
		tag:"date",
		template:can.stache(tpl),
		helpers:MF.StacheHelpers,
		viewModel:function(attrs,parentScope,el){
			var _scope = parentScope;
			while (_scope.scope){
				_scope = _scope.scope;
			};
			return {
				name:undefined,
				label:"",
				tip:"",
				scope:_scope,
				start:"",
				end:"",
				error:new can.Map({
					flag:false,
					message:undefined
				})
			};
		},
		events: {

	        inserted: function(el, ev) {
	    		
	    		//获取标签上的起止时间

	        	var stratDate = el.find(".date").attr("start").trim(),
	        		endDate = el.find(".date").attr("end").trim(); 
	        	

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
			  	
			    if(stratDate.indexOf(":") != -1||endDate.indexOf(":") != -1){

			    	var instance = mobiscroll.datetime(el.find(".date"), config);

			    }else{

			    	var instance = mobiscroll.date(el.find(".date"), config);

			    }
	        	
	        }
	    }
	})
})