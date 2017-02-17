//扩展自定义的校验方法
//创建一个remote  Remote.define(Name,{});
Remote.define("Student",{
	validators:[
	//校验数组需要 以  "name[]".attrName 来校验数组的每一项
		/*{attr:"detail[].field1",proc:function(value){
			if(value != "xxxx"){
				return "error";
			}
		}},
		{attr:"field2",proc:function(value){
			if (value != false) {
				return "已开启";
			}
		}},*/
		{attr:"field1",proc:function(value){
			if(value != "xxxx"){
				return "只能为字符串";
			}
		}},
		/*调用canjs的校验方法*/
		{attr:"email",proc:"validateFormatOf",opt:[/[\w\.]+@\w+\.\w+/,{message:"格式错误"}]},
		{attr:"field1",proc:"validatesNumericalityOf"}
	]
});

Page({
	onData:function(){
		return Remote.Student.new({	
			name : "this is a page viewModel",
			field1 : "this is field1",
			field2:true,
			startDate:"",
			search:"",
			getcode:"",
			vcode:"",
			direction:"",
		    email:"444740823@qq.com",
		    chose1:"zh",
		    chose2:"xz",
		    card:"02",
		    citys:"sz",
		    area:"ns",
		   	radio:"blue",
		    ch:["blue",undefined],
			detail:[
			{
				field1:"this detail field1",
				name:"xxx",
				age:"18",
				sex:"man"
			},
			{
				field1:"this detail field2",
				name:"xxx",
				age:"18",
				sex:"man"
			},
			{
				field1:"this detail field3",
				name:"xxx",
				age:"18",
				sex:"man"
			}/*,
			{
				field1:"this detail field4"
			},
			{
				field1:"this detail field5"
			},
			{
				field1:"this detail field6"
			},
			{
				field1:"this detail field7"
			},
			{
				field1:"this detail field8"
			},
			{
				field1:"this detail field9"
			}*/
		]
		});
	},
	listRows:[
		{field:"field"},{name:"姓名"},{sex:"性别"},{age:"年龄"}
	],
	
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
	onChose1ValueChange:function(name,newVal){
			
		var _page = this,
			_chose = $("#chose2"),
			instance = _chose.viewModel().mobi;

		_chose.viewModel().attr("_options",_page[newVal]);

		instance.clear();
		instance.init();
		
	},
	onSureClick:function(){
		//Mask.toast("恭喜您,提交成功");
		//debugger;
		var data = getCurrentPage().onData();
		
		exports.tools.validate(data,function(){
			alert("正确数据");
		})
	},
	onCancelClick:function(){
		exports.Mask.show();
	},
	onToastClick:function(){
		exports.Mask.toast("这是一个toast");
	}
});
