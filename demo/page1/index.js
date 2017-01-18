Page({
	data:{
		name : "this is a page viewModel",
		field1 : "this is field1",
		field2 : false,
		startDate:"",
		search:"",
		getcode:"",
		vcode:"",
		direction:""


	},
	colors:new can.List([

			{label:"红色",checked:"false",value:"1"},
			{label:"蓝色",checked:"true",value:"2"}

		]),
	fruits:new can.List([
			{key:"apple",label:"苹果"},
			{key:"banana",label:"香蕉"}
		]),
	citys:new can.List( [
       {key:"sz" ,value:"深圳"},
       {key:"zh",value:"珠海"}
    ]),
    area:new can.List( [
       {key:"ns" ,value:"南山"},
       {key:"ft",value:"福田"},
       {key:"lh",value:"罗湖"},
    ]),
    zh:new can.List( [
       {key:"xz" ,value:"香洲"},
       {key:"jw",value:"金湾"},
    ]),
    sz:new can.List( [
       {key:"ns" ,value:"南山"},
       {key:"ft",value:"福田"},
       {key:"lh",value:"罗湖"},
    ]),
    go:new can.List([
    		{value:"USA",opt:[{key:"01",txt:"洛杉矶"},{key:"02",txt:"纽约"}]},
    		{value:"China",opt:[{key:"03",txt:"深圳"},{key:"04",txt:"香港"}]}
    	]),
    config:{
    	theme: 'mobiscroll',  
        lang: 'zh',           
        display: 'bottom',
        dateFormat:"yy-mm-dd "
    },
	onClick:function(){
		alert("OK");
	},
	onValidateValue:function(name,value){
		if (name=="field1"&&value!="123456")
			return "xxewwer";
		if (name=="field2"&&value==true)
			return "选择了....";
		if (name=="startDate"&&value!="1")
			return "投保日期填写错误";
		if (name=="search"&&value!="123")
			return "您所查找的信息不存在....";
		if (name=="getcode"&&value!="1234")
			return "验证码输入错误";
		if (name=="vcode"&&value!="1234")
			return "验证码输入错误";
		if (name=="direction"&&value!="1234")
			return "您输入的内容有误";
		
		//return undefined;
	},
	onView1Click:function(){

		
		//MF.Mask.toast("报错了,我来看看样式");
	

	},
	onClick:function(){
		//MF.getCurrentPage().viewModel.data.attr("field1","123456");
	},
	onCitysValueChange:function(name,newVal){
		
		
		var _page = this;
		
		$("#area").viewModel().attr("options",_page[newVal]);
	
		
	},
	onChose1ValueChange:function(name,newVal){
		
		
		var _page = this,
			_chose = $("#chose2");
			instance = _chose.viewModel().mobi;

		_chose.viewModel().attr("options",_page[newVal]);

		instance.clear();
		instance.init();
		
	},
	onSureClick:function(){
		MF.Mask.toast("恭喜您,提交成功");
	}


});