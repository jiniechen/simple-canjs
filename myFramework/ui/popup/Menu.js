define(["text!myFramework/ui/popup/Menu.stache"],function(tmpl){
	function show(data,placement){
		if (MF.Popup.isShow){
			MF.Popup.hide();
		}
		if (!data.position)
			data.position="bottom";
		MF.Popup.show({
			content:function(options){
				var _frag=can.stache(options.stache);
				var _dom=$("<div/>");
				_dom.append(_frag(options.viewModel));
				return _dom.html();
			},
			stache:tmpl,
			viewModel:data,
			placement:data.position,
			backdrop:true,
			targetDismiss : false,
			display:"modal",
			autoHide:false,
			animate:0,//不执行动画
			duration:0,//不执行动画
			data:data,
			shown:function(options){//绑定事件
				var _options=options;
				var _el=_options.$target.find("#menu a");
				if (_el.length){
					$(_el).on("click",function(ev){
						ev.preventDefault();
						var _index=$(ev.target).attr("data-menuid");
						var _action=_options.data.list[_index].action;
						if (_action)
							_action();
						MF.Menu.hide();
						ev.stopPropagation();
					});
				}
			}
		});
	};
	function hide(){
		MF.Popup.hide();
	}
	MF.Menu={
		show : show,
		hide : hide
	}
});