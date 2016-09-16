/**
 * Created by ihandysoft on 16-2-4.
 */
$(document).ready(function(){
    $("#alter").submit(function(){
    //$("#resetButton").click(function(){
        var user=$("#userName").val();
        var oldPass=$("#oldPassword").val();
        var newPass=$("#newPassword").val();

        var Tip="Your password were incorrect.";


        //if(verifyP()){
            $.ajax({
                type:"post",
                //url?要获取数据的url （默认为当前页地址）发送请求的地址。
                url:"http://139.224.40.56:8080/article/resetPassword",
                async: false,
                //data:"userName="+user+"&password="+pass,
                data:{'userName' : user,'oldPassword' : oldPass , 'newPassword' : newPass},


                beforeSend:function(){},

                success:function(msg){


                    console.log("0");

                    if(msg.success == "yes")
                    {
                        //$("#confirm").text("登陆成功");
                        window.location.href="home.html";
                        console.log("1")
                    }else
                    {
                        alert(msg.data);
                        alert(Tip);
                        console.log("2")
                    }
                },

            })
        //}
    })



})