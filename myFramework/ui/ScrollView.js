requirejs([ "text!myFramework/ui/ScrollView.stache"],function(tpl){
can.Component.extend({
		tag : "scrollview",
		template : can.stache(tpl),
		viewModel : function(attrs,parentScope,el){
			//获取page对象的viewModel,组合组件从上层组件获取root,顶层组件的parentScope为root
			var _root=parentScope.attr("root")==undefined?parentScope:parentScope.attr("root");
			//获取页面对象
			var _page=_root.attr("page");
			//组件可以通过属性data重设数据值对象
			//组件可以通过属性data重设数据值对象
			var _contextName=attrs.context||"";
			var _data=can.getObject(_contextName,parentScope.attr("data")||_root.attr("data"));
			//var _parent=parentScope;
			return {
				id:el.getAttribute("id"),
				contextName:_contextName,
				name:undefined,
				pageNumber:1,
				preClass:"gray",
				nextClass:"gray",
				page:_page,
				data:_data,
				root:_root,
				_myParent:parentScope
			};
		},
		events:{
			"inserted":function(el,ev){
				var _viewModel = this.viewModel;
				var _page  = _viewModel.page;
				var pageNumber = _viewModel.pageNumber;
				var _name  =_viewModel.id||_viewModel.name||"";
			    var funcName = _name.substring(0,1).toUpperCase()+_name.substring(1,_name.length);
			    var count ;
			    var _data ;
			    if(_page["on"+funcName+"Data"]){
			    	var _ondata = _page["on"+funcName+"Data"]();
			    	can.each(_ondata,function(val,key){
			    		key == "count" ? count = val :_data = val;
			    	});
			    	_viewModel.attr("nextClass",count > 1 ? "primary" : "gray");
			    	_viewModel.attr("data",_data);
			    };
			},
			"#prePage click" :function(){
				var _viewModel = this.viewModel;
				var _page  = _viewModel.page;
				var pageNumber = _viewModel.pageNumber;
				var _name  =_viewModel.id||_viewModel.name||"";
			    var funcName = _name.substring(0,1).toUpperCase()+_name.substring(1,_name.length);
			    var count ;
			    var _data ; 
			    if(_page["on"+funcName+"Up"]){
			    	pageNumber--;
			    	var preData = _page["on"+funcName+"Up"]();
		    		can.each(preData,function(val,key){
		    			key == "count" ? count = val :_data = val;
		    		});
			    	if(pageNumber > 1 || pageNumber == 1){
			    		_viewModel.attr("pageNumber",pageNumber);
			    		_viewModel.attr("data",_data);
			    		_viewModel.attr("preClass",pageNumber == 1 ? "gray" : "primary");
			    		_viewModel.attr("nextClass",pageNumber == count ? "gray" : "primary");
			    		exports.Mask.hide();
				    }
			    };
			},
			"#nextPage click" :function(){
				var _viewModel = this.viewModel;
				var _page  = _viewModel.page;
				var pageNumber = _viewModel.pageNumber;
				var _name  =_viewModel.id||_viewModel.name||"";
			    var funcName = _name.substring(0,1).toUpperCase()+_name.substring(1,_name.length);
			    var count ;
			    var _data ; 
			    if(_page["on"+funcName+"Down"]){
		    		pageNumber++;
		    		var nextData = _page["on"+funcName+"Down"]();
		    		can.each(nextData,function(val,key){
		    			key == "count" ? count = val :_data = val;
		    		});
		    		if(pageNumber < count || pageNumber == count ){
		    			_viewModel.attr("pageNumber",pageNumber);
		    			_viewModel.attr("data",_data);
		    			_viewModel.attr("nextClass",pageNumber == count ? "gray" : "primary");
		    			_viewModel.attr("preClass","primary");
		    		}
			    };
			}
		}
	});
});
