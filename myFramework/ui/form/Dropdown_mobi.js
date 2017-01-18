define(["text!myFramework/ui/form/Dropdown_mobi.stache"],function(tpl){
	can.Component.extend({
		tag:"dropdown-mobi",
		template:can.stache(tpl),
		helpers:MF.StacheHelpers,
		viewModel:function(attrs,parentScope,el){

			
			
			var group =  attrs.group;
				

			var _scope=parentScope;

			while (_scope.scope){
				_scope =_scope.scope;
			};
			
			return {
				name:undefined,
				mobi:undefined,
				options:_scope.attr("page")[group],
				key:"",
				value:"",
				scope:_scope,
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
			        dateFormat:"yy-mm-dd "
			        
	        	});
				
			    el.viewModel().mobi = instance;

			   
	        	
	        }
	    }
		
		
	});
});