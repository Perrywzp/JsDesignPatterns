/**
 * [desc]
 * @author wangzhipei
 * @date 2016/6/15/0015.
 */

// 定义简单的Car构造函数
var Car = function (settings) {
    this.model = settings.model || "no model provided";
    this.color = settings.model || "no color provided";
};

// Mixin
var Mixin = function (){};

Mixin.prototype = {

    driveForward: function() {
        console.log("drive forward");
    },

    driveBackward: function() {
        console.log("drive backward");
    },

    driveSideways: function() {
        console.log("drive sideways");
    }
};

// 通过一个方法将现有对象扩展到另一个对象上
function augment(receivingClass, givingClass) {
    // 只提供特定的方法
    if (arguments[2]) {
        for (var i = 2, len = arguments.length; i < len ; i++) {
            receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
        }
    // 提供所有方法
    } else {
        for (var methodName in givingClass.prototype) {
            // 确保接收类不包含所处理方法的同名方法
            if (!Object.hasOwnProperty(receivingClass.prototype, methodName)) {
                receivingClass.prototype[methodName] = givingClass.prototype[methodName]
            }

            // 另一种方式
            //if( !receivingClass.prototype[methodName]) {
            //    receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            //}
        }
    }

}


// 给Car构造函数增加 "driveForward"和"driveBackward"两个方法
augment(Car, Mixin, "driveForward", "driveBackward");

// 创建一个新Car
var myCar = new Car({
    model: "Ford Escort",
    color: "blue"
});

// 测试确保新增方法可用
myCar.driveForward();
myCar.driveBackward();

// 也可以通过不声明特定方法名的形式，将Mixin的所有方法都添加到Car里
augment(Car, Mixin);

var mySportCar = new Car({
    model: "Porsche",
    color: "red"
});

mySportCar.driveSideways();