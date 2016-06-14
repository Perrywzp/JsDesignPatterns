/**
 * [最后一种方式实现Prototype模式]
 * @author wangzhipei
 * @date 2016/6/13/0013.
 */

var beget = (function () {

    function F() {}
    return function(proto) {
        F.prototype = proto;
        return new F();
    }
})();