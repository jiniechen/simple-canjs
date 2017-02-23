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

	dialog:true,
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
		var name  = "当前页数"+pageNumber;
		 if(pageNumber == 3){
			var def = can.Deferred();
			def.reject({
				message:"error"
			});
			
			return def;	
		}else{
			var detail =[
				{id:"001",name:name,
					time:"2017"
				},
				{id:"002",name:name,
					time:"2017"
				},
				{id:"003",name:name,
					time:"2017"
				},
				{id:"004",name:name,
					time:"2017"
				},
				{id:"005",name:name,
					time:"2017"
				}
			] ;
		var def = can.Deferred();
			def.resolve({
					_data :detail,
				});
			return def;
		}
	},
	onScrollData:function() {
		var def = can.Deferred();
		var detail =[
					{id:"001",name:"当前页数1",
						time:"2017"
					},
					{id:"002",name:"当前页数1",
						time:"2017"
					},
					{id:"003",name:"当前页数1",
						time:"2017"
					},
					{id:"004",name:"当前页数1",
						time:"2017"
					},
					{id:"005",name:"当前页数1",
						time:"2017"
					}
				] ;
		var def = can.Deferred();
		def.resolve({
					_data :detail,
					count:3
				});
		return def;		
	}
}); 