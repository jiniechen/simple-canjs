Page({
	onShow:function(page){
		page.doIt();
	},
	onHide:function(page){
		//alert("hide:"+page.name);
	},
	onCreate:function(page){
		//alert("create:"+page.name);
	},
	doIt:function(){
		//alert("call function doIt()");
	}
});