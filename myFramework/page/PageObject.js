define([ "myFramework/ui/Dialog" ],
		function() {

			function setControl(dom, events) {
				if (dom.getData("control"))
					return;
				var _Control = can.Control.extend(events);
				var _control = new _Control(dom.$dom);
				dom.setData("control", _control);
				// 绑定事件到_control
				_control.addEvent = function(event, func) {
					var _strs = event.split(" ");
					// 拆分为selector,event
					if (_strs.length > 0) {
						var _selector = "";
						var _event = "";
						for (var i = 0; i < _strs.length - 1; i++)
							if (i == 0)
								_selector = _strs[i];
							else
								_selector = _selector + " " + _strs[i];
						_event = _strs[_strs.length - 1];
						_control.on(_selector, _event, func);
					}
				};

				_control.addEvents = function(events) {
					var _self = this;
					can.each(events, function(func, event) {
						_self.on(event, func);
					});
				};
			}
			;

			function PageObject(options) {
				var _dom = undefined;
				var _stache = undefined;

				// 复制其它方法到当前对象,构建viewModel
				this.cache = true;
				this.helpers = {};
				this.dailog = false;
				this.onLoad = undefined;// parameter:page
				this.onShow = undefined;// parameter:page,dom
				this.onHide = undefined// parameter:page,dom
				this.events = undefined;
				this.name = undefined;
				var _self = this;
				can.each(options, function(value, key) {
					// 除data 外，全部注入到page对象
					if (key == "data")
						return;
					_self[key] = value;

				});
				this.viewModel = {
					data : new can.Map(options.data == undefined ? {} : (can
							.isFunction(options.data) ? options.data()
							: options.data)),
					page : this
				};
				// 增加组件注入的事件列表
				this.elementEvents = [];
				this.addEvent = function(event) {
					this.elementEvents.push(event);
					if (event.handler) {
						var $el = $(event.el);
						$el.off(event.handler);
						$el.on(event.type, event.handler);
					}
				}

				this._appendTo = function($el) {
					if (this.cache) {
						if (this.dialog)
							_dom.appendTo($("body"));
						else
							_dom.appendTo($el);
						if (this.onShow)
							this.onShow(this);
					} else {
						_dom = new MF.Template.Stache(_stache, this.viewModel,
								this.helpers);
						if (!can.isEmptyObject(this.events))
							setControl(_dom, this.events);
						if (this.onLoad) {
							this.onLoad(this);
						}
						if (this.dialog)
							_dom.appendTo($("body"));
						else
							_dom.appendTo($el);
						if (this.onShow)
							this.onShow(this);
					}
				}

				this._remove = function() {
					if (!this.cache) {
						var _result = true;
						if (this.onHide) {
							_result = this.onHide(this);
							if (_result == undefined)
								_result = true;
						}
						if (_result) {
							_dom.remove();
							_dom = undefined;
						}
					} else {
						var _result = true;
						if (this.onHide) {
							_result = this.onHide(this);
							if (_result == undefined)
								_result = true;
						}
						if (_result) {
							_dom.detach();
						}
					}
				}

				this.setStache = function(template) {
					var _template = this.dialog ? "<dialog>" + template
							+ "</dialog>" : template;
					if (this.cache) {
						_dom = new MF.Template.Stache(_template,
								this.viewModel, this.helpers);
						if (!can.isEmptyObject(this.events))
							setControl(_dom, this.events);
						_stache = undefined;
						if (this.onLoad) {
							this.onLoad(this);
						}
					} else {
						_dom = undefined;
						_stache = _template;
					}
				}

				this.setHtml = function(html) {
					if (this.dialog) {
						this.cache = false;
						this.setStache(html);
					} else {
						_dom = new MF.Template.Html(html);
						if (!can.isEmptyObject(this.events))
							setControl(_dom, this.events);
						_stache = undefined;
						cache = true;
						if (this.onLoad) {
							this.onLoad(this);
						}
					}
				}

				this.getDom = function() {
					return _dom;
				}

				this.getControl = function() {
					return _dom.getData("control");
				}

				this.show = function() {
					var _page = $("#page");
					if (this.dialog) {
						this._appendTo(_page);
					} else {
						if (_page) {
							if (_page.attr("data-page") != this.name) {
								_page.attr("data-page", this.name);
								this._appendTo(_page);
							}
						} else {

						}
					}
				};
				this.backPageHide = function() {
					var _page = $("#page");
					if (_page) {
						_page.attr("data-page", "");
					}
					this._remove();
				};
				this.hide = function() {
					if (this.dialog) {
						this._remove();
					} else {
						this.backPageHide();
						var _window = getApp().viewModel.window;
						if (_window.backList) {
							_window.backList.push(this);
							_window.attr("showLeftButton", true);
						}
					}
				};
				this.getViewModel = function(selector) {
					if (selector == undefined || selector == "")
						return this.viewModel;
					var _$dom = this.getDom().$dom;
					var _els = _$dom.find(selector);
					var result = [];
					_els.each(function(index, el) {
						result.push($(el).viewModel());
					});
					return result;
				}
			}

			function _page(options) {
				var _pageObject = new PageObject(options || {
					cache : true
				});
				// 登记页面到内存中
				MF.Navigator.getPages().push(_pageObject);
				return _pageObject;
			}

			function _loadPage(pages, index, cb) {
				if (pages.length <= index) {
					cb();
					return;
				}
				var _file = pages[index];
				if ((_file.length > 5) && (_file.slice(0, 5) == "html!"))
					;
				else
					_file = "template!" + _file;
				requirejs([ _file ], function() {
					if (pages.length > index) {
						_loadPage(pages, index + 1, cb);
					}
				});
			}

			function loadPages(pages, cb) {
				if (pages.length > 0)
					_loadPage(pages, 0, cb);
				else
					cb();
			}

			MF.Page = _page;
			MF.LoadPages = loadPages;
		});
