/**
 * Created by duxi on 16/9/8.
 */
/**
 * Created by ihandysoft on 16-1-26.
 */
$(document).ready(function(){


    // console.log('0');

    $("#login").submit(function(){

        login();

    });
    //$("#loginButton").click(function(){
    //    login();
    //
    //});

});

function login(){
    var user=$("#username").val();
    var pass=$("#password").val();

    var Tip="Your password were incorrect.";

   // var Jdata={'userName' : user,'password':pass};

    $.ajax({
        type:"post",
        //url?要获取数据的url （默认为当前页地址）发送请求的地址。
        url:"http://52.38.232.39:8080/article/login",
        //data:"userName="+user+"&password="+pass,
        data:{'userName' : user,'password':pass},
        //data: JSON.stringify(Jdata),
        //dataType: "jsonp",
        //dataType: 'jsonp',
        //crossDomain: true,

        //processData:false,

        beforeSend:function(){},

        success:function(msg){
            //if(msg == "success")

            console.log("0");

            if(msg.success == "yes")
            {
                //$("#confirm").text("登陆成功");
                window.location.href="admin.html?user="+user;
                console.log("1")
            }else
            {
                alert(Tip);
                console.log("2")
            }
        },
        //error:function(msg){
        //    //console.log("0");
        //    //console.log(msg);
        //    if(msg.success == "yes")
        //    {
        //        //$("#confirm").text("登陆成功");
        //        //window.location.href="admin.html";
        //        //console.log("1");
        //    }else
        //    {  console.log(msg.responseText);
        //        alert(msg);
        //        //window.location.href="admin.html";
        //
        //
        //    }
        //}

    })

}