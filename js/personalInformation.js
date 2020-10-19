//状态
function displaySubMenu(li) {
        var subMenu = li.getElementsByTagName("ul")[0];

        subMenu.style.display = "block";

    }

function hideSubMenu(li) {

        var subMenu = li.getElementsByTagName("ul")[0];

        subMenu.style.display = "none";

}


$(function () {
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
                    else if(data==='-2')
                        window.location.href="../login.html";
                },
                error:function (jqXHR) {
                    alert("发生错误:"+jqXHR.status);
                }
            });
            $.ajax({
                type:'POST',
                url:'http://182.92.66.26:8989/recruitweb/getUserQuestionnaireServlet',
                dataType:'json',
                xhrFields: { withCredentials: true },
                success:function (data) {
                    if (data.status=='-1'){
                        var f=confirm("请用户填写问卷");
                        if(f){
                            window.location.href='questionnaire.html';
                        }
                    }
                    else if(data==='-2')
                        window.location.href="../login.html";
                },
                error:function (jqXHR) {
                    alert("发生错误"+jqXHR.status);
                }
            });
            $("#jieshao").click(function () {
                window.location.href='departmental.html';
            });
            $("#chengjiu").click(function () {
                window.location.href='instructors.html';
            });
            $("#tongzhi").click(function () {
                window.location.href='notice.html';
            });
            $("#wenjuan").click(function () {
                window.location.href='questionnaire.html';
            });
            $("#zhuxiao").click(function () {
                $.ajax({
                    type:"POST",
                    url:"http://182.92.66.26:8989/recruitweb/logoutServlet",
                    xhrFields: { withCredentials: true },
                    success:function (data) {
                        if (data!='-2'){
                            window.location.href='../login.html';
                            localStorage.clear();
                        }
                        else
                            alert("注销失败");
                    },
                    error:function (jqXHR) {
                        alert("发生错误"+jqXHR.status);
                    }
                })
            });
        }
    }
    var passwordd;
    //读取信息
    $.ajax({
        type:"POST",
        url:"http://182.92.66.26:8989/recruitweb/getUserServlet",
        dataType:"json",
        xhrFields: { withCredentials: true },
        success:function (data) {
            //获取状态
            $("#name").text(data.user_info.name);
            $("#id").text(data.user_info.stuNum);
            $("#academy").text(data.user_info.academy);
            $("#cls").text(data.user_info.cls);
            $("#youxiang").text(data.user_info.email);
            passwordd=data.user_info.password;
            if(data.user_info.sort==="0")
                $("#sort").text("未通过");
            else if(data.user_info.sort==="1"){
                $("#sort").text("通过");
            }
            else {
                $("#sort").text("未填问卷");
            }
        },
        error:function (jqXHR) {
            alert("发生错误:"+jqXHR.status);
        }
    });
    $("#change").mousemove(function () {
        $("#change1").css("display","block");
    });
    $("#change1").mousemove(function () {
        $("#change1").css("display","block");
    });
    $("#change").mouseout(function () {
        $("#change1").css("display","none");
    });
    $("#change1").mouseout(function () {
        $("#change1").css("display","none");
    });
    var d=document.getElementById("boxbox").getElementsByTagName("div");
    $("#name1").click(function () {
        for(var i=0;i<9;){
            d[i].style.display="none";
            i=i+2
        }
        d[0].style.display="block";
    });
    $("#cls1").click(function () {
        for(var i=0;i<9;){
            d[i].style.display="none";
            i=i+2
        }
        d[2].style.display="block";
    });
    $("#academy1").click(function () {
        for(var i=0;i<9;){
            d[i].style.display="none";
            i=i+2
        }
        d[4].style.display="block";
    });
    $("#email1").click(function () {
        for(var i=0;i<9;){
            d[i].style.display="none";
            i=i+2
        }
        d[6].style.display="block";
    });
    $("#password1").click(function () {
        for(var i=0;i<9;){
            d[i].style.display="none";
            i=i+2
        }
        d[8].style.display="block";
    });
    $("#email2").blur(function () {
        var email2=$("#email2").val(),
            emreg=/^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
        if(emreg.test(email2)==false)
            $("#p5").html("<p style='color: red'>请输入合法邮箱</p>");
        else{
            $.ajax({
                type:"POST",
                url:"http://182.92.66.26:8989/recruitweb/findEmailServlet",
                data:{
                    email:$("#email2").val(),
                },
                success:function (data) {
                    if(data==="尚未注册"){
                        $("#p5").html("<p style='color: green'>成功</p>");
                    }
                    else
                        $("#p5").html("<p style='color: red'>该邮箱已被注册</p>");
                },
                error:function (jqXHR) {
                    alert("发生错误:"+jqXHR.status);
                }
            });
        }
    });
    $("#name2").blur(function () {
        var name2=$("#name2").val();
        var result = Mtils.validation.isChinese(name2);
        if(result==true){
            if(name2.length>1&&name2.length<11)
                $("#p2").html("<p style='color: green'>成功</p>");
            else
                $("#p2").html("<p style='color: red'>字数限制在2-10</p>");
        }
        else{
            $("#p2").html("<p style='color: red'>请输入汉字</p>");
        }
    });
    $("#cls2").blur(function () {
        var cls2=$("#cls2").val();
        if(cls2.length>1&&cls2.length<15)
            $("#p3").html("<p style='color: green'>成功</p>");
        else
            $("#p3").html("<p style='color: red'>字数限制在2-14</p>");
    });
    $("#xy").blur(function () {
        var xy=$("option:selected").val();
        if(xy==="false")
            $("#p4").html("<p style='color: red'>请选择学院</p>");
        else
            $("#p4").html("<p style='color: green'>成功</p>");
    });
    $("#password2").blur(function () {
        var password2=$("#password2").val();
        if(password2.length>7&&password2.length<17)
            $("#p6").html("<p style='color: green'>成功</p>");
        else
            $("#p6").html("<p style='color: red'>字数限制在8-16</p>");
    });
    $("#qr2").click(function () {
        if ($("#p2").text() === "成功") {
            $.ajax({
                type: "POST",
                url: "http://182.92.66.26:8989/recruitweb/updateServlet",
                dataType: "json",
                xhrFields: { withCredentials: true },
                data: {
                    password:passwordd,
                    name: $("#name2").val(),
                    email: $("#youxiang").text(),
                    academy: $("#academy").text(),
                    cls: $("#cls").text(),
                },
                success: function (status) {
                    if(status ==='-2'){
                        alert("请先登录");
                    }
                    else if (status === "0") {
                        d[0].style.display="none";
                        $("#name").text($("#name2").val());
                        $("#p2").text("");
                    }
                    else
                        alert("修改失败");
                },
                error: function (jqXHR) {
                    alert("发生错误:" + jqXHR.status);
                }
            });
        }
        else
            alert("数据未填写正确");
    })
    $("#qx2").click(function () {
        d[0].style.display="none";
    })
    $("#qr3").click(function () {
        if ($("#p3").text() === "成功") {
            $.ajax({
                type: "POST",
                url: "http://182.92.66.26:8989/recruitweb/updateServlet",
                dataType: "json",
                xhrFields: { withCredentials: true },
                data: {
                    password:passwordd,
                    name: $("#name").text(),
                    email: $("#youxiang").text(),
                    academy: $("#academy").text(),
                    cls: $("#cls2").val(),
                },
                success: function (status) {
                    if(status ==="-2"){
                        alert("请先登录");
                    }
                    else if (status === "0") {
                        d[2].style.display="none";
                        $("#cls").text($("#cls2").val());
                        $("#p3").text("");
                    } else
                        alert("修改失败");
                },
                error: function (jqXHR) {
                    alert("发生错误:" + jqXHR.status);
                }
            });
        }
        else
            alert("数据未填写正确");
    })
    $("#qx3").click(function () {
        d[2].style.display="none";
    })
    $("#qr4").click(function () {
        if ($("#p4").text() === "成功") {
            $.ajax({
                type: "POST",
                url: "http://182.92.66.26:8989/recruitweb/updateServlet",
                dataType: "json",
                xhrFields: { withCredentials: true },
                data: {
                    password:passwordd,
                    name: $("#name").text(),
                    email: $("#youxiang").text(),
                    academy: $("option:selected").val(),
                    cls: $("#cls").text(),
                },
                success: function (status) {
                    if(status==="-2"){
                        alert("请先登录");
                    }
                    else if (status === "0") {
                        d[4].style.display="none";
                        $("#academy").text($("option:selected").val());
                        $("#p4").text("");
                    } else
                        alert("修改失败");
                },
                error: function (jqXHR) {
                    alert("发生错误:" + jqXHR.status);
                }
            });
        }
        else
            alert("数据未填写正确");
    })
    $("#qx4").click(function () {
        d[4].style.display="none";
    })
    $("#qr5").click(function () {
        setTimeout(function () {
            if ($("#p5").text() === "成功") {
                $.ajax({
                    type: "POST",
                    url: "http://182.92.66.26:8989/recruitweb/updateServlet",
                    dataType: "json",
                    xhrFields: { withCredentials: true },
                    data: {
                        password:passwordd,
                        name: $("#name").text(),
                        email: $("#email2").val(),
                        academy: $("#academy").text(),
                        cls: $("#cls").text(),
                    },
                    success: function (status) {
                        console.log(status);
                        if(status ==="-2"){
                            alert("请先登录");
                        }
                        else if (status === "0") {
                            d[6].style.display="none";
                            $("#youxiang").text($("#email2").val());
                            $("#p5").text("");
                        } else
                            alert("修改失败");
                    },
                    error: function (jqXHR) {
                        alert("发生错误:" + jqXHR.status);
                    }
                });
            }
            else
                alert("数据未填写正确");
        },1000);
    })
    $("#qx5").click(function () {
        d[6].style.display="none";
    })
    $("#qr6").click(function () {
        if ($("#p6").text() === "成功") {
            $.ajax({
                type: "POST",
                url: "http://182.92.66.26:8989/recruitweb/updateServlet",
                dataType: "json",
                xhrFields: { withCredentials: true },
                data: {
                    password:$("#password2").val(),
                    name: $("#name").text(),
                    email: $("#youxiang").text(),
                    academy: $("#academy").text(),
                    cls: $("#cls").text(),
                },
                success: function (status) {
                    if(status==="-2"){
                        alert("请先登录");
                    }
                    else if (status === "0") {
                        d[8].style.display="none";
                        $("#p6").text("");
                    } else
                        alert("修改失败");
                },
                error: function (jqXHR) {
                    alert("发生错误:" + jqXHR.status);
                }
            });
        }
        else
            alert("数据未填写正确");
    })
    $("#qx6").click(function () {
        d[8].style.display="none";
    })
})