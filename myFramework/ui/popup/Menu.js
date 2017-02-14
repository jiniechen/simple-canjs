define(["text!myFramework/ui/popup/Menu.stache","myFramework/ui/popup/Mask"],function(tmpl,Mask){
	function show(data,placement){
		
		if (Mask.Popup.isShow){
			Mask.Popup.hide();
		}
		if (!data.position)
			data.position="bottom";

		Mask.Popup.show({
			content:function(options){
				var _frag=can.stache(options.stache);
				var _dom=$("<div/>");
				_dom.append(_frag(options.viewModel));
				return _dom.html();
			},
			stache:tmpl,
			viewModel:data,
			placement:data.position,
			targetDismiss : false,
			display:"modal",
			autoHide:false,
			animate:0,//不执行动画
			duration:0,//不执行动画
			data:data,
			//preventDefault:false,
			//stopPropagation:false,
			show:function(){
				$("html,body").css("overflow-y","hidden");
			},
			hidden:function(){
				$("html,body").css("overflow-y","auto");
			},
			shown:function(options){//绑定事件
				//debugger;
				var _options=options;
				var _el=_options.$target.find("#menu a");
				if (_el.length){
					$(_el).on("click",function(ev){
						//ev.preventDefault();
						var _index=$(ev.target).attr("data-menuid");
						var _action=_options.data.list[_index].action;
						if (_action)
							_action();
						hide();
						//ev.stopPropagation();
					});
				}
			}
		});
	};
	function hide(){
		Mask.Popup.hide();
	}
	
	return {
		show : show,
		hide : hide
	}
});