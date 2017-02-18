requirejs(["text!myFramework/ui/form/Radio.stache","myFramework/ui/WidgetFactory"],function(tpl,widgetFactory){
	widgetFactory.widget("radio",tpl)
		.config(function(config){
			
		})
		.build()
		.plugin(function(el){
			var vm=$(el).viewModel();
		
			return {
				vm:vm,
				align:function(value){
					vm.attr("align",
						value== undefined?"left":(value == "right" ? "flex-end" :"center"));
				}
			};
		});
});
	
	
/*,"myFramework/utils/StacheHelpers"],function(tpl,stacheHelpers){
	can.Component.extend({
		tag:"radio",
		template:can.stache(tpl),
		helpers:stacheHelpers,
		viewModel:function(attrs,parentScope,el){
			var _optionsJson=$(el).data("options");
			var _options=[];
			if (_optionsJson){
				var func=new Function("return "+_optionsJson+";");
				_options=func();
			}
			//获取page对象的viewModel,组合组件从上层组件获取root,顶层组件的parentScope为root
			var _root=parentScope.attr("root")==undefined?parentScope:parentScope.attr("root");
			//获取页面对象
			var _page=_root.attr("page");
			//组件可以通过属性data重设数据值对象
			var _contextName=attrs.context||"";
			var _data=can.getObject(_contextName,parentScope.attr("data")||_root.attr("data"));
			
			var txt_align = attrs.align;
			var _align = txt_align == undefined?"left":(txt_align == "right" ? "flex-end" :"center");
			return {
				id:el.getAttribute("id"),
				contextName:_contextName,
				name:undefined,
				//value:undefined,
				_options:_options,//_page[group],
				label:"",
				_align:_align,
				page:_page,
				data:_data,
				root:_root,
				_myParent:parentScope,
				error:new can.Map({
					flag:false,
					message:undefined
				})
			};
		}
	})
})*/