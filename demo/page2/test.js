Page({
	onData:function(){
		return Remote.Student.new({	
			detail:[
				{id:"001",name:"计算机基础",
					time:"2017"
				},
				{id:"002",name:"JAVA",
					time:"2017"
				},
				{id:"003",name:"数据结构",
					time:"2017"
				},
				{id:"004",name:"算法",
					time:"2017"
				},
				{id:"005",name:"计算机基础",
					time:"2017"
				},
				{id:"006",name:"JAVA",
					time:"2017"
				},
				{id:"007",name:"数据结构",
					time:"2017"
				},
				{id:"008",name:"算法",
					time:"2017"
				}
			]
		});
	},
	//dialog:true,
	title:"这是我的Dialog标题",
	//closeBtn:false,
	onShow:function(page){
		//page.doIt();
	},
	onHide:function(page){
		//alert("hide:"+page.name);
	},
	onLoad:function(page){
		//alert("load:"+page.name);
	},
	doIt:function(){
		//alert("call function doIt()");
	},
	onScrollUp:function(el){
		var detail =[
				{id:"001",name:"初始化信息",
					time:"2017"
				},
				{id:"002",name:"初始化信息",
					time:"2017"
				},
				{id:"003",name:"初始化信息",
					time:"2017"
				},
				{id:"004",name:"初始化信息",
					time:"2017"
				},
				{id:"005",name:"初始化信息",
					time:"2017"
				}
				
			] 

		var _data =el.data;
		_data.splice(0,_data.length);
		_data.attr(detail);
		el.lastPage= false;
	},
	onScrollDown:function(el){
		//debugger;
		var detail =[
				{id:"001",name:"新增信息1",
					time:"2017"
				},
				{id:"002",name:"新增信息1",
					time:"2017"
				},
				{id:"003",name:"新增信息1",
					time:"2017"
				},
				{id:"004",name:"新增信息1",
					time:"2017"
				},
				{id:"005",name:"新增信息1",
					time:"2017"
				},
				{id:"006",name:"新增信息1",
					time:"2017"
				},
				{id:"007",name:"新增信息1",
					time:"2017"
				},
				{id:"008",name:"新增信息1",
					time:"2017"
				},
				{id:"009",name:"新增信息1",
					time:"2017"
				},
				{id:"010",name:"新增信息1",	
					time:"2017"
				}
				
			] 

		var _data =el.data;
		_data.splice(0,_data.length);
		_data.attr(detail);
		el.lastPage= true;
	},
	onScrollData:function(el) {
		var detail =[
				{id:"001",name:"初始化信息",
					time:"2017"
				},
				{id:"002",name:"初始化信息",
					time:"2017"
				},
				{id:"003",name:"初始化信息",
					time:"2017"
				},
				{id:"004",name:"初始化信息",
					time:"2017"
				},
				{id:"005",name:"初始化信息",
					time:"2017"
				}
				
			] 
		el.viewModel().lastPage = false;
		var _data =el.viewModel().data;
		_data.splice(0,_data.length);
		_data.attr(detail);

	}
}); 