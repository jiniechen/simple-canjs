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
		exports.Mask.show();
	},
	doIt:function(){
		
		//alert("call function doIt()");
	},
	onScrollClick:function(pageNumber){
		console.log(pageNumber);
		var def = can.Deferred();
		def.reject({
			message:"error"
		});
		def.done(function(){
			alert("加载成功啦");
		});
		def.fail(function(reason){
			alert(reason.message);
		})
		return def;	
		/*var detail =[
				{id:"001",name:"换页信息",
					time:"2017"
				},
				{id:"002",name:"换页信息",
					time:"2017"
				},
				{id:"003",name:"换页信息",
					time:"2017"
				},
				{id:"004",name:"换页信息",
					time:"2017"
				},
				{id:"005",name:"换页信息",
					time:"2017"
				}
			] ;
		return detail;*/

	},
	onScrollData:function() {
		var detail =[
					{id:"001",name:"换页信息",
						time:"2017"
					},
					{id:"002",name:"换页信息",
						time:"2017"
					},
					{id:"003",name:"换页信息",
						time:"2017"
					},
					{id:"004",name:"换页信息",
						time:"2017"
					},
					{id:"005",name:"换页信息",
						time:"2017"
					}
				] ;
		var def = can.Deferred();
			def.resolve({
					_data :detail,
					count:3
				});
			return def;
		/*var detail =[
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
				
			] ;
		var data  = {
			_data : detail,
			count : 3
		};
		return data;*/

	}
}); 