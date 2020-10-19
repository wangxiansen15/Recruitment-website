function displaySubMenu(li) {
 
    var subMenu = li.getElementsByTagName("ul")[0];
 
    subMenu.style.display = "block";
 
}
 
function hideSubMenu(li) {
 
    var subMenu = li.getElementsByTagName("ul")[0];
 
    subMenu.style.display = "none";
 
}
$(function(){
    if (localStorage.getItem("SESSIONID")==null){
        window.location.href="../login.html";
    }
    else{
        d=localStorage.getItem("DATE");
        var d2=new Date();
        d2=d2.getTime();
        if((d2-d)>1800000){
            window.location.href="../login.html";
            localStorage.clear();
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
            $("#jieshao").click(function () {
                window.location.href='departmental.html';
            });
            $("#chengjiu").click(function () {
                window.location.href='instructors.html';
            });
            $("#zhuangtai1").click(function () {
                window.location.href='personalInformation.html';
            });
            $("#fanhui").click(function () {
                window.location.href='personalInformation.html';
            });
            var str1='',len;
            $.ajax({
                type: "POST",
                url: "http://182.92.66.26:8989/recruitweb/getAllMsg",
                dataType: "json",
                xhrFields: { withCredentials: true },
                success: function (data) {
                    len = data.allMsg.length - 1;
                    for (var i = data.allMsg.length - 1; i >= 0; i--)
                        str1 += `<div class="inform"><h2>${data.allMsg[i].title}</h2><p>${data.allMsg[i].content}</p><span class="shijian">&nbsp;&nbsp;&nbsp;时间:${data.allMsg[i].date}</span><span class="faburen">发布人:${data.allMsg[i].author}&nbsp;&nbsp;&nbsp;</span></div>`;
                    $("#container").append(str1);
                },
                error:function (jqXHR) {
                    alert("发生错误"+jqXHR.status);
                }
            });
        }
    }
});