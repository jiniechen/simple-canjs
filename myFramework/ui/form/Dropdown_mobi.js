requirejs(["text!myFramework/ui/form/Dropdown_mobi.stache","myFramework/utils/StacheHelpers"],function(tpl,stacheHelpers){
	can.Component.extend({
		tag:"dropdown-mobi",
		template:can.stache(tpl),
		helpers:stacheHelpers,
		viewModel:function(attrs,parentScope,el){
			var _optionsJson=$(el).data("options");
			var _parentOptions={};
			if (_optionsJson){
				var func=new Function("return "+_optionsJson+";");
				_parentOptions=func();
			};			
			//获取page对象的viewModel,组合组件从上层组件获取root,顶层组件的parentScope为root
			var _root=parentScope.attr("root")==undefined?parentScope:parentScope.attr("root");
			//获取页面对象
			var _page=_root.attr("page");
			//组件可以通过属性data重设数据值对象
			var _contextName=attrs.context||"";
			var _data=can.getObject(_contextName,parentScope.attr("data")||_root.attr("data"));
			var txt_align = attrs.align;
			var _align = txt_align == undefined?"":(txt_align == "right" ? "mobi-right" :"mobi-center");
			//级联随动
			var _parentName=$(el).data("parent");
			var _options;
			if (_parentName){
				if (_data[_parentName]){
					_options=_parentOptions[_data[_parentName]];
				}else
					_options=new can.List([]);
				_data.bind(_parentName,function(ev, newVal, oldVal) {
					var vm=$(el).viewModel();
					var _options=vm._parentOptions[vm.data[_parentName]];
					$(el).viewModel().attr("_options",_options);
					$(el).viewModel().data.attr(name,"");
					vm.mobi.clear();
					vm.mobi.init();
				});
			}else{
				_options=_parentOptions;
				_parentOptions={};
			}
			return {
				id:el.getAttribute("id"),
				contextName:_contextName,
				name:undefined,
				mobi:undefined,
				_parentName:_parentName,
				_options:_options,
				_parentOptions:_parentOptions,
				key:"",
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
			}
		},
		events: {

	        inserted: function(el, ev) {
			    var instance = mobiscroll.select(el.find("select"),{
	        		theme: 'mobiscroll',  
			        lang: 'zh',           
			        display: 'bottom',
			        dateFormat:"yy-mm-dd "		        
	        	});
				
			    el.viewModel().mobi = instance;        	
	        }
	    }
		
		
	});
});