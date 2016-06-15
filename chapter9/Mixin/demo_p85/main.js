/**
 * [mixin]
 * @author wangzhipei
 * @date 2016/6/15/0015.
 */

var MyMixins = {
    moveUp: function() {
        console.log("move up");
    },

    moveDown: function() {
        console.log("move down");
    },

    stop: function() {
        console.log("stop! in the name of love!");
    }
};

// carAnimator 构造函数的大体代码
function CarAnimator() {
    this.moveLeft = function() {
        console.log("move left");
    };
}

// personAnimator构造函数大体代码
function PersonAnimator() {
    this.moveRandomly = function () {/**/};
}

// 使用Mixin扩展2个构造函数
_.extend(CarAnimator.prototype, MyMixins);
_.extend(PersonAnimator.prototype, MyMixins);

// 创建carAnimator的新实例
var myAnimator = new CarAnimator();
myAnimator.moveLeft();
myAnimator.moveDown();
myAnimator.stop();