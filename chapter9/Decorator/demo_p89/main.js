/**
 * [desc]
 * @author wangzhipei
 * @date 2016/6/15/0015.
 */

// 车辆vehicle构造函数
function Vehicle(vehicleType) {
    // 默认值
    this.vehicleType = vehicleType || "car";
    this.model = "default";
    this.license = "0000-000";
}

// 测试基本的vehicle实例
var testInstance = new Vehicle("car");
console.log(testInstance);

// 创建一个vehicle实例进行装饰
var truck = new Vehicle("truck");

// 给truck装饰新的功能
truck.setModel = function(modelName) {
    this.model = modelName;
};

truck.setColor = function(color) {
    this.color = color;
};

// 测试赋值操作是否正常工作
truck.setModel("CAT");
truck.setColor("blue");

console.log(truck);

// 下面的代码，展示vehicle依然是不被改变的
var secondInstance = new Vehicle("car");
console.log(secondInstance);

