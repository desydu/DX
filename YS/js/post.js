/**
 * Created by dx on 16/9/9.
 */

$(document).ready(function(){
    var url=window.location.href;
    //if(url.split('=')[1]){
        $('#logout').click(function(){
            window.location.href='home.html';
        });
        $('#alter').click(function(){
            window.location.href='psw.html';
        });




        var date = new Date();

        var month=date.getMonth()+1;
        console.log(date.getFullYear().toString().substring(2,4)+month+date.getDate());


        var url=window.location.href;

        //解析url
        var strings =url.split('?')[1];
        if(strings){
            var string=strings.split('=');
            if(string[0]=='id'){
                //alert('id');
                $('#articleID').val(string[1]);
                loadInfo(string[1]);


            }else{
                //alert('module');
                $('#module').val(string[1]);
                $('#articleID').val(jQuery.now());

            }
        }else{

            $('#articleID').val(jQuery.now());

        }
        //console.log(url.split('='))
        // $('#module').val((url.split('='))[1]);



        $("#post").submit(function(e){
            e.preventDefault();
            
            var articleID=$('#articleID').val();
            var title=$('#title').val();
            var abstract=$('#abstract').val();
            var content=$('#content').val();
            var module=$('#module').val();
            // var files=$('#img').val();



            content = content.replace (/[\r\n]/g, '<br/>');

            var editTime=date.getFullYear().toString().substring(2,4)+month+date.getDate();

            console.log(module);

            var formData = new FormData();
            formData.append("articleID", articleID);
            formData.append("title", title); // 数字123456被立即转换成字符串"123456"
            formData.append("abstract", abstract); // 数字123456被立即转换成字符串"123456"
            formData.append("content", content); // 数字123456被立即转换成字符串"123456"
            formData.append("module", module); // 数字123456被立即转换成字符串"123456"



            if($('#img').get(0).files[0]){
                //formData.append("files",  $("#img")[0].files[0]);

                //alert($("#img")[0].files[0]);
                

                formData.append("files",  $("#img")[0].files[0]);


            }else{
                formData.append("files", '');
            }
            formData.append("editTime", editTime); // 数字123456被立即转换成字符串"123456"
            // console.log(formData.articleID)



            console.log($('#img').get(0).files[0]);
            console.log(formData.get('articleID'));
            alert('');

            $.ajax({
                type:"post",
                //url?要获取数据的url （默认为当前页地址）发送请求的地址。
                url:"http://139.224.40.56:8080/article/addArticle",
                //data:"userName="+user+"&password="+pass,
                // data:{'articleID' : articleID,'title' : title , 'content' : content,'module':module,'files':'','editTime':editTime},
                // data:{'articleID' : '','title' :'' , 'content' : '','module':'','files':'','editTime':''},
                data:formData,
                // data:formData,
                processData: false,  // 告诉jQuery不要去处理发送的数据
                contentType: false, // 告诉jQuery不要去设置Content-Type请求头
                beforeSend:function(){},

                success:function(msg){


                    console.log("0");

                    if(msg.success == "yes")
                    {
                        //$("#confirm").text("登陆成功");
                        window.location.href="admin.html";
                        console.log("1");
                        alert('successfully post');

                    }else
                    {
                        alert(msg.data);
                        // alert(Tip);
                        console.log("2")
                        alert('failed');

                    }
                },


            })

        })


    //
    //}else{
    //    window.location.href='home.html'
    //
    //}
    //


})
function loadInfo(val){

    $.ajax({
        type:"post",
        //url?要获取数据的url （默认为当前页地址）发送请求的地址。
        async: false,
        url:"http://139.224.40.56:8080/article/articleInfo",
        data:{'articleID' : val},

        beforeSend:function(){},

        success:function(msg){


            if(msg.success == "yes")
            {
                //alert('s');

                $('#module').val(msg.data.module.replace('00',''));
                $('#content').val(msg.data.content);
                $('#title').val(msg.data.title);
                $('#abstract').val(msg.data.abstract);
                console.log(msg.data.abstract);



                if(msg.data.filePath){
                    //getImage(msg.data.filePath);
                    var url='http://139.224.40.56:8080/'+msg.data.filePath.slice(7);
                    console.log(url);
                    //$("#img")[0].files[0].value=url;
                    //$("#img")[0].files.value=url;


                }
                //$('#img').val(msg.data.filePath);

            }else
            {

            }
        },


    });

}

function getImage(path){

    $.ajax({
        type:"post",
        //url?要获取数据的url （默认为当前页地址）发送请求的地址。
        async: false,
        url:"http://139.224.40.56:8080/article/articleImg",
        data:{'filePath' : path},

        beforeSend:function(){},

        success:function(msg){


            if(msg)
            {
                alert('f');
                //$("#img")[0].files[0]


            }else
            {

            }
        },


    });
}