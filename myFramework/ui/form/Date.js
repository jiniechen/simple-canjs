requirejs(["text!myFramework/ui/form/Date.stache","myFramework/utils/StacheHelpers"],function(tpl,stacheHelpers){
	can.Component.extend({
		tag:"date",
		template:can.stache(tpl),
		helpers:stacheHelpers,
		viewModel:function(attrs,parentScope,el){
			//获取page对象的viewModel,组合组件从上层组件获取root,顶层组件的parentScope为root
			var _root=parentScope.attr("root")==undefined?parentScope:parentScope.attr("root");
			//获取页面对象
			var _page=_root.attr("page");
			//组件可以通过属性data重设数据值对象
			var _contextName=attrs.context||"";
			var _data=can.getObject(_contextName,parentScope.attr("data")||_root.attr("data"));
			return {
				id:el.getAttribute("id"),
				contextName:_contextName,
				name:undefined,
				label:"",
				tip:"",
				page:_page,
				data:_data,
				root:_root,
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
			  	
			    if(stratDate.indexOf(":") != -1||endDate.indexOf(":") != -1){

			    	var instance = mobiscroll.datetime(el.find(".date"), config);

			    }else{

			    	var instance = mobiscroll.date(el.find(".date"), config);

			    }
	        	
	        }
	    }
	})
})