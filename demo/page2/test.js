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
		return "ajaxDone2.html";
		/*var jsonData = can.ajax({
			url:"ajaxDone1.html"
		});
		return jsonData;*/
	
	},
	onScrollData:function() {
		return "ajaxDone1.html";
		/*var jsonData = can.ajax({
			url:"ajaxDone1.html"
		});
		return jsonData;*/
	}
}); 