define([ "myFramework/Application", "myFramework/utils/Navigator", "myFramework/data/Remote"], function(
		MF, Navigator, Remote) {
	// 增加表单值绑定的Helper
	/*
	 * can.stache.registerHelper('formValue',function(viewModel){ return
	 * function(el){ var _name=viewModel.attr("name"); var
	 * ds=viewModel.attr("dataSet"); ds.bind(_name,function(ev, newVal, oldVal){
	 * if (newVal!=oldVal) el.value = newVal; }); el.onchange = function(){
	 * ds.attr(_name,this.value); }; el.value=ds.attr(_name); } });
	 */
	MF.Navigator = Navigator;
	MF.getCurrentPage=Navigator.getCurrentPage;
	MF.getPages=Navigator.getPages;
	MF.getPage=Navigator.getPage;
	window.Remote=Remote;
	window.MF = MF;
});
