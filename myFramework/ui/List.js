requirejs(["text!myFramework/ui/List.stache","myFramework/utils/StacheHelpers"],function(tpl,stacheHelpers){
	can.Component.extend({
		tag:"list",
		template:can.stache(tpl),
		helpers:stacheHelpers,
		viewModel:function(attrs,parentScope,el){
			//获取page对象的viewModel,组合组件从上层组件获取root,顶层组件的parentScope为root
			var _root=parentScope.attr("root")==undefined?parentScope:parentScope.attr("root");
			//获取页面对象
			var _page=_root.attr("page");
			//组件可以通过属性data重设数据值对象
			var _contextName=attrs.context||"";
			var _title = attrs.rows||"";
			var _data=can.getObject(_contextName,parentScope.attr("data")||_root.attr("data"));

			return {
				id:el.getAttribute("id"),
				contextName:_contextName,
				align:"left",
				title:_page[_title],
				page:_page,
				data:_data,
				root:_root,
				aling:"left",
				style:"table bordered",
				titleColor:"primary",
				active:"",
				_myParent:parentScope,
				error:new can.Map({
					flag:false,
					message:undefined
				})
			}
		}
	});
});