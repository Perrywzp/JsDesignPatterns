/**
 * [使用Ben Alman的Pub/Sub实现解耦应用程序]
 * @author wangzhipei
 * @date 2016/6/8/0008.
 */

;(function ($) {

    // 订阅new user 主题，提交评论的时候在用户列表上添加一个用户
    $.subscribe("/new/user", function (e, data) {

        var compiledTemplate;

        if (data) {
            compiledTemplate = _.template($("#userTemplate").html());

            $("#users").append(compiledTemplate(data));
        }
    });

    // 订阅new rating主题， rating主题由title 和rating组成。新rating添加到已有用户的rating列表上
    $.subscribe("/new/rating", function (e, data) {

        var compiledTemplate;

        if (data) {

            compiledTemplate = _.template($("#ratingsTemplate").html());
            $("#ratings").append(compiledTemplate(data));
        }
    });

    // 添加新用户处理程序
    $("#add").on("click", function (e) {

        e.preventDefault();

        var strUser = $("#twitter_handle").val(),
            strMovie = $("#movie_seen").val(),
            strRating = $("#movie_rating").val();

        // 通知程序，新用户有效
        $.publish("/new/user", {name: strUser});

        // 通知程序新rating评价有效
        $.publish("/new/rating", {title: strMovie, rating: strRating});
    });

})(jQuery);