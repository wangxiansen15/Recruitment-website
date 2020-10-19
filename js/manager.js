function displaySubMenu() {
	var div = document.getElementById("reworkmes");
	var div1 = document.getElementById("reworkmes1");
	var div2 = document.getElementById("reworkmes2");
			div.style.display = "block";
			div1.style.display = "none";
			div2.style.display = "none";
}
function huoqu() {
	var div = document.getElementById("reworkmes");
	var div1 = document.getElementById("reworkmes1");
	var div2 = document.getElementById("reworkmes2");
	        div.style.display = "none";
			div1.style.display = "block";
			div2.style.display = "none";
}
function yonghu(){
	var div = document.getElementById("reworkmes");
	var div1 = document.getElementById("reworkmes1");
	var div2 = document.getElementById("reworkmes2");
	        div.style.display = "none";
			div1.style.display = "none";
			div2.style.display = "block";
	$("#xx").css("display","block");
	$("#wenjuan3").css("display","none");
}
$(function(){
	if (localStorage.getItem("SESSIONID")==null){
		window.location.href='../login.html';
	}
	else{
		d=localStorage.getItem("DATE");
		var d2=new Date();
		d2=d2.getTime();
		if((d2-d)>1800000){
			localStorage.clear();
			window.location.href='../login.html';
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
						return;
					else{
						alert("您无权限访问该页面");
						window.location.href="../login.html";
					}
				},
				error:function (jqXHR) {
					alert("发生错误:"+jqXHR.status);
				}
			});
			//发布通知
			$("#fb").click(function () {
				$.ajax({
					type:"POST",
					url:"http://182.92.66.26:8989/recruitweb/findMsgServlet",
					dataType:"json",
					xhrFields: { withCredentials: true },
					data:{
						title:$("#title").val(),
					},
					success:function (data) {
						console.log(data);
						if (data==="尚未存在"){
							$.ajax({
								type:"POST",
								url:"http://182.92.66.26:8989/recruitweb/publishServlet",
								dataType:"json",
								xhrFields: { withCredentials: true },
								data:{
									title:$("#title").val(),
									author:$("#author").val(),
									date:$("#date").val(),
									content:$("#content").val(),
								},
								success:function (data) {
									if(data==="0"){
										alert("发布成功");
										window.location.href="manager.html";
									}
									else if(data=="-3"){
										alert("该账户无权限访问");
									}
									else{
										alert("发布失败");
										console.log($("#title").val(),$("#author").val(),$("#date").val(),$("#content").val());
									}

								},
								error:function (jqXHR) {
									alert("发生错误"+jqXHR.status)
								}
							})
						}
						else if(data=="-3"){
							alert("该账户无权限访问");
						}
						else
							alert("该标题已被使用");
					},
					error:function (jqXHR) {
						alert(jqXHR.status);
					}
				})

			});
			//获取用户信息
			var str=`<tr><td>学号</td><td>姓名</td><td>邮箱</td><td>学院</td><td>班级</td><td>面试情况</td><td>问卷</td></tr>`;
			$.ajax({
				type:"POST",
				url:"http://182.92.66.26:8989/recruitweb/allUserServlet",
				dataType:"json",
				xhrFields: { withCredentials: true },
				success:function (data) {
					if(data.status==='0')
					{
						for(var i=0;i<data.allUser.length;i++){
							str+=`<tr><td>${data.allUser[i].stuNum}</td><td>${data.allUser[i].name}</td><td>${data.allUser[i].email}</td><td>${data.allUser[i].academy}</td><td>${data.allUser[i].cls}</td><td><input type="button" class="btn btn1" name="${data.allUser[i].stuNum}" value="${data.allUser[i].sort}"></input></td><td><input type="button" class="btn btn2" name="${data.allUser[i].stuNum}" value="问卷情况"></input></td></tr>`;
						}
						$("#reworkmes2>table").append(str);
						//修改用户面试情况
						$(".btn1").click(function (){
							if(this.value==='0')
							{
								this.value='1';
								$.ajax({
									type:"POST",
									url:"http://182.92.66.26:8989/recruitweb/interviewServlet",
									dataType:"json",
									xhrFields: { withCredentials: true },
									data:{
										stuNum:this.name,
										interview:this.value,
									},
									success:function (d) {
										if(d==='0')
											return;
										else if(data=="-3"){
											alert("该账户无权限访问");
										}
										else{
											this.value='0';
											alert("修改失败");
										}

									},
									error:function (jqXHR) {
										alert("发生错误:"+jqXHR.status);
									}
								})
							}
							else if(this.value==='1'){
								this.value='0';
								$.ajax({
									type:"POST",
									url:"http://182.92.66.26:8989/recruitweb/interviewServlet",
									dataType:"json",
									xhrFields: { withCredentials: true },
									data:{
										stuNum:this.name,
										interview:this.value,
									},
									success:function (d) {
										if(d==='0')
											return;
										else if(data=="-3"){
											alert("该账户无权限访问");
										}
										else{
											this.value='1';
											alert("修改失败");
										}
									},
									error:function (jqXHR) {
										alert("发生错误:"+jqXHR.status);
									}
								})
							}
							else{
								alert("该用户未填写问卷");
							}
						});
						$('.btn2').click(function () {
							console.log("321321");
							$.ajax({
								type:"POST",
								url:'http://182.92.66.26:8989/recruitweb/findUserQuestionnaireServlet',
								dataType:'json',
								xhrFields: { withCredentials: true },
								data:{
									stuNum:this.name,
								},
								success:function (data) {
									console.log(data);
									if (data.status=='-1'){
										alert("该用户未填写问卷");
									}
									else if(data.status=='0'){
										$("#xx").css("display","none");
										$("#wenjuan3").css("display","block");
										$("#qx").click(function () {
											$("#xx").css("display","block");
											$("#wenjuan3").css("display","none");
										});
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
									}
								},
								error:function (jqXHR) {
									alert("发生错误"+jqXHR.status);
								}
							});
						});
					}
					else if(data.status==="-3"){
						alert("该账户无权限访问");
					}
					else
						alert("发生未知错误");
				},
				error:function (jqXHR) {
					alert("发生错误:"+jqXHR.status);
				}
			});
			//获取通知
			var str1='',len;
			$.ajax({
				type:"POST",
				url:"http://182.92.66.26:8989/recruitweb/getAllMsg",
				dataType:"json",
				xhrFields: { withCredentials: true },
				success:function (data) {
				if(data=="-3"){
					alert("该账户无权限访问");
					return;
				}
				console.log(data);
					len=data.allMsg.length-1;
					for (var i=data.allMsg.length-1;i>=0;i--) {
						str1 += `<div class="quanbu">
								<input class="title1" value="${data.allMsg[i].title}">
								<input type="date" class="shijian" value="${data.allMsg[i].date}">
										 <textarea  cols="40"  rows="4"  style="OVERFLOW: hidden">${data.allMsg[i].content}</textarea>
										 <button class="xiugai" name="${i}">修改</button>
										 <button class="shanchu" name="${data.allMsg[i].title}">删除</button>
										 <input class="author1" value="${data.allMsg[i].author}">
										 </div>`;
					}
					$("#reworkmes1").append(str1);
					//删除通知
					$(".shanchu").click(function () {
						$.ajax({
							type:"POST",
							url:"http://182.92.66.26:8989/recruitweb/delMsgServlet",
							dataType:"json",
							xhrFields: { withCredentials: true },
							data:{
								title:this.name,
							},
							success:function (data1) {
								if (data1==='0') {
									console.log("删除成功");
									window.location.href="manager.html";

								}
								else if(data1=="-3"){
									alert("该账户无权限访问");
								}
								else
									alert("删除失败");
							},
							error:function (jqXHR) {
								alert("发生错误"+jqXHR.status);
							}
						})
					});
					//修改通知
					$(".xiugai").click(function () {
						console.log(document.getElementById("reworkmes1").getElementsByClassName("quanbu"));
						$.ajax({
							type:"POST",
							url:"http://182.92.66.26:8989/recruitweb/updateMsg",
							dataType:"json",
							xhrFields: { withCredentials: true },
							data:{
								old_title:document.getElementById("reworkmes1").getElementsByClassName("quanbu")[len-this.name].getElementsByTagName("button")[1].name,
								title:document.getElementById("reworkmes1").getElementsByClassName("quanbu")[len-this.name].getElementsByTagName("input")[0].value,
								author:document.getElementById("reworkmes1").getElementsByClassName("quanbu")[len-this.name].getElementsByTagName("input")[2].value,
								content:document.getElementById("reworkmes1").getElementsByClassName("quanbu")[len-this.name].getElementsByTagName("textarea")[0].value,
								date:document.getElementById("reworkmes1").getElementsByClassName("quanbu")[len-this.name].getElementsByTagName("input")[1].value,
							},
							success:function(data1) {
								if (data1==='0') {
									alert("修改成功");
								}
								else if(data1=="-3"){
									alert("该账户无权限访问");
								}
								else
								{
									alert("修改失败");
								}
							},
							error:function (jqXHR) {
								alert("发生错误"+jqXHR.status);
							}
						});
					});
				},
				error:function (jqXHR) {
					alert("发生错误"+jqXHR.status);
				},
			});
			$("#zhuxiao").click(function () {
				$.ajax({
					type:"POST",
					url:"http://182.92.66.26:8989/recruitweb/logoutServlet",
					xhrFields: { withCredentials: true },
					success:function (data) {
						if (data!='-2'){
							localStorage.clear();
							window.location.href="../login.html";
						}
					},
					error:function (jqXHR) {
						alert("发生错误"+jqXHR.status);
					}
				})
			});
		}
	}
});