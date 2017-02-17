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
					var _root = this.root;
					if (_id == undefined)
						_id = this.name || "";
					var _name = this.name || "";
					var _viewModel = this;
			                var _index=this.index;
					                var _self=this;
					//递归寻找this的 context 和 index
					
					function getFullPath(_scope){
						var result=_scope.attr("context");
						if (result==undefined)
							result="";
						if (_scope._myParent){
							var pr=getFullPath(_scope._myParent);
							if (pr!=""){
								if (_scope._myParent.attr("index"))
									pr=pr+"[]";
								result=pr+(result==""?"":"."+result);
							}
						}
						return result;
					};
					function getIndexArray(_scope){
						var result = _scope.attr("index");
						if (result == undefined)
							result = "";
						if (_scope._myParent) {
							var index  = getIndexArray(_scope._myParent);
							if (index !="") {
								result = [index];
							}
						}
						return result;
					}
					return function(el) {
						function _isCheckbox() {

							var type = el.getAttribute("type");

							return type =="checkbox" ||type == "radio"? type:false;
						}
						_data.bind(_name, function(ev, newVal, oldVal) {
							//debugger;
							if (newVal != oldVal) {
								
								if (_isCheckbox()=="radio")
									{
										//el.checked=newVal;
										el.checked = _data.attr(_name) == el.getAttribute("value")?true:false;
									}
								else
									el.value=newVal;

								var _fp=getFullPath(_self);
								_fp=_fp==""?_name:_fp+"."+_name;
								var _error = _root.attr("data").errors(_fp,{options:getIndexArray(_self)});
								if(_error){
									can.each(_error,function(key,val){
										can.each(key,function(el,index){
											_viewModel.error.attr("flag",true);
											_viewModel.error.attr("message",el);
										})
									})
								}else{
									_viewModel.error.attr("flag",false);
									_viewModel.error.attr("message",undefined);
								}

										var dropdownChangeEvent = "on"
												+ camelString(_name) + "ValueChange";

										if (_page[dropdownChangeEvent])
										{
											_page[dropdownChangeEvent](_name, newVal);
										}
									}
								});

							if (_isCheckbox()=="radio") {
								el.onclick = function() {
									//_data.attr(_name, this.checked);
									_data.attr(_name , this.value);
								};
							} else {
								el.onchange = function() {
									_data.attr(_name, this.value);
								};
							}
							if (_isCheckbox()=="radio") {
								//el.checked = _data.attr(_name);
								el.checked = _data.attr(_name) == el.getAttribute("value")?true:false;

							}else
								el.value = _data.attr(_name);
					}
				},checkboxValue:function(){

					var _data = this.data;
					var _name = this.name || "";
					return function(el){
						_data[_name].bind("change",function(ev, index, how, newVal, oldVal){
							//一一对应情况	
							var number = el.getAttribute("index");	
							el.checked = el.getAttribute("data-true") == _data[_name].attr(number);

							//只传选中的值
							/*var index = _data[_name].indexOf(el.getAttribute("data-true"));
							el.checked = index==0||index > 0 ?  true:false;*/
						})
						el.onclick=function(){
							//一一对应情况
							var attr = this.checked == true  ? this.getAttribute("data-true"):this.getAttribute("data-false");
							var index = this.getAttribute("index");
							_data[_name].attr(index,attr);

							//只传选中的值
							/*var attr = this.getAttribute("data-true"),
								index = _data[_name].indexOf(attr);
							if(index > 0 || index==0 ){
								_data[_name].splice(index,1);
							}else{
								_data[_name].push(attr);

							}*/
							
						};
						//一一对应情况
						_data[_name].attr(el.getAttribute("index")) == el.getAttribute("data-true")?el.checked=true:el.checked=false;
						
						//只传选中的值
						/*var include = _data[_name].indexOf(el.getAttribute("data-true"));
						el.checked = include==0||include > 0 ?  true:false;*/
					}
				},switchValue:function(){
					var _data = this.data;
					var _name = this.name || "";
					return function(el){
						
						_data.bind(_name,function(ev, newVal, oldVal){

							el.checked=newVal;

						})
						el.checked = _data.attr(_name);

						el.onclick=function(){
							_data.attr(_name, this.checked);
						};
						
					}
				}
			};

		});