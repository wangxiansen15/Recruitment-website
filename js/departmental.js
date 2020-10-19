function displaySubMenu() {
 
    var subMenu = document.getElementsByTagName(".div1");
 
    subMenu.style.display = "block";
 
}
 
function hideSubMenu() {
 
    var subMenu = document.getElementsByTagName(".div1");
 
    subMenu.style.display = "none";
 
}
$(function () {
    if(localStorage.getItem("SESSIONID")==null){
        $("#tongzhi").click(function () {
            alert("请先登录");
        });
        $("#zhuangtai").click(function () {
            alert("请先登录");
        });
        $("#chengjiu").click(function () {
            window.location.href='instructors.html';
        });
        $("#fanhui").click(function () {
            window.location.href='../login.html';
        });
    }
    else{
        d=localStorage.getItem("DATE");
        var d2=new Date();
        d2=d2.getTime();
        if((d2-d)>1800000){
            alert("登录信息已超时") ;
            localStorage.clear();
            $("#tongzhi").click(function () {
                alert("请先登录");
            });
            $("#zhuangtai").click(function () {
                alert("请先登录");
            });
            $("#chengjiu").click(function () {
                window.location.href='instructors.html';
            });
            $("#fanhui").click(function () {
                window.location.href='../login.html';
            });
        }
        else{
            document.cookie=localStorage.getItem("SESSIONID");
            $.ajax({
                type:"POST",
                url:"http://182.92.66.26:8989/recruitweb/getUserServlet",
                dataType:"json",
                xhrFields: { withCredentials: true },
                success:function (data) {
                    if(data.user_info.stuNum=="凡路团队")
                        window.location.href="html/manager.html";
                },
                error:function (jqXHR) {
                    alert("发生错误:"+jqXHR.status);
                }
            });
            $("#tongzhi").click(function () {
                window.location.href='notice.html';
            });
            $("#zhuangtai").click(function () {
                window.location.href='personalInformation.html';
            });
            $("#chengjiu").click(function () {
                window.location.href='instructors.html';
            });
            $("#fanhui").click(function () {
                window.location.href='personalInformation.html';
            });
        }
    }
});
