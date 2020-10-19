$(function () {
        //检测登录
        if (localStorage.getItem("SESSIONID")==null){
            window.location.href="../login.html";
        }
        else{
            d=localStorage.getItem("DATE");
            var d2=new Date();
            d2=d2.getTime();
            if((d2-d)>1800000){
                localStorage.clear();
                window.location.href="../login.html";
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
                var ge=document.getElementById("anw3").getElementsByTagName("input");
                ge[0].onclick=function () {
                    if(ge[0].checked){
                        ge[1].checked=false;
                    }
                    else{
                        ge[1].checked=true;
                    }
                };
                ge[1].onclick=function () {
                    if(ge[1].checked){
                        ge[0].checked=false;
                    }
                    else{
                        ge[0].checked=true;
                    }
                };
                $.ajax({
                    type:"POST",
                    url:"http://182.92.66.26:8989/recruitweb/findStuNumServlet",
                    dataType:"json",
                    xhrFields: { withCredentials: true },
                    success:function (data) {
                        if(data==="尚未注册"){
                            alert("请先登录");
                        }
                        else{
                            $.ajax({
                                type:'POST',
                                url:'http://182.92.66.26:8989/recruitweb/getUserQuestionnaireServlet',
                                dataType:'json',
                                xhrFields: { withCredentials: true },
                                success:function (data) {
                                    if(data.status=='-1'){
                                        $("#qd").click(function () {
                                            var str1='',str2='',
                                                check=document.getElementById("anw2").getElementsByClassName("check"),
                                                check2=document.getElementById("anw3").getElementsByTagName("input");
                                            for(var i=0;i<4;i++){
                                                if(check[i].checked) {
                                                    str1+=check[i].name+';';
                                                }
                                            }
                                            for(var i=0;i<2;i++){
                                                if(check2[i].checked){
                                                    str2+=check2[i].name+';';
                                                }
                                            }
                                            if(str1==null||str2==null||$("#xuanxiang option:selected").val()=="未选择"||$("#xuanxiang2").val()==''){
                                                alert("您有数据未填写");
                                            }
                                            else{
                                                $.ajax({
                                                    type:'POST',
                                                    url:'http://182.92.66.26:8989/recruitweb/subQuestionnaireServlet',
                                                    dataType:'json',
                                                    xhrFields: { withCredentials: true },
                                                    data:{
                                                        anw1:$("#xuanxiang option:selected").val(),
                                                        anw2:str1,
                                                        anw3:str2,
                                                        anw4:$("#xuanxiang2").val(),
                                                    },
                                                    success:function (data) {
                                                        if (data=='0'){
                                                            alert("上交成功");
                                                            window.location.href="personalInformation.html";
                                                        }
                                                        else{
                                                            alert("上交失败");
                                                            console.log(a[0],$("#xuanxiang option:selected").val());
                                                            console.log($("#xuanxiang2").val());
                                                        }
                                                    },
                                                    error:function (jqXHR) {
                                                        alert("发生错误"+jqXHR.status);
                                                    }
                                                });
                                            }
                                        });
                                        $("#qx").click(function () {
                                            window.location.href="personalInformation.html";
                                        });
                                    }
                                    else{
                                        var op=document.getElementById("xuanxiang").getElementsByTagName("option");
                                        for(var i=0;i<7;i++){
                                            if (op[i].value==data.questionnaire.anw1){
                                                op[i].selected=true;
                                            }
                                        }
                                        var anw2=data.questionnaire.anw2.split(';'),
                                            an2=document.getElementById("anw2").getElementsByClassName("check");
                                        for(var i=0;i<anw2.length;i++){
                                            for(var j=0;j<4;j++){
                                                if (an2[j].name==anw2[i])
                                                    an2[j].checked=true;
                                            }
                                        }
                                        var anw3=data.questionnaire.anw3.split(';'),
                                            an3=document.getElementById("anw3").getElementsByTagName("input");
                                        for(var i=0;i<anw3.length;i++){
                                            for(var j=0;j<2;j++){
                                                if (an3[j].name==anw3[i])
                                                    an3[j].checked=true;
                                            }
                                        }
                                        $("#xuanxiang2").val(data.questionnaire.anw4);
                                        $("#qd").click(function () {
                                            var str1='',str2='',
                                                check=document.getElementById("anw2").getElementsByClassName("check"),
                                                check2=document.getElementById("anw3").getElementsByTagName("input");
                                            for(var i=0;i<4;i++){
                                                if(check[i].checked) {
                                                    str1+=check[i].name+';';
                                                }
                                            }
                                            for(var i=0;i<2;i++){
                                                if(check2[i].checked){
                                                    str2=check2[i].name;
                                                }
                                            }
                                            if(str1==null||str2==null||$("#xuanxiang option:selected").val()=="未选择"||$("#xuanxiang2").val()==''){
                                                alert("您有数据未填写");
                                            }
                                            else{
                                                $.ajax({
                                                    type:'POST',
                                                    url:'http://182.92.66.26:8989/recruitweb/editUserQuestionnaireServlet',
                                                    dataType:'json',
                                                    xhrFields: { withCredentials: true },
                                                    data:{
                                                        anw1:$("#xuanxiang option:selected").val(),
                                                        anw2:str1,
                                                        anw3:str2,
                                                        anw4:$("#xuanxiang2").val(),
                                                    },
                                                    success:function (data) {
                                                        if (data=='0'){
                                                            alert("修改成功");
                                                            window.location.href="personalInformation.html";
                                                        }
                                                        else{
                                                            alert("修改失败");
                                                        }
                                                    },
                                                    error:function (jqXHR) {
                                                        alert("发生错误"+jqXHR.status);
                                                    }
                                                });
                                            }
                                        });
                                        $("#qx").click(function () {
                                            window.location.href="personalInformation.html";
                                        });
                                    }
                                },
                                error:function (jqXHR) {
                                    alert("发生错误"+jqXHR.status);
                                }
                            })
                        }
                    },
                    error:function (jqXHR) {
                        alert("发生错误:"+jqXHR.status);
                    }
                });
            }
        }
});