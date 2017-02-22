requirejs([ "text!myFramework/ui/ScrollView.stache"],function(tpl){
var onDataLoad = function(_self,cb){
	var _viewModel = _self.viewModel;
	var _page  = _viewModel.page;
	var pageNumber = _viewModel.pageNumber;
	var _name  =_viewModel.id||_viewModel.name||"";
    var funcName = _name.substring(0,1).toUpperCase()+_name.substring(1,_name.length);
    var count = _viewModel.attr("count");
    var updata = function(pageNumber){
    	_viewModel.attr("pageNumber",pageNumber);
		_viewModel.attr("data",_page["on"+funcName+"Click"](pageNumber));
    };
    var config = {
    	page:_page,
    	pageNumber :pageNumber,
    	viewModel :_viewModel,
    	count:count,
    	funcName:funcName,
    	updata :updata
    };
   	cb(config);
};
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
			    	_viewModel.attr("count",count);
			    	_viewModel.attr("nextClass",count > 1 ? "primary" : "gray");
			    	_viewModel.attr("data",_data);
			    };
			},
			"#prePage click" :function(){
				onDataLoad(this,function(config){
					config.pageNumber--;
				    if(config.pageNumber > 1 || config.pageNumber == 1){
					    if(config.page["on"+config.funcName+"Click"]){
							config.updata(config.pageNumber);
				    		config.viewModel.attr("preClass",config.pageNumber == 1 ? "gray" : "primary");
				    		config.viewModel.attr("nextClass",config.pageNumber == config.count ? "gray" : "primary");
					    }
				    };
				});
			},
			"#nextPage click" :function(){
				
			    onDataLoad(this,function(config){
			    	config.pageNumber++;
				    if(config.pageNumber < config.count || config.pageNumber == config.count ){
				    	if(config.page["on"+config.funcName+"Click"]){
				    		config.updata(config.pageNumber);
			    			config.viewModel.attr("nextClass",config.pageNumber == config.count ? "gray" : "primary");
			    			config.viewModel.attr("preClass","primary");
			    		}
				    };
			    })
			}
		}
	});
});
