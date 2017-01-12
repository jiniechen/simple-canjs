define([],
		function() {
			function setControl(dom,events){
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
			};

			function PageObject(options) {
				var _dom = undefined;
				var _stache = undefined;

				// 复制其它方法到当前对象,构建viewModel
				var _cache = true;
				var _helpers ={};
				var _onCreate = undefined;// parameter:page
				var _onShow = undefined;// parameter:page,dom
				var _onHide = undefined// parameter:page,dom
				var _ControlEvents = undefined;
				var _self = this;
				can.each(options, function(value, key) {
					//除data 外，全部注入到page对象
					if (key == "data")
						return;
					_self[key] = value;

				});
				this.viewModel = {
					data : new can.Map(options.data || {}),
					page : this
				};
				//增加组件注入的事件列表
				this.events=[];
				this.addEvent=function(event){
					this.events.push(event);
					if (event.handler){
						var $el=$(event.el);
						$el.off(event.handler);
						$el.on(event.type,event.handler);
					}
				}
				
				var _visible =false;
				this.visible =function(){return _visible};
				this._appendTo = function($el) {
					if (_cache) {
						_dom.appendTo($el);
						_visible=true;
						if (_onShow)
							_onShow(this);
					} else {
						_dom = new MF.Template.Stache(_stache, this.viewModel,
								_helpers);
						setControl(_dom,_ControlEvents);
						if (_onCreate) {
							_onCreate(this);
						}
						_dom.appendTo($el);
						_visible=true;
						if (_onShow)
							_onShow(this);
					}
				}

				this._remove = function() {
					if (!_cache) {
						var _result = true;
						if (_onHide) {
							_result = _onHide(this);
							if (_result == undefined)
								_result = true;
						}
						if (_result) {
							_dom.remove();
							_dom = undefined;
							_visible=false;
						}
					} else {
						var _result = true;
						if (_onHide) {
							_result = _onHide(this);
							if (_result == undefined)
								_result = true;
						}
						if (_result) {
							_dom.detach();
							_visible=false;
						}
					}
				}

				this.name = undefined;
				this.data = can.isFunction(options.data) ? options.data()
						: options.data;

				this.setStache = function(template) {
					if (_cache) {
						_dom = new MF.Template.Stache(template, this.viewModel,
								_helpers);
						setControl(_dom,_ControlEvents);
						_stache = undefined;
						if (_onCreate) {
							_onCreate(this);
						}
					} else {
						_dom = undefined;
						_stache = template;
					}
				}

				this.setHtml = function(html) {
					_dom = new MF.Template.Html(html);
					setControl(_dom,_ControlEvents);
					_stache = undefined;
					_cache = true;
					if (_onCreate) {
						_onCreate(this);
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
					if (_page) {
						if (_page.attr("data-page") != this.name) {
							_page.attr("data-page", this.name);
							this._appendTo(_page);
						}
					} else {

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
					this.backPageHide();
					var _window = getApp().viewModel.window;
					if (_window.backList) {
						_window.backList.push(this);
						_window.attr("showLeftButton", true);
					}
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