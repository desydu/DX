/**
 * Created by duxi on 16/9/6.
 */
$(document).ready(function(){



    //
    //var $li=$('#pagination li');
    ////var $ul=$('#container ul');
    //$li.click(function(){
    //    var $this=$(this);
    //    var $t=$this.index();
    //    $li.removeClass();
    //    $this.addClass('active');
    //
    //    //$ul.css('display','none');
    //    //$ul.eq($t).css('display','block');
    //
    //})


    var articleID=new Array();

    var articleIDA=new Array();
    var articleIDB=new Array();


    articleID=loadArgument();
    articleIDA=articleID[0];
    articleIDB=articleID[1];


    var totalID=articleIDA.concat(articleIDB);

    totalInfo=loadInfo(totalID);

    loadView(totalInfo);



})



function loadArgument(){
    var articleIDA=new Array();
    var articleIDB=new Array();

    $.ajax({
        type:"post",
        //url?要获取数据的url （默认为当前页地址）发送请求的地址。
        async: false,
        url:"https://fund2-narutooturan.c9users.io/article/moduleArticleID",
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

        url:"https://fund2-narutooturan.c9users.io/article/moduleArticleID",
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
    return [articleIDA.slice(0,2),  articleIDB.slice(0,2)];


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
            url:"https://fund2-narutooturan.c9users.io/article/articleInfo",
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

    console.log(AInfo.length);
    $.each(AInfo,function(index,AInfo){
        if(AInfo.module=='00moduleA'){
            var news=$('#newsA').clone();
            // news.find('#titleA').css('background-color','black');

            news.find('#linkA').attr('href','cnews1.html?id='+AInfo.articleID);
            news.find('#art-titleA').html(AInfo.title);
            news.find('#art-contentA').html(AInfo.abstract);

            $('#art-contentA img').remove();


            news.find('#art-timeA').html(AInfo.editTime);


            news.appendTo('#news-left');}
        else{
            var news=$('#newsB').clone();
            // news.find('#titleA').css('background-color','black');
            news.find('#linkB').attr('href','cnews1.html?id='+AInfo.articleID);

            news.find('#art-titleB').html(AInfo.title);
            news.find('#art-contentB').html(AInfo.abstract);
            $('#art-contentB img').remove();

            news.find('#art-timeB').html(AInfo.editTime);


            news.appendTo('#news-right');
        }

    });

    $('#news-left #newsA:eq(0)').remove();
    $('#news-right #newsB:eq(0)').remove();
    //$('.B-news .news:eq(0)').remove();

}



