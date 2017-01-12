define({
	load:function(name,req,onload){
		'use strict';
		var html="text!"+name+".stache";
		var js=name;
		req([html,js],function(tmpl){
			//最后一个页面对象为新建对象
			var _pages=MF.Navigator.getPages();
			var _page=_pages[_pages.length-1];
			_page.name=name;
			_page.setStache(tmpl);
			onload();
		})
	}
});