define([ "myFramework/MyExports" ],
		function(exports) {
			// 绑定事件，{{event type}}
			function camelString(_name) {
				var result = "";
				var nameLength = _name ? _name.length : 0;
				if (nameLength > 0)
					result = _name.substring(0, 1).toUpperCase();
				if (nameLength > 1)
					result = result + _name.substring(1, nameLength);
				var pos = _name.indexOf(".");
				if (pos > 0)
					result = result.substring(0, pos)
							+ camelString(result.substring(pos + 1));
				return result;
			}
			;
			return {
				event : function(type) {
					var _page = this.page;
					var _id = this.id;
					if (_id == undefined)
						_id = this.name || "";
					var _name = this.name || "";
					return function(el) {
						var eventName = "on";
						eventName = eventName + camelString(_id);
						var typeLength = type ? type.length : 0;
						if (typeLength > 0) {
							/*
							 * eventName = eventName + type.substring(0,
							 * 1).toUpperCase(); if (typeLength>1) eventName =
							 * eventName + type.substring(1, typeLength);
							 */
							eventName = eventName + camelString(type);
							// 构建事件列表 元素/事件名称/响应函数
							if (_page) {
								var _handler = _page[eventName];
								if (exports.debug || _handler)
									_page.addEvent({
										el : el,
										name : eventName,
										type : type,
										handler : _handler
									});
							}
						}
						;
					}
				},
				formValue : function() {
					var _data = this.data;
					var _page = this.page;
					var _id = this.id;
					if (_id == undefined)
						_id = this.name || "";
					var _name = this.name || "";
					var _viewModel = this;
					return function(el) {
						function _isCheckbox() {

							var type = el.getAttribute("type");
							return type == "checkbox" || type == "radio" ? true
									: false;
						}
						_data.bind(_name, function(ev, newVal, oldVal) {
							if (newVal != oldVal) {
								if (_isCheckbox()) {
									el.checked = newVal;
								} else
									el.value = newVal;
								if (_page.onValidateValue) {
									var _error = _page.onValidateValue(_id,
											newVal);
									if (_error) {
										_viewModel.error.attr("flag", true);
										_viewModel.error
												.attr("message", _error);
									} else {
										_viewModel.error.attr("flag", false);
										_viewModel.error.attr("message",
												undefined);
									}
								}

								var dropdownChangeEvent = "on"
										+ camelString(_name) + "ValueChange";

								if (_page[dropdownChangeEvent])
								{
									_page[dropdownChangeEvent](_name, newVal);
								}
							}
						});

						if (_isCheckbox()) {
							el.onclick = function() {
								_data.attr(_name, this.checked);
							};
						} else {
							el.onchange = function() {
								_data.attr(_name, this.value);
							};
						}
						if (_isCheckbox()) {
							el.checked = _data.attr(_name);
						} else
							el.value = _data.attr(_name);
					}
				}
			};

		});