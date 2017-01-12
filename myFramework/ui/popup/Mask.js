function show() {
	MF.Popup.show({
		content : "<div class=\"loading loading-light gray\">加载中</div>",
		placement : "center",
		backdrop : true,
		display : "modal",
		backdropDismiss : false,
		autoHide : false,
		animate:0,//不执行动画
		duration:0//不执行动画
	});
};

function toast(message) {
	MF.Popup.show({
		content : message,
		placement : "center",
		backdrop : true,
		display : "modal",
		backdropDismiss : false,
		autoHide : false,
		animate:0,//不执行动画
		duration:0//不执行动画
	});
};

function hide() {
	MF.Popup.hide();
}

MF.Mask = {
	show : show,
	toast : toast,
	hide : hide
}