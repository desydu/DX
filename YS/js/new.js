/**
 * Created by duxi on 16/9/10.
 */
/**
 * Created by duxi on 16/9/8.
 */

$(document).ready(function(){

    var url=window.location.href;
    var module=url.split('?')[1];


    var articleID=loadArgument(module);
    var articleInfo=loadInfo(articleID);
    loadView(articleInfo);





});
function loadArgument(module){
    var articleID=new Array();
    //var articleIDB=new Array();

    $.ajax({
        type:"post",
        //url?要获取数据的url （默认为当前页地址）发送请求的地址。
        async: false,
        url:"http://139.224.40.56:8080/article/moduleArticleID",
        data:{'module' :module},
        beforeSend:function(){},
        success:function(msg){
            if(msg.success == "yes")
            {
                //$("#confirm").text("登陆成功");
                articleID=msg.data;
                // console.log(articleIDA.length);
                // console.log(articleIDA);
            }else
            {
                // alert(Tip);
            }
        },


    });


    return articleID;


}
function loadInfo(articleID){
    var AInfo= [];
    for (var i=0;i<articleID.length;i++){
        // var title;
        // var editTime;
        $.ajax({
            type:"post",
            //url?要获取数据的url （默认为当前页地址）发送请求的地址。
            async: false,
            url:"http://139.224.40.56:8080/article/articleInfo",
            data:{'articleID' : articleID[i]},

            beforeSend:function(){},

            success:function(msg){


                if(msg.success == "yes")
                {

                    AInfo.push(msg.data);

                }else
                {
                    console.log(articleID[i]);
                    console.log(msg.data);
                }
            },


        });

    };


    return AInfo;
}

function loadView(AInfo){


    if(AInfo.length>7){
        //var pagination=$('.pagination').clone();
        //var pagination=$('.pagination').clone();
        console.log('loadView');
        console.log(AInfo.length);



        var pages=Math.floor(AInfo.length/7)+1;
        console.log(pages);

        for (var i =0;i<pages;i++){
            var li=$('#pages').clone();

            li.html(i+1);


            li.appendTo($('#pagination'));

        }
        //console.log($('.pagination').children())

        $('.pagination .arrow').clone().appendTo($('#pagination'));

        $('.pagination .arrow:eq(0)').remove();
        //$('.pagination .arrow:eq(0)').remove();
        $('.pagination .pages:eq(0)').remove();




        $(".pagination .pages").each(function(index){

            $(this).click(function(){
                console.log(index);
                console.log(AInfo);
                //console.log(AInfo.slice());

                //var temp=new Array();
                if(index==pages-1){
                    console.log(AInfo.slice(index*7));
                    //temp=AInfo.slice(i*7);
                    loadPage(AInfo.slice(index*7));

                }else{
                    //temp=AInfo.slice(i*7,i*7+7);
                    loadPage(AInfo.slice(index*7,index*7+7));
                }
                //console.log(temp);
                //loadPage(temp);
            })
        })

        console.log(AInfo.slice(0,7));

        loadPage(AInfo.slice(0,7));

        //pagination.appendTo('.cnews-content');
        //$('.cnews-content .pagination:eq(0)').remove();
    }
    else{

        $.each(AInfo,function(index,AInfo){
            var news=$('#news').clone();
            news.find('#link').attr('href','cnews1.html?id='+AInfo.articleID);

            news.find('#art-title').html(AInfo.title);
            news.find('#art-time').html(AInfo.editTime);
            news.find('#art-content').html(AInfo.abstract);
            news.appendTo('.cnews-container');

        });

        $('.cnews-container .news:eq(0)').remove();
        $('.pagination').css('display','none');
        //$('.cnews-container .pagination:eq(0)').remove();

    }







}
function loadPage(Info){
    $(".cnews-container .news:first").nextAll().remove();

    console.log('loadPage');
    console.log(Info.length);

    $.each(Info,function(index,Info){
        var news=$('#news').clone();
        news.find('#link').attr('href','cnews1.html?id='+Info.articleID);

        news.find('#art-title').html(Info.title);
        news.find('#art-time').html(Info.editTime);
        news.find('#art-content').html(Info.abstract);
        $('#art-content img').remove();



        news.appendTo('.cnews-container');

    });

    $('.cnews-container .news:eq(0)').remove();


}


