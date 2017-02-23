requirejs([ "text!myFramework/ui/ScrollView.stache"],function(tpl){
var _dataLoad = function(_self,callback){
	var _viewModel = _self.viewModel;
	var _page  = _viewModel.page;
	var _currentPage = _viewModel.currentPage;
	var _name  =_viewModel.id||_viewModel.name||"";
    var _funcName = _name.substring(0,1).toUpperCase()+_name.substring(1,_name.length);
    var _count ;
    var getResultDate = function(result){

		if(can.isDeferred(result)){
			result.then(function(success){
				getResultDate(success);
			},function(reason){
				_self.viewModel.attr("mask",false);
				can.each(reason,function(val,key){
					exports.Mask.toast(val);
				})
				_data = undefined;
			});
		}else if (typeof result == "string"){
			var success = can.ajax(result);
			getResultDate(success);
		}else if(typeof result == "object"){
			can.each(result,function(value,key){
				key == "count" ? _count = value:_data = value;
				if(_count){
					_viewModel.attr("count",_count);
				}
			});
		}
		
		return _data;
	};
	var undateAttrs = function(_data){
		_viewModel.attr("data",_data);
		var timer = setTimeout(function(){
			_self.viewModel.attr("mask",false);
		},500);
		_viewModel.attr("currentPage",config.currentPage);
		_viewModel.attr("preClass",config.currentPage == 1 ? "gray" :"primary" );
		_viewModel.attr("nextClass",config.currentPage == _viewModel.count ? "gray" : "primary");
	};
    var config = {
    	page:_page,
    	currentPage :_currentPage,
    	viewModel :_viewModel,
    	funcName:_funcName,
    	getResultDate :getResultDate,
    	undateAttrs:undateAttrs
    };
   	callback(config);
};
can.Component.extend({
		tag : "scrollview",
		template : can.stache(tpl),
		viewModel : function(attrs,parentScope,el){
			var _root=parentScope.attr("root")==undefined?parentScope:parentScope.attr("root");
			var _page=_root.attr("page");
			return {
				id:el.getAttribute("id"),
				name:undefined,
				currentPage:1,
				preClass:"gray",
				nextClass:"gray",
				mask:false,
				page:_page,
				data:""
			};
		},
		events:{
			"inserted":function(el,ev){
				var _self = this;
				_dataLoad(_self,function(config){
					var result = config.page["on"+config.funcName+"Data"] ? config.page["on"+config.funcName+"Data"]() :undefined;
					var _data = config.getResultDate(result);
					config.viewModel.attr("data",_data);
			    	config.viewModel.attr("nextClass",config.viewModel.count > 1 ? "primary" : "gray");
				});		
			},
			"#prePage click" :function(){

				var _self = this;
				_dataLoad(_self,function(config){

				    if(config.currentPage > 1){
				    	_self.viewModel.attr("mask",true);
					    config.currentPage--;
					   	var result = config.page["on"+config.funcName+"Click"] ? config.page["on"+config.funcName+"Click"](config.currentPage) :undefined;
						var _data = config.getResultDate(result);
						if(_data != undefined)
							config.undateAttrs(_data);
						else 
							return false;
				    };
				});
			},
			"#nextPage click" :function(){
				var _self = this;
			
			    _dataLoad(_self,function(config){
			    	if(config.currentPage < config.viewModel.count){
			    		_self.viewModel.attr("mask",true);
			    		config.currentPage++;
			    		var result = config.page["on"+config.funcName+"Click"] ? config.page["on"+config.funcName+"Click"](config.currentPage) :undefined;
						var _data = config.getResultDate(result);
						if(_data != undefined)
							config.undateAttrs(_data);
						else 
							return false;
			    	};
			    });
			}
		}
	});
});
