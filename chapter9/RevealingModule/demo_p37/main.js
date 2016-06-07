/**
 * [揭示模块模式]
 * @author wangzhipei
 * @date 2016/6/7/0007.
 */


var myRevealingModule = function() {
    var privateVar = "Ben Cherry",
        publicVar = "Hey there";

    function privateFunction() {
        console.log("Name: " + privateVar);
    }

    function publicSetName(strName) {
        privateVar = strName;
    }

    function publicGetName(){
        privateFunction();
    }

    return {
        setName: publicGetName,
        greeting: publicVar,
        getName: publicGetName
    }
}();

myRevealingModule.setName("Paul Kinlan");

