requirejs([ "text!myFramework/ui/ScrollView.stache"],function(tpl){

var _getConfig = function(_self){
    var _viewModel = _self.viewModel;
    var _name  =_viewModel.id||_viewModel.name||"";
    var _funcName = _name.substring(0,1).toUpperCase()+_name.substring(1,_name.length);
	var  _config = {
    	viewModel :_viewModel,
    	currentPage :_viewModel.currentPage,
    	name:_name,
    	funcName:_funcName
    }
    return _config;
};
var _getResultDate = function(re,vm){
	vm.attr("mask",true);
	if(can.isDeferred(re)){
		re.then(function(success){
			var _jsonData = (new Function("return " + success))();
			if(_jsonData.count){
				vm.attr("count",_jsonData.count);
				if(vm.attr("currentPage") == 1)
					vm.attr("nextClass", _jsonData.count> 1 ? "primary" : "gray");	
			}
			if(_jsonData.data){
				vm.attr("data", _jsonData.data);
				vm.attr("mask",false);
			}
		},function(fail){
			exports.Mask.toast(fail.message);
		}); 
	}else if(typeof re == "string"){
		var success = can.ajax({
			url:re,
		});
		_getResultDate(success,vm);
	}else if(typeof re == "object"){
		can.each(re,function(val,key){
			var _count;
			key == "count" ? _count = val : _data = val;
			if(_count){
				vm.attr("count",_count);
			}
			if(_data){
				vm.attr("data", _data);
				vm.attr("mask",false);
			}
		});
	}
};
var _undateAttrs = function(pageNumber,vm){
	vm.attr("currentPage",pageNumber);
	vm.attr("preClass",pageNumber == 1 ? "gray" :"primary" );
	vm.attr("nextClass",pageNumber == vm.count ? "gray" : "primary");
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
				var config = _getConfig(_self);
				var vm  = config.viewModel;
				var page = config.viewModel.page;
				if(page["on"+config.funcName+"Data"]){
					var re = page["on"+config.funcName+"Data"]();
					_getResultDate(re,vm);
				}
			},
			"#prePage click" :function(){
				var _self = this;
				var config = _getConfig(_self);
				if(config.currentPage >1){
					_self.viewModel.attr("mask",true);
					config.currentPage--;
					var page = config.viewModel.page;
					if(page["on"+config.funcName+"Click"]){
						var re = page["on"+config.funcName+"Click"](config.currentPage);
						_getResultDate(re,config.viewModel);
						_undateAttrs(config.currentPage,config.viewModel);

					}
				}
			},
			"#nextPage click" :function(){
				var _self = this;
				var config = _getConfig(_self);
				if(config.currentPage <config.viewModel.count){
					_self.viewModel.attr("mask",true);
					config.currentPage++;
					var page = config.viewModel.page;
					if(page["on"+config.funcName+"Click"]){
						var re = page["on"+config.funcName+"Click"](config.currentPage);
						_getResultDate(re,config.viewModel);
						_undateAttrs(config.currentPage,config.viewModel);
					}
				}
			}
		}
	});
});
