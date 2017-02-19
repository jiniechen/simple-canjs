var app=getApp();

Page({
	dialog:false,
	onData:function(){
		return Remote.Student.new({	
			name:"张三",
			school:"深圳南方",
			course:[
				{id:"001",name:"计算机基础"},
				{id:"002",name:"JAVA"},
				{id:"003",name:"数据结构"},
				{id:"004",name:"算法"}
			]
		});
	}
});