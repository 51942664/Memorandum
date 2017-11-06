/**
 * Created by admin on 2017/10/26.
 */
loadData();
//编辑按钮
$(".edt").on("click",function () {
    $(".edit").css("left","0");
    //返回按钮
    $(".return").off("click").on("click",function () {
        $(".edit").css("left","100%");
    })
    //保存按钮
    $(".Preservation").off("click").on("click",function () {
        var text = $("textarea").val(),
            time = new Date().toLocaleString();
        var data = {
            "content": text,
            "nowDate" : time
        };
      add("cacheData",data,function () {
      });
        var textval = $("textarea").val();
        //判断多行文本框为不为空才能跳转
        if(textval !== ""){
            $(".edit").css("left","101%");
            //获取本地存储的数据
            var localData = localStorage.getItem("cacheData");
                localData = JSON.parse(localData);
            //    获取数组长度
            var localData_length = localData.length;
            //为main中添加备忘文本
            $(".main-box ul").append('<li class="li">' +
                '<div class="reply">'+ '<i  class="selected">'+'√'+'</i>' +'</div>'+
                '<p class="main">'+ localData[localData_length - 1].content +'</p>'+
                '<p class="time">'+ localData[localData_length - 1].nowDate +'</p>'+
                '</li>'
            )
        }else{

        }
        //修改备忘录个数
        hText()
    });
    //当第二次点击编辑按钮的时候直接把多行文本制空
    $(".edt").on("click",function () {
        $("textarea").val("")
    });
    //当有文本的时候改变按钮颜色
    if($(".li")){
        $(".btn").addClass("color")
    }else {
        $(".btn").removeClass("color")
    }

});
//编辑备忘录按钮添加点击事件
$(".btn").on("click",function () {
    //判定文本必须不能为空
    var $canel =  $(".cancel");
    if( $(".main-box>ul>li").length !== 0){
        $(".delete").css("display","block");
        $(".edt").css("display","none");
        $canel.css("display","block");
        $(".btn").css("display","none");
        $(".reply").css("width","48px");
        $(".li>p").css("padding-left","36px");
        //给选中按钮添加选中颜色
        $(".selected").off("click").on("click",function () {
            //判断当前是否有ckd的class，有则移除，没有则添加
            if ($(this).hasClass("ckd")) {
                $(this).removeClass("ckd");
                Selected();
            } else {
                $(this).addClass("ckd");
                Selected();
            }
        });
    }
});
//给取消按钮添加事件
$(".cancel").click(function () {
    cancl()
});
//添加删除事件
$(".delete").on("click",function () {
    del()
});

//修改h2的文本
function hText() {
    var li_length = $(".li").length;
    if(li_length === 0){
        $("footer>h2").text("无备忘录")
    }else{
        $("footer>h2").text(li_length + "个备忘录")
    }
}
//取消按钮事件
function cancl() {
    $(".reply").css("width","0");
    $(".li>p").css("padding-left","0");
    $(".btn").fadeIn();
    $(".cancel").hide();
    $(".selected").removeClass("ckd")
    $(".delete").css("display","none");
    $(".edt").css("display","block");
}
//选中了多少项
function Selected() {
    var ckd_length = $(".ckd").length;
    $(".box>header>h1").text("已选中" + ckd_length + "项");
}
//添加存储数据
function add(key,user,callBack) {
    var cacheData = null;
    if(localStorage[key]){
        cacheData = JSON.parse(localStorage[key]);
    }else {
        cacheData = [];
    }
    cacheData.push(user);
    localStorage[key] = JSON.stringify(cacheData);
    if(callBack){
        callBack();
    }
}
//删除事件
function del() {
    //获取被选中的个数
    var state = $(".ckd");
    if (state) {
        state.parent().parent().remove();
        //    删除本地存储的数据
        var localData = localStorage.getItem("cacheData");
        localData = JSON.parse(localData);
        //    获取数组长度
        var localData_length = localData.length;
        var newlocalData,
            count = 0;

        if (localData_length !== 0) {
            for (var i = 0; i < localData_length; i++) {
                count++;
            }
            console.log(count);
            while (count) {
                for (var x = 0; x < localData_length; x++) {

                }
            }
        }
            if ($(".li").length === 0) {
                $("header>h1").text("备忘录");
                $("footer>h2").text("无备忘录");
                $(".btn").removeClass("color");
                $(".cancel").css("display", "none");
                $(".btn").fadeIn();
                $(".delete").css("display", "none");
                $(".edt").css("display", "block")
            }
    }
}
//页面载入时，根据本地存储的内容重新生成列表
function loadData() {
    //获取本地存储的数据
    var localData = localStorage.getItem("cacheData");
    localData = JSON.parse(localData);
    //为main中添加备忘文本
    $.each(localData,function (idx,item) {
        $(".main-box ul").append('<li class="li">' +
            '<div class="reply">'+ '<i  class="selected">'+'√'+'</i>' +'</div>'+
            '<p class="main">'+ item.content +'</p>'+
            '<p class="time">'+ item.nowDate +'</p>'+
            '</li>'
        )
    })
}