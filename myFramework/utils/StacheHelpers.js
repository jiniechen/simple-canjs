define([], function() {
	// 绑定事件，{{event type}}
	MF.StacheHelpers = {
		event : function(type) {
			var _page = this.page||this.scope.attr("page");
			var _name = this.name || "";
			return function(el) {
				var name = "on" + _name.substring(0, 1).toUpperCase()
						+ _name.substring(1, _name.length)
						+ type.substring(0, 1).toUpperCase()
						+ type.substring(1, type.length);
				// 构建事件列表 元素/事件名称/响应函数
				if (_page) {
					var _handler = _page[name];
					if (_DEBUG || _handler)
						_page.addEvent({
							el : el,
							name : name,
							type : type,
							handler : _handler
						});
				}
			}
		},
		formValue : function() {
			var _data = this.scope.attr("data");
			var _page = this.scope.attr("page");
			var _name = this.name;
			var _viewModel = this;
			return function(el) {
				function _isCheckbox(){
					return el.getAttribute("type")=="checkbox"?true:false;
				}
				_data.bind(_name, function(ev, newVal, oldVal) {
					if (newVal != oldVal) {
						if (_isCheckbox())
							el.checked=newVal;
						else
							el.value=newVal;
						if (_page.onValidateValue) {
							var _error = _page.onValidateValue(_name, newVal);
							if (_error) {
								_viewModel.error.attr("flag", true);
								_viewModel.error.attr("message", _error);
							} else {
								_viewModel.error.attr("flag", false);
								_viewModel.error.attr("message", undefined);
							}
						}
					}
				});
				
				if (_isCheckbox()){
					el.onclick = function() {
						_data.attr(_name, this.checked);
					};
				}else{
					el.onchange = function() {
						_data.attr(_name, this.value);
					};
				}
				if (_isCheckbox()){
					el.checked = _data.attr(_name);
				}else
					el.value = _data.attr(_name);
			}
		}
	};

});