Page({
	onShow:function(page){
		page.doIt();
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
	events:{
		"#d1 click":function(){
			alert("d1 clicked....");
		}
	}
});