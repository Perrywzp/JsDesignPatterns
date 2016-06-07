/**
 * [单例模式]
 * @author wangzhipei
 * @date 2016/6/7/0007.
 */

var mySingleton = (function () {
    // 实例保持了Singleton的一个引用
    var instance;
    function init() {
        // Singleton
        // 私有方法和变量
        function privateMethod() {
            console.log("I am private");
        }
        var privateVariable = "I`m also private";
        var privateRandomNumber = Math.random();
        return {
            // 公有方法和变量
            publicMethod: function() {
                console.log("The public can see me!");
            },
            publicProperty: "I am also public",
            getRandomNumber: function() {
                return privateRandomNumber;
            }
        };
    }

    return {
        // 获取Singleton的实例，如果存在就返回，不存在就创建新实例
        getInstance: function() {
            if (!instance){
                instance = init();
            }
            return instance;
        }
    }
})();


var myBadSingleton = (function () {
    // 实例保持了Singleton的一个引用
    var instance;
    function init() {
        // Singleton
        var privateRandomNumber = Math.random();

        return {
            getRandomNumber: function () {
                return privateRandomNumber;
            }
        };
    }

    return {
        // 每次都创建新实例
        getInstance: function () {
            instance = init();
            return instance;
        }
    };

})();

var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();

console.log(singleA.getRandomNumber() === singleB.getRandomNumber());

var badSingleA = myBadSingleton.getInstance();
var badSingleB = myBadSingleton.getInstance();

console.log(badSingleA.getRandomNumber() !== badSingleB.getRandomNumber());