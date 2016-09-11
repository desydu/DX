/**
 * Created by duxi on 16/9/10.
 */

$(document).ready(function(){

    //$('#art-content').html('asfd+<img src="../source/6.png">+adsf');
    //$('#art-content').html('asfd <img src="http://localhost:8080/upload_900473f8b77a9efcd0651f0a71432a36"> adsf');

    var url=window.location.href;

    //解析url
    var articleID =url.split('=')[1];
    loadInfo(articleID);



})
function loadInfo(val){

    $.ajax({
        type:"post",
        //url?要获取数据的url （默认为当前页地址）发送请求的地址。
        async: false,
        url:"http://52.38.232.39:8080/article/articleInfo",
        data:{'articleID' : val},

        beforeSend:function(){},

        success:function(msg){


            if(msg.success == "yes")
            {

                console.log('s');
                $('#art-title').html(msg.data.title);
                $('#art-content').html(msg.data.content);

                var content=msg.data.content;
                //var reg=new RegExp("\r\n","g");
                //content= content.replace(reg,'<br/>');
                //
                //
                //console.log(content);
                $('#art-content').html(content);

                $('#art-time').html(msg.data.editTime);

                if(msg.data.filePath){
                    console.log('img');
                    //var content=msg.data.content;
                    //var reg=new RegExp("\r\n","g");
                    //content= content.replace(reg,"<br>");
                    //$('#art-content').html(msg.data.content);

                    $('#art-content img').attr('src','http://52.38.232.39:8080/'+msg.data.filePath.slice(7));
                    //var index=content.indexOf("<img>");


                }
                //if(msg.data.filePath){
                //    getImage(msg.data.filePath);
                //}
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
        url:"http://52.38.232.39:8080/article/articleImg",
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