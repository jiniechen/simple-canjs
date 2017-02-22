requirejs([ "text!myFramework/ui/ScrollView.stache","myFramework/ui/WidgetFactory"],function(tpl,widgetFactory){
	widgetFactory.widget("scrollview",tpl)
	.config(function(config){
		config.hasError=false;
		config.hasAlign=false;
		config.hasLabel=false;
		config.extendVM=function(vm,attrs,parentScope,el){
			vm.title=undefined;
			vm.pageNumber = 1;//第几页
			vm.firstPage = true;//是否为第一页
			vm.lastPage = false;//是否为最后一页
		}
	})
	.events(function(events){

		events["#prePage click"]=function(el){
			var _pageNumber = this.viewModel.pageNumber;
			var _viewModel = this.viewModel;
			if(_pageNumber != 1){
				var page = _viewModel.page
			    var _name  =_viewModel.id||_viewModel.name||"";
			    var funcName = _name.substring(0,1).toUpperCase()+_name.substring(1,_name.length);
			    if(page["on"+funcName+"Up"]){
			    	page["on"+funcName+"Up"](_viewModel);
			    	_pageNumber--;
					_viewModel.attr("pageNumber",_pageNumber);
					if(_pageNumber == 1){
						_viewModel.attr("firstPage",true);
					}
			    };
			}
		};
		events["#nextPage click"]=function(el){
			var _lastPage = this.viewModel.lastPage;
			var _viewModel = this.viewModel;
			if(!_lastPage){
				var _pageNumber = _viewModel.pageNumber;
				var page = _viewModel.page
			    var _name  =_viewModel.id||_viewModel.name||"";
			    var funcName = _name.substring(0,1).toUpperCase()+_name.substring(1,_name.length);
			    if(page["on"+funcName+"Down"]){
			    	page["on"+funcName+"Down"](_viewModel);
			    	_pageNumber++;
					_viewModel.attr("pageNumber",_pageNumber);
					_lastPage = _viewModel.lastPage;
					_viewModel.attr("firstPage",false);
			    }
			}
		}
		events.inserted = function(el,ev){
			var page = el.viewModel().page;
			var _name = el.viewModel().id||el.viewModel().name||"";
			var funcName = _name.substring(0,1).toUpperCase()+_name.substring(1,_name.length);
			if(page["on"+funcName+"Data"]){
				page["on"+funcName+"Data"](el);
			};	
			var _pageNumber =  el.viewModel().pageNumber;
		};
	})
	.build()
	.plugin(function(_widget){
	})
});

	/*can.Component.extend({
		tag : "scrollview",
		helpers:stacheHelpers,
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
				title:undefined,
				validate:"true",
				height:el.getAttribute("height"),
				page:_page,
				data:_data,
				root:_root,
				_myParent:parentScope
			};
		},
		events:{
			"inserted" :function(el,ev){
				
				var section = el.find("section").eq(0),
					div = section.find("div").eq(0);

				var _viewModel = getCurrentPage();

				var wrapH = el.viewModel().height,//容器高度
					documentH = div.height(),//文档高度
					data = el.viewModel().context,
					data = data.substring(0,1).toUpperCase()+data.substring(1,data.length);

				
				if(_viewModel["on"+data+"Up"])
					var up = _viewModel["on"+data+"Up"];
				else 
					up = undefined;
				if(_viewModel["on"+data+"Down"])
					var down = _viewModel["on"+data+"Down"];
				else
					down = undefined;
				section.listenScroll({
					listenScroll:function(isInScroll, scrollDirection, scrollTop){

						if(scrollDirection == "down"){
							
							if(scrollTop == documentH-wrapH){
								
								var timer = setTimeout(function(){
									if(_viewModel["on"+data+"Up"])
										_viewModel["on"+data+"Up"]();
								},100);
								
							}
						}else if(scrollDirection == "up"){
							if(scrollTop == 0){
								var timer = setTimeout(function(){
									if(_viewModel["on"+data+"Down"])
										_viewModel["on"+data+"Down"]();
								},100);
							}
						}
					}
				})
			}
		}
	});
});*/