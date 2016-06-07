/**
 * [单例模式]
 * @author wangzhipei
 * @date 2016/6/7/0007.
 */

var SingletonTester = (function () {

    // options:包含singleton所需配置信息的对象
    // e.g var options = { name: "text", pointX: 5 };
    function Singleton(options) {

        // 如果未提供options,则设置为空对象
        options = options || {};

        // 为singleton设置一些属性
        this.name = "SingletonTester";

        this.pointX = options.pointX || 6;

        this.pointY = options.pointY || 10;

    }

    // 实例持有者
    var instance;

    // 静态变量和方法的模拟
    var _static = {

        name: "SingletonTester",

        // 获取实例的方法，返回singleton对象的singleton实例
        getInstance: function (options) {
            if (instance === undefined) {
                instance = new Singleton(options);
            }
            return instance;
        }

    };

    return _static;
})();

var singletonTest = SingletonTester.getInstance({pointX: 5});

console.log(singletonTest.pointX);