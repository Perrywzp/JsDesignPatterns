/**
 * [解耦基于Ajax的jQuery应用程序]
 * @author wangzhipei
 * @date 2016/6/8/0008.
 */

; (function ($) {

    // 预编译模板，并使用闭包缓存它
    var resultTemplate = _.template($("#resultTemplate").html());

    // 订阅新搜索tags主题
    $.subscribe("/search/tags", function (e, tags) {
        $("#searchResults")
            .html("Searched for: " + tags + "");
    });

    // 订阅新搜索结果主题
    $.subscribe("/search/resultSet", function (e, results) {

        $("#searchResults")
            .append(resultTemplate(results));
            //.append(compiled_template(results));

    });

    // 提交搜索请求，并在/search/tags主题上发布tags
    $("#flickrSearch").submit(function (e) {

        e.preventDefault();
        var tags = $(this).find("#query").val();

        if (!tags) {
            return;
        }

        $.publish("/search/tags", [$.trim(tags)]);
    });

    // 订阅发布的新tag, 并且使用tag发布请求。一旦返回数据， 将数据发布给应用程序的其他使用者。
    $.subscribe("/search/tags", function (e, tags) {

        $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
            {
                tags: tags,
                tagmode: "any",
                format: "json"
            },

            function (data) {
                if (!data.items.length) {
                    return;
                }

                $.publish("/search/resultSet", data.items);
            }
        );
    });

})(jQuery);