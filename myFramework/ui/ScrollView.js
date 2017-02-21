requirejs([ "text!myFramework/ui/ScrollView.stache","myFramework/ui/WidgetFactory"],function(tpl,widgetFactory){
	widgetFactory.widget("scrollview",tpl)
	.config(function(config){
		config.hasError=false;
		config.hasAlign=false;
		config.hasLabel=false;
		config.extendVM=function(vm,attrs,parentScope,el){
			vm.title=undefined;
			vm.pageNumber = 1;
		}
	})
	.events(function(events){

		events["#lastPage click"]=function(el){
			var _pageNumber = this.viewModel.pageNumber;
			if(_pageNumber != 1){
				var page = this.viewModel.page
			    var _name  =this.viewModel.id||this.viewModel.name||"";
			    var funcName = _name.substring(0,1).toUpperCase()+_name.substring(1,_name.length);
			    if(page["on"+funcName+"Up"]){
			    	page["on"+funcName+"Up"](this.viewModel);
			    	_pageNumber--;
					//this.viewModel.pageNumber =pageNumber;
					this.viewModel.attr("pageNumber",_pageNumber);
					if(_pageNumber == 1){
						$("#lastPage").removeClass("primary");
						$("#lastPage").addClass("gray");
					}else{
						$("#lastPage").removeClass("gray");
						$("#lastPage").addClass("primary");
					};
			    };

			}
		};
		events["#nextPage click"]=function(el){
			var _pageNumber = this.viewModel.pageNumber;
			var page = this.viewModel.page
		    var _name  =this.viewModel.id||this.viewModel.name||"";
		    var funcName = _name.substring(0,1).toUpperCase()+_name.substring(1,_name.length);
		    if(page["on"+funcName+"Down"]){
		    	page["on"+funcName+"Down"](this.viewModel);
		    	_pageNumber++;
				this.viewModel.attr("pageNumber",_pageNumber);
				if(_pageNumber == 1){
					$("#lastPage").removeClass("primary");
					$("#lastPage").addClass("gray");
				}else{
					$("#lastPage").removeClass("gray");
					$("#lastPage").addClass("primary");
				};
		    }
		}
		events.inserted = function(el,ev){
			$("#lastPage").removeClass("primary");
			$("#lastPage").addClass("gray");
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