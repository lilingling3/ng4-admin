/**
 * Created by linlin on 2017/4/17.
 */
$(function(){
  // 当前 主机名 + 端口号
  console.log(location.host);
  console.log('custom.js 执行了');
  var reg=/\?/;
  var current_url = reg.test(window.location.href.split(location.host+'/')[1])
    ?window.location.href.split(location.host+'/')[1].split('?')[0]
    :window.location.href.split(location.host+'/')[1];
  console.log(current_url);
  $top_menu = $(".top-nav");
  var router_begin = current_url.match(/#\/workentry\/\w+\/\w+/);
  var $href = $top_menu.find('a[href^="' + router_begin + '"]');
  $href.parents('li').addClass('active');
  $href.parents('.tab-pane').addClass('active in');

  if(current_url){
    changeBread();
  }

  $home=$("#home").parent("li");
  $("#home").parent("li").click(function(){
    $($home).addClass("active");
    $($home).siblings("li").removeClass("active");
    $($home).siblings("li").find(".active").removeClass("active");
    $($home).siblings("li").attr("aria-expanded","false");
    $(".tab-pane").removeClass("active in");
    changeBread();
  });


  $(".f-nav > a ").click(function(){
    //console.log("一级菜单单击响应");
    $(".bread").removeClass("bread-mt");
  });

  $(".f-nav .myTabSecond ul li").click(function(){
    //console.log('二级菜单 单击响应');

    // 二级菜单：去掉所有active，再给当前菜单增加active
    $(".tab-pane li").removeClass("active");
    $(this).addClass("active");

    // 一级菜单：直接去掉其他菜单的active
    $(this).parents(".myTabSecond").parent("li").siblings("li").removeClass("active");

    // 修改面包屑
    changeBread();
  });

  /*
   $(".f-nav").hover(function(){
   if(!$(this).hasClass("active")){
   $(this).addClass("active mhover");
   $(this).find('.tab-pane').addClass('active in');
   $(this).find('.tab-pane li').removeClass("active");
   $(this).siblings("li").find(".tab-pane").removeClass("active in");

   }
   if(!$("#home").parent("li").hasClass("mhover")&& $("#home").parent("li").hasClass("active")){
   $(".bread").removeClass("bread-mt");
   }
   },function(){
   if($(this).hasClass("mhover")){
   $(this).removeClass("active mhover");
   $(this).siblings("li.active").find(".tab-pane").addClass("active in");
   $(this).find('.tab-pane').removeClass('active in');
   }
   if(!$("#home").parent("li").hasClass("mhover") && $("#home").parent("li").hasClass("active")){
   $(".bread").addClass("bread-mt");
   }
   });*/


  function changeBread(){
    $nav_a=$("li.active>a.my-a");

    var bread_text="首页/";
    for(var i=0;i<$nav_a.length;i++){

      //console.log("$nav_a=");
      //console.log($nav_a[i]);

      //console.log($($nav_a[i]).text());
      bread_text+=$($nav_a[i]).text()+"/";
    }

    if($nav_a.length>1){
      //console.log('大于1 remove bread-mt');
      $(".bread").removeClass("bread-mt");
    } else {
      //console.log('小于1 add bread-mt');
      $(".bread").addClass("bread-mt");
    }

    //console.log("bread_text="+bread_text);
    if(bread_text == ''){
      bread_text = '-----';
    }
    $(".bread .f").text(bread_text);
  }
})
