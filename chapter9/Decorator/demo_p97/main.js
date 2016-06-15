/**
 * [使用jQuery的装饰者模式]
 * @author wangzhipei
 * @date 2016/6/15/0015.
 */

var decoratorApp = decoratorApp || {};

// 定义要使用的对象
decoratorApp = {
    defaults: {
        validate: false,
        limit: 5,
        name: "foo",
        welcome: function () {
            console.log("welcome!");
        }
    },

    options: {
        validate: true,
        name: "bar",
        helloworld: function () {
            console.log("hello world");
        }
    },

    settings: {},
    printObj: function (obj) {
        var arr = [], next;
        $.each(obj, function (key, val) {
            next = "&nbsp;&nbsp;" + key + ": ";
            next += $.isPlainObject(val) ? printObj(val) : val;
            arr.push(next);
        });

        return "{ <br/>" + arr.join(", <br/>") + " <br/>}<br/>";
    }
};

// 合并defaults和options,没有显示修改defaults
decoratorApp.settings = $.extend({}, decoratorApp.defaults, decoratorApp.options);

// 这里所做的就是装饰可以访问defaults属性和功能的方式（options也一样），defaults本身未作改变

$("#log").append(decoratorApp.printObj(decoratorApp.settings) +
    decoratorApp.printObj(decoratorApp.options) +
    decoratorApp.printObj(decoratorApp.defaults)
);