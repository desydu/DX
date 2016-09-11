/**
 * Created by duxi on 16/9/8.
 */

$(document).ready(function(){

    var url=window.location.href;
    //if(url.split('=')[1]){


        var articleID=new Array();
        var articleIDA=new Array();
        var articleIDB=new Array();


        articleID=loadArgument();
        articleIDA=articleID[0];
        articleIDB=articleID[1];

        console.log(articleIDA.length);
        console.log(articleIDB.length);

        var totalID=articleIDA.concat(articleIDB);

        totalInfo=loadInfo(totalID);
        console.log(totalInfo.length);

        loadView(totalInfo);


        $('#logout').click(function(){
            window.location.href='home.html'
        });
        $('#alter').click(function(){
            window.location.href='psw.html'
        });
        $('.delete').click(function(){

            del($(this).val(),totalInfo[$(this).val()].articleID,totalInfo[$(this).val()].module.replace('00',''));

        });
        $('.alter').click(function(){
            alter(totalInfo[$(this).val()].articleID);
            //del($(this).val(),totalInfo[$(this).val()].articleID,totalInfo[$(this).val()].module.replace('00',''));

        });
        $('.post').click(function(){
            window.location.href='post.html?module='+$(this).attr('name');
        })


    //}else{
    //    window.location.href='home.html'
    //}


});
function loadArgument(){
    var articleIDA=new Array();
    var articleIDB=new Array();

    $.ajax({
        type:"post",
        //url?要获取数据的url （默认为当前页地址）发送请求的地址。
        async: false,
        url:"http://52.38.232.39:8080/article/moduleArticleID",
        data:{'module' : 'moduleA'},
        beforeSend:function(){},
        success:function(msg){
            if(msg.success == "yes")
            {
                //$("#confirm").text("登陆成功");
                articleIDA=msg.data;
                // console.log(articleIDA.length);
                // console.log(articleIDA);
            }else
            {
                // alert(Tip);
            }
        },


    });

    $.ajax({
        type:"post",
        //url?要获取数据的url （默认为当前页地址）发送请求的地址。
        async: false,

        url:"http://52.38.232.39:8080/article/moduleArticleID",
        data:{'module' : 'moduleB'},


        beforeSend:function(){},

        success:function(msg){

            if(msg.success == "yes")
            {
                //$("#confirm").text("登陆成功");
                articleIDB=msg.data;
                // console.log(articleIDB)
            }else
            {
                // alert(Tip);
                // console.log("2")
            }
        },


    });
    return [articleIDA,  articleIDB];


}
function loadInfo(articleIDA){
    var AInfo= [];
    for (var i=0;i<articleIDA.length;i++){
        // var title;
        // var editTime;
        $.ajax({
            type:"post",
            //url?要获取数据的url （默认为当前页地址）发送请求的地址。
            async: false,
            url:"http://52.38.232.39:8080/article/articleInfo",
            data:{'articleID' : articleIDA[i]},

            beforeSend:function(){},

            success:function(msg){


                if(msg.success == "yes")
                {

                    AInfo.push(msg.data);


                }else
                {
                    console.log(articleIDA[i]);
                    console.log(msg.data);
                }
            },


        });

    };


    return AInfo;
}
function loadView(AInfo){
    $.each(AInfo,function(index,AInfo){
        if(AInfo.module=='00moduleA'){
            var news=$('#newsA').clone();
            // news.find('#titleA').css('background-color','black');

            news.find('#titleA').html(AInfo.title);

            news.find('#dateA').html(AInfo.editTime);
            news.find('.delete').val(index);
            news.find('.alter').val(index);
            // console.log(index);
            // console.log(news.find('#delete').val());

            news.appendTo('#AContainer');}
        else{
            var news=$('#newsB').clone();
            // news.find('#titleA').css('background-color','black');

            news.find('#titleB').html(AInfo.title);
            news.find('#dateB').html(AInfo.editTime);
            news.find('.delete').val(index);
            news.find('.alter').val(index);

            news.appendTo('#BContainer');
        }

    });

    $('.A-news .news:eq(0)').remove();
    $('.B-news .news:eq(0)').remove();

}



function del(val,info,module){

    // $(".news:first").nextAll().remove();

    // totalInfo.splice(val);
    // console.log(totalInfo.length);


    $.ajax({
        type:"post",
        //url?要获取数据的url （默认为当前页地址）发送请求的地址。
        // async: false,

        url:"http://52.38.232.39:8080/article/deleteArticle",
        data:{'articleID' : info,'module':module  },

        beforeSend:function(){},

        success:function(msg){


            if(msg.success == "yes")
            {
                console.log(info+','+module);

                alert('successfully delete');
                totalInfo.splice(val,1);


                $(".A-news .news:first").nextAll().remove();
                $(".B-news .news:first").nextAll().remove();
                loadView(totalInfo);
                // $(document).reload();
                $('.delete').click(function(){

                    del($(this).val(),totalInfo[$(this).val()].articleID,totalInfo[$(this).val()].module);

                })

            }else
            {
                console.log("2")
            }
        },


    });
}
function alter(val){
    window.location.href='post.html?id='+val;
}