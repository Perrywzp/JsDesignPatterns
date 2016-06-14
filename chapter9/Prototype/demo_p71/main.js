/**
 * [原型模式]
 * @author wangzhipei
 * @date 2016/6/13/0013.
 */

var myCar = {
    name: "Ford Escort",

    drive: function() {
        console.log("Weeee. I`m driving!");
    },

    panic: function () {
        console.log("Wait. How do you stop this thing?");
    }
};

// 使用Object.create实例化一个新car
var yourCar = Object.create(myCar);

// 现在可以看到一个对象是另外一个对象的原型
console.log(yourCar.name);

var vehicle = {
    getModel: function() {
        console.log("The model of this vehicle is.." + this.model);
    }
};

var car = Object.create(vehicle, {

    "id": {
        //value: MY_GLOBAL.nextId(),
        enumerable: true
    },

    "model": {
        value: "Ford",
        enumerable: true
    }
});

console.log(car.getModel());