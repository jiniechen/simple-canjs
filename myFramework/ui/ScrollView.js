requirejs([ "myFramework/ui/WidgetFactory"],function(widgetFactory){
	widgetFactory.widget("scrollview","<div  style='height:{{height}}px;overflow:auto'><section><content/><div id='loading-more' style='line-height:40px;text-align:center'>上滑加载更多···</div></section></div>")
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
			
			var windowH = $(window).height();
			//var documentH = el.find("section").eq(0).height(),
			var documentH = $("html").height(),
				wrap = el.find("div").eq(0),
				wrapH = el.viewModel().height;
			var	page = el.viewModel().page,
				data = page.data,
			 	dataName  = el.viewModel().context,
				_name = dataName.substring(0,1).toUpperCase()+dataName.substring(1,dataName.length);
			data.bind(dataName,function(ev,newVal,oldVal){

				var length = el.viewModel().data.length;
				if (newVal != oldVal) {
					el.viewModel().data.splice(0,length+1);//清除所有的数据
					el.viewModel().data.attr(newVal);//推进新数据
				}
			})

			$('html,body').on('listenScroll', function(event,isInScroll, scrollDirection,scrollTop) {
				$("#loading-more").text("正在加载，请稍等");
			   	if(scrollDirection == "down"){
					if( scrollTop+windowH == documentH){
						
						var timer  = setTimeout(function(){

							if(page["on"+_name+"Down"])

								page["on"+_name+"Down"](page);
						},800);
						$("#loading-more").text("上滑加载更多···");
					
					}
				}else if(scrollDirection == "up"){
					if(scrollTop == 0){
						if(page["on"+_name+"Up"])

							page["on"+_name+"Up"](page);
					}
				}
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