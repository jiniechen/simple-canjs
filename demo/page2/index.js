var app=getApp();

Page({
	dialog:false,
	onData:function(){
		return Remote.Student.new({	
			name:"张三",
			school:"深圳南方",
			course:[
				{id:"001",name:"计算机基础",
					schedule:[{time:"2017"},{time:"2016"}]
				},
				{id:"002",name:"JAVA",
					schedule:[{time:"2017"},{time:"2016"}]
				},
				{id:"003",name:"数据结构",
					schedule:[{time:"2017"},{time:"2016"}]
				},
				{id:"004",name:"算法",
					schedule:[{time:"2017"},{time:"2016"}]
				}
			]
		});
	}
});