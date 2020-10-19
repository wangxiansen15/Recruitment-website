$(function () {
    //学院要求
    $("#xy").blur(function () {
        var xy=$("option:selected").val();
        if(xy==="false")
            $("#tsk0").html("<p style='color: red'>请选择学院</p>");
        else
            $("#tsk0").html("<p style='color: green'>成功</p>");
    });
    //电子邮箱要求
    $("#yx").blur(function () {
        var yx=$("#yx").val(),
            emreg=/^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
        if(emreg.test(yx)==false)
            $("#tsk1").html("<p style='color: red'>请输入合法邮箱</p>");
        else{
            $.ajax({
                type:"POST",
                url:"http://182.92.66.26:8989/recruitweb/findEmailServlet",
                data:{
                    email:$("#yx").val(),
                },
                success:function (data) {
                    if(data==="尚未注册")
                        $("#tsk1").html("<p style='color: green'>成功</p>");
                    else
                        $("#tsk1").html("<p style='color: red'>该邮箱已被注册</p>");
                },
                error:function (jqXHR) {
                    alert("发生错误:"+jqXHR.status);
                }
            });
        }
    });
    //学号要求
    $("#yh").blur(function () {
        var yh=$("#yh").val(),flag=0;
        if(yh.length!=12)
            $("#tsk2").html("<p style='color: red'>字数限制在12</p>");
        else{
            var r = /^\+?[1-9][0-9]*$/;
            if(r.test(yh)){
                if(yh[0]==2&&yh[1]==0&&yh[2]==1&&yh[3]==9){
                    $.ajax({
                        type:"POST",
                        url:"http://182.92.66.26:8989/recruitweb/findStuNumServlet",
                        dataType:"json",
                        data:{
                            stuNum:$("#yh").val(),
                        },
                        success:function (data) {
                            if(data==="尚未注册")
                                $("#tsk2").html("<p style='color: green'>成功</p>");
                            else
                                $("#tsk2").html("<p style='color: red'>该学号已被注册</p>");
                        },
                        error:function (jqXHR) {
                            alert("发生错误:"+jqXHR.status);
                        }
                    });
                }
                else{
                    alert("该平台只供19级使用，其他年级请通过介绍进入凡路");
                    $("#tsk2").html("<p style='color: red'>失败</p>");
                }
            }
            else{
                $("#tsk2").html("<p style='color: red'>请输入数字</p>");
            }
        }
    });
    //姓名要求
    $("#mz").blur(function () {
        var mz=$("#mz").val();
        var result = Mtils.validation.isChinese(mz);
        if(result==true){
            if(mz.length>1&&mz.length<11)
                $("#tsk3").html("<p style='color: green'>成功</p>");
            else
                $("#tsk3").html("<p style='color: red'>字数限制在2-10</p>");
        }
        else{
            $("#tsk3").html("<p style='color: red'>请输入汉字</p>");
        }
    });
    //班级要求
    $("#bj").blur(function () {

        var bj=$("#bj").val();
        if(bj.length>1&&bj.length<15)
            $("#tsk4").html("<p style='color: green'>成功</p>");
        else
            $("#tsk4").html("<p style='color: red'>字数限制在2-14</p>");
    });
    //密码
    $("#mm").blur(function () {

        var mm=$("#mm").val();
        if(mm.length>7&&mm.length<17)
            $("#tsk5").html("<p style='color: green'>成功</p>");
        else
            $("#tsk5").html("<p style='color: red'>字数限制在8-16</p>");
    });
    //确认密码
    $("#mm1").blur(function () {

        var mm=$("#mm").val();
        var mm1=$("#mm1").val();
        if(mm.length>7&&mm.length<17)
            {
                if(mm===mm1)
                    $("#tsk6").html("<p style='color: green'>成功</p>");
                else
                    $("#tsk6").html("<p style='color: red'>确认密码与密码不一致</p>");
            }
        else
            $("#tsk6").html("<p style='color: red'>字数限制在8-16</p>");
    })
    //提交表单
    $("#tj").click(function () {
        if ($("#tsk0").text() === "成功" && $("#tsk1").text() === "成功" && $("#tsk2").text() === "成功" && $("#tsk3").text() === "成功" && $("#tsk4").text() === "成功" && $("#tsk5").text() === "成功" && $("#tsk6").text() === "成功") {
            $.ajax({
                type: "POST",
                url: "http://182.92.66.26:8989/recruitweb/registerServlet",
                dataType: "json",
                data: {
                    stuNum: $("#yh").val(),
                    password: $("#mm").val(),
                    password1:$("#mm1").val(),
                    name: $("#mz").val(),
                    email: $("#yx").val(),
                    academy: $("option:selected").val(),
                    cls: $("#bj").val(),
                },
                success: function (status) {
                    console.log(status);
                    if (status === "0") {
                        alert("注册成功");
                        window.location.href = '../login.html';
                    } else
                        alert("注册失败");
                },
                error: function (jqXHR) {
                    alert("发生错误:" + jqXHR.status);
                }
            });
        }
        else
            alert("您有数据未填写正确");
    });
    //取消
    $("#qx").click(function () {
        window.location.href="../login.html?none";
    });
});