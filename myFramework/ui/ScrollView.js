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
	
	if(can.isDeferred(re)){
		re.then(function(success){
			_getResultDate(success,vm);
			var timer = setTimeout(function(){
				vm.attr("mask",false);
			},600);
		},function(fail){
			vm.attr("mask",false);
			can.each(fail,function(val,key){
				exports.Mask.toast(val);
			});
			_data = undefined;
		})
	}else if(typeof re == "string"){
		var success = can.ajax({
			url:re,
			data:vm.currentPage+1
		});
		_getResultDate(success,vm); 
	}else if(typeof re == "object"){
		can.each(re,function(val,key){
			var _count;
			key == "count" ? _count = val : _data = val;
			if(_count){
				vm.attr("count",_count);
			}
		});
	}
	return _data;
};

var _undateAttrs = function(_data,pageNumber,vm){
	vm.attr("data",_data);
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
				var page = config.viewModel.page;
				if(page["on"+config.funcName+"Data"]){
					var re = page["on"+config.funcName+"Data"]();
					var _data = _getResultDate(re,config.viewModel);
					if(_data){
						config.viewModel.attr("data",_data);
			    		config.viewModel.attr("nextClass",config.viewModel.count > 1 ? "primary" : "gray");
					}
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
						var _data = _getResultDate(re,config.viewModel);
						if(_data){
							_undateAttrs(_data,config.currentPage,config.viewModel);
						}
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
						var _data = _getResultDate(re,config.viewModel);
						if(_data){
							console.log(config.currentPage);
							_undateAttrs(_data,config.currentPage,config.viewModel);
						}
					}
				}
			}
		}
	});
});
