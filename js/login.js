var judge = 0;
function displaySubMenu(li) {
        var subMenu = li.getElementsByTagName("ul")[0];

        subMenu.style.display = "block";

    }

function hideSubMenu(li) {

        var subMenu = li.getElementsByTagName("ul")[0];

        subMenu.style.display = "none";

}

function copyText()
{
    
    if (judge==0){
        alert("请登录");
    }
    else{
        window.location.href='html/personalInformation.html';
    }
}

$(function () {
    //初始获取验证码
    $.ajax({
        type:"GET",
        url:"http://182.92.66.26:8989/recruitweb/imageServlet" ,
        success:function () {
            $("#yzm1").html("<img class=img2 src='http://182.92.66.26:8989/recruitweb/imageServlet'>");
        },
        error:function (jqXHR) {
            alert("发生错误:"+jqXHR.status);
        }
    });
    //点击修改验证码
    $("#yzm1").click(function () {
        $.ajax({
            type:"GET",
            url:"http://182.92.66.26:8989/recruitweb/imageServlet" ,
            success:function () {
                $("#yzm1").html("<img class=img2 src='http://182.92.66.26:8989/recruitweb/imageServlet'>");
            },
            error:function (jqXHR) {
                alert("发生错误:"+jqXHR.status);
            }
        });
    });
    //登录
    var flag=0;
    if (flag===0){
        $("#dl").click(function () {
            flag=1;
            //检测账号是否注册
            $.ajax({
                type:"POST",
                url:"http://182.92.66.26:8989/recruitweb/findStuNumServlet",
                dataType:"json",
                data:{
                    stuNum:$("#id").val(),
                },
                success:function (data) {
                    if(data==="尚未注册"){
                        alert("该学号尚未注册");
                        $.ajax({
                            type:"GET",
                            url:"http://182.92.66.26:8989/recruitweb/imageServlet" ,
                            success:function () {
                                $("#yzm1").html("<img class=img2 src='http://182.92.66.26:8989/recruitweb/imageServlet'>");
                                flag=0;
                            },
                            error:function (jqXHR) {
                                alert("发生错误:"+jqXHR.status);
                                flag=0;
                            }
                        });
                    }
                    else{
                        //密码账号验证码上传到后端
                        $.ajax({
                            type:"POST",
                            url:"http://182.92.66.26:8989/recruitweb/loginServlet",
                            xhrFields:{
                                withCredentials:true
                            },
                            dataType:"json",
                            data:{
                                code:$("#yzm").val(),
                                stuNum:$("#id").val(),
                                password:$("#password").val(),
                            },
                            success:function (data) {
                                console.log(data);
                                if (data.status==="0") {
                                    $(".sideright").css("display", "none");
                                    judge = 1;
                                    localStorage.setItem("SESSIONID", data.JESESSIONID);
                                    var d = new Date();
                                    d = d.getTime();
                                    localStorage.setItem("DATE", d)
                                    document.cookie = data.JESESSIONID;
                                    $.ajax({
                                        type: "POST",
                                        url: "http://182.92.66.26:8989/recruitweb/getUserServlet",
                                        dataType: "json",
                                        xhrFields: {withCredentials: true},
                                        success: function (data) {
                                            if (data.user_info.stuNum == "凡路团队")
                                                window.location.href = "html/manager.html";
                                            else
                                                window.location.href = 'html/personalInformation.html';
                                        },
                                        error: function (jqXHR) {
                                            alert("发生错误:" + jqXHR.status);
                                        }
                                    });
                                }
                                else if (data.status=="-1") {
                                    alert("密码错误");
                                    $.ajax({
                                        type:"GET",
                                        url:"http://182.92.66.26:8989/recruitweb/imageServlet" ,
                                        success:function () {
                                            $("#yzm1").html("<img class=img2 src='http://182.92.66.26:8989/recruitweb/imageServlet'>");
                                            flag=0;
                                        },
                                        error:function (jqXHR) {
                                            alert("发生错误:"+jqXHR.status);
                                            flag=0;
                                        }
                                    });
                                }
                                else {
                                    alert("验证码错误");
                                    flag=0;
                                    $.ajax({
                                        type:"GET",
                                        url:"http://182.92.66.26:8989/recruitweb/imageServlet" ,
                                        success:function () {
                                            $("#yzm1").html("<img class=img2 src='http://182.92.66.26:8989/recruitweb/imageServlet'>");
                                        },
                                        error:function (jqXHR) {
                                            alert("发生错误:"+jqXHR.status);
                                        }
                                    });
                                }
                            },
                            error:function (jqXHR) {
                                alert("发生错误"+jqXHR.status);
                                flag=0;
                            }
                        });
                    }
                },
                error:function (jqXHR) {
                    alert("发生错误"+jqXHR.status);
                    flag=0;
                }
            });
        })
    }
});
