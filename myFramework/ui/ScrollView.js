requirejs([ "text!myFramework/ui/ScrollView.stache","myFramework/ui/WidgetFactory"],function(tpl,widgetFactory){
	widgetFactory.widget("scrollview",tpl)
	.config(function(config){
		config.hasError=false;
		config.hasAlign=false;
		config.hasLabel=false;
		config.extendVM=function(vm,attrs,parentScope,el){
			vm.title=undefined
		}
	})
	.events(function(events){
		events.inserted = function(el,ev){
			
			var windowH = $(window).height(),
				wrap = el.find("div").eq(0);
			var	page = el.viewModel().page,
				data = page.data,
			 	dataName  = el.viewModel().context,
				_name = dataName.substring(0,1).toUpperCase()+dataName.substring(1,dataName.length);
			var timer = null;
			$('html,body').on('listenScroll', function(event,isInScroll, scrollDirection,scrollTop) {

				var documentH = $("html").height();

			   	if(scrollDirection == "down"){
			   		
					if( scrollTop+windowH == documentH){
						if(timer != null){
							clearTimeout(timer);
						}
						$("#loading-more").text("正在加载，请稍等");
						
						timer = setTimeout(function(){
							if(page["on"+_name+"Down"])
								var dataFlag = page["on"+_name+"Down"](page);
								if(dataFlag){
									$("#loading-more").text("已全部加载完毕！");
								}else{
									$("#loading-more").text("上滑加载更多···");
									
								}	
						},500);		
					};
				};
			});
		}

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