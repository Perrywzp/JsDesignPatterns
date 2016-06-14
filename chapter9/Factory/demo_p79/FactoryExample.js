/**
 * [desc]
 * @author wangzhipei
 * @date 2016/6/14/0014.
 */

// 定义vehicle工厂的大体代码
function VehicleFactory() {
}
// 定义该工厂factory 的原型和试用工具，默认的vehicleClass是Car
VehicleFactory.prototype.vehicleClass = Car;

// 创建新Vehicle实例的工厂方法
VehicleFactory.prototype.createVehicle = function (options) {
    if (options.vehicleType === "car") {
        this.vehicleClass = Car;
    } else {
        this.vehicleClass = Truck;
    }

    return new this.vehicleClass(options);
};

// 创建生成汽车的工厂实例
var carFactory = new VehicleFactory();

var car = carFactory.createVehicle({
    vehicleType: "car",
    color: "yellow",
    doors: 6
});

// 测试汽车是由vehicleClass的原型prototype的Car创建的

// 输出true
console.log(car instanceof Car);

// 输出：
console.log(car);


var movingTruck = carFactory.createVehicle({vehicleType: "Truck", state: "like new", color: "red", wheelSize: "small"});

// 测试卡车是由vehicleClass的原型prototype里的Truck创建的

// 输出： true
console.log( movingTruck instanceof Truck);

console.log( movingTruck);




function TruckFactory(){}

TruckFactory.prototype = new VehicleFactory();

TruckFactory.prototype.vehicleClass = Truck;

var truckFactory = new TruckFactory();

var myBigTruck = truckFactory.createVehicle({state:"omg..so bad", color:"pink", wheelSize:"so big"});

// 确认myBigTruck是由原型Truck创建的
// 输出: true
console.log(myBigTruck instanceof Truck);

// 输出： Truck对象，
console.log(myBigTruck);