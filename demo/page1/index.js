Page({
	data:{
		name : "this is a page viewModel",
		field1 : "this is field1",
		field2 : false
	},
	onClick:function(){
		alert("OK");
	},
	onValidateValue:function(name,value){
		if (name=="field1"&&value!="123456")
			return "xxewwer";
		if (name=="field2"&&value==true)
			return "选择了....";
		//return undefined;
	},
	onField1Click:function(){
		//alert("onField1Click");
	},
	onClick:function(){
		MF.getCurrentPage().viewModel.data.attr("field1","123456");
	}
});