document.addEventListener('plusready', function(a) {
    var first = '';
    plus.key.addEventListener('backbutton', function() {
        //获取地址栏目中的url
        var urls = location.hash.split('/')[1]
        if (urls === 'index') { //判断是首页的时候点击二次退出app
            if (new Date().getTime() - first < 3000) {
                // console.log("关闭程序")
                plus.runtime.quit();
            } else {
                alertMsg("再按一次退出应用"); //自定义的弹窗
                first = new Date().getTime();
            }
        } else {
            history.go(-1)
        }
    }, false);
});
window.alertMsg = function(txt) {
    var alertFram = document.createElement("DIV");
    alertFram.id = "alertFram";
    alertFram.style.position = "fixed";
    alertFram.style.width = "100%";
    alertFram.style.textAlign = "center";
    alertFram.style.bottom = "10%";
    alertFram.style.zIndex = "10001";
    strHtml = " <span style=\"font-family: 微软雅黑;font-size:0.75rem;display:inline-block;background:#333;color:#fff;padding:0 0.625rem;line-height:2.25rem;border-radius:0.375rem; \">" + txt + "</span>";
    alertFram.innerHTML = strHtml;
    document.body.appendChild(alertFram);
    setTimeout((function() {
        alertFram.style.display = "none";
    }), 2000);
};