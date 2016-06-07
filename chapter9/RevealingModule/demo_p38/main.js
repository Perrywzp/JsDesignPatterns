/**
 * [揭示模块模式]
 * @author wangzhipei
 * @date 2016/6/7/0007.
 */


var myRevealingModule = function() {
    var privateCounter = 0;

    function privateFunction() {
        privateCounter++;
    }

    function publicFunction() {
        publicIncrement();
    }

    function publicIncrement(){
        privateFunction();
    }

    function publicGetCount() {
        return privateCounter;
    }

    return {
        start: publicFunction,
        increment: publicIncrement,
        count: publicGetCount
    };
}();

myRevealingModule.setName("Paul Kinlan");

