define(["text!myFramework/ui/form/Groupopt.stache"],function(tpl){
	can.Component.extend({
		tag:"groupopt",
		template:can.stache(tpl),
		helpers:MF.StacheHelpers,
		viewModel:function(attrs,parentScope,el){
			var group = attrs.group;
			//获取page对象的viewModel,组合组件从上层组件获取root,顶层组件的parentScope为root
			var _root=parentScope.attr("root")==undefined?parentScope:parentScope.attr("root");
			//获取页面对象
			var _page=_root.attr("page");
			//组件可以通过属性data重设数据值对象
			var _contextName=attrs.context||"";
			var _data=can.getObject(_contextName,parentScope.attr("data")||_root.attr("data"));
			return {
				id:undefined,
				contextName:_contextName,
				name:undefined,
				//mobi:undefined,
				options:_page[group],
				//value:"",
				label:"",
				//opt:newopt,
				key:"",
				page:_page,
				data:_data,
				root:_root,
				error:new can.Map({
					flag:false,
					message:undefined
				})
			}
		},
		events: {

	        inserted: function(el, ev) {
	    				  	
	        	
	       		

			    var instance = mobiscroll.select(el.find("select"),{

	        		theme: 'mobiscroll',  
			        lang: 'zh',           
			        display: 'bottom',
			        dateFormat:"yy-mm-dd ",
			        //label: 'City',  
				    group: true,  
				    //groupLabel: 'Country'
			        
	        	});
				
			    //el.viewModel().mobi = instance;

			   
	        	
	        }
	    }
		
		
	});
});