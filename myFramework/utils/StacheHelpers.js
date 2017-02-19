define([ "myFramework/MyExports" ],function(exports) {
	
	function camelString(_name) {
		var result = "";
		var nameLength = _name ? _name.length : 0;
		if (nameLength > 0)
			result = _name.substring(0, 1).toUpperCase();
		if (nameLength > 1)
			result = result + _name.substring(1, nameLength);
		var pos = _name.indexOf(".");
		if (pos > 0)
			result = result.substring(0, pos) + camelString(result.substring(pos + 1));
		return result;
	};
	// 绑定事件，{{event type}}
	function event(type) {
		var _page = this.page;
		var _id = this.id;
		if (_id == undefined||_id=="")
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
				window._page=_page;
			};
		}
	};
	
	//值绑定
	function readOnlyValue(){
		var _data = this.data;
		var _page = this.page;
		var _root = this.root;
		var _id = this.id;
		if (_id == undefined)
			_id = this.name || "";
		var _name = this.name || "";
		var _parentData = this.parentData;
        var _index=this.index;
		var _self=this;
		return function(el) {
			_data.bind(_name, function(ev, newVal, oldVal) {
				if (newVal!=oldVal)
					el.value=newVal;
			});
			el.value = _data.attr(_name);
		};
	};
	
	function inputValue(){
		var _data = this.data;
		var _page = this.page;
		var _root = this.root;
		var _id = this.id;
		if (_id == undefined)
			_id = this.name || "";
		var _name = this.name || "";
		var _parentData = this.parentData;
        var _index=this.index;
        var _context=this.context;
		var _self=this;
		return function(el) {
			_data.bind(_name, function(ev, newVal, oldVal) {
				if (newVal!=oldVal)
					el.value=newVal;
			});
			el.onchange = function() {
				_data.attr(_name, this.value);
			};
			el.value = _data.attr(_name);
		};
	};
	
	function selectValue(){
		var _data = this.data;
		var _page = this.page;
		var _root = this.root;
		var _id = this.id;
		if (_id == undefined)
			_id = this.name || "";
		var _name = this.name || "";
		var _parentData = this.parentData;
        var _index=this.index;
		var _self=this;
		return function(el) {
			_data.bind(_name, function(ev, newVal, oldVal) {
				if (newVal!=oldVal)
					if (el.value!=newVal)
						el.value=newVal;
				if (_self.mobi){
					//_self.mobi.clear();
					_self.mobi.init(el);
				}
			});
			el.onchange = function() {
				_data.attr(_name, this.value);
			};
			el.value = _data.attr(_name);
		};
	};
	
	function checkboxValue(){
		var _data = this.data;
		var _page = this.page;
		var _root = this.root;
		var _id = this.id;
		if (_id == undefined)
			_id = this.name || "";
		var _name = this.name || "";
		var _parentData = this.parentData;
        var _index=this.index;
		var _self=this;
		return function(el) {
			var _checkValue=$(el).data("value");
			_data[_name].bind('length', function(ev, removedElements, index) {
				var _inputs=$(el).parent().parent().find("input");
				can.each(_inputs,function(_input,index){
					_input.checked=false;
					can.each(_data[_name],function(_c,index){
						if ($(_input).data("value")==_c)
							_input.checked=true;
					});
				});
			});
			el.onclick = function() {
				var _list=_data.attr(_name);
				//el.checked
				var _index=-1;
				if (_list){
					can.each(_list,function(value,index){
						if (value==_checkValue)
							_index=index;
					});
				}
				if (el.checked)
					if (_index=-1)
						_list.push(_checkValue);
				if (!el.checked)
					_list.splice(_index,1);
			};
			var _list=_data.attr(_name);
			el.checked=false;
			if (_list){
				can.each(_list,function(value,index){
					if (value==_checkValue)
						el.checked=true;
				});
			}
		};
	};
	
	
	function radioValue(){
		var _data = this.data;
		var _page = this.page;
		var _root = this.root;
		var _id = this.id;
		if (_id == undefined)
			_id = this.name || "";
		var _name = this.name || "";
		var _parentData = this.parentData;
        var _index=this.index;
		var _self=this;
		return function(el) {
			_data.bind(_name, function(ev, newVal, oldVal) {
				if (newVal!=oldVal)
					el.checked = _data.attr(_name) == el.getAttribute("value")?true:false;
			});
			el.onclick = function() {
				_data.attr(_name, this.value);
			};
			el.checked = _data.attr(_name) == el.getAttribute("value")?true:false;
		};
	};
	
	function switchboxValue(){
		var _data = this.data;
		var _page = this.page;
		var _root = this.root;
		var _id = this.id;
		if (_id == undefined)
			_id = this.name || "";
		var _name = this.name || "";
		var _parentData = this.parentData;
        var _index=this.index;
		var _self=this;
		var _options = this._options||[0,1];
		return function(el) {
			_data.bind(_name,function(ev, newVal, oldVal){
				el.checked=newVal==_options[1];
			})
			el.checked = _data.attr(_name)==_options[1];
			el.onclick=function(){
				_data.attr(_name,_options[this.checked?1:0]);
			};
		};
	};
	//todo--考虑数据双向绑定时，切换页面需要取消数据的绑定。
	
	return {
		event:event,
		readOnlyValue:readOnlyValue,
		inputValue:inputValue,
		selectValue:selectValue,
		checkboxValue:checkboxValue,
		radioValue:radioValue,
		switchboxValue:switchboxValue
	}
	
});