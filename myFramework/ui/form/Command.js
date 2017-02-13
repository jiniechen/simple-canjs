requirejs(["text!myFramework/ui/form/Command.stache","myFramework/utils/StacheHelpers"],function(tpl,stacheHelpers){
	can.Component.extend({
		tag:"command",
		template:can.stache(tpl),
		helpers:stacheHelpers,
		viewModel:function(attrs,parentScope,el){
			//获取page对象的viewModel,组合组件从上层组件获取root,顶层组件的parentScope为root
			var _root=parentScope.attr("root")==undefined?parentScope:parentScope.attr("root");
			//获取页面对象
			var _page=_root.attr("page");
			//组件可以通过属性data重设数据值对象
			var _contextName=attrs.context||"";
			var _data=can.getObject(_contextName,parentScope.attr("data")||_root.attr("data"));
			return {
				id:el.getAttribute("id"),
				contextName:_contextName,
				name:undefined,
				size:"",
				type:"success",
				text:"",
				_myParent:parentScope,
				page:_page,
				data:_data,
				root:_root
			}
		}
	});
});