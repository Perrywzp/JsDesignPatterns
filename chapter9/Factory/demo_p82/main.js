/**
 * [desc]
 * @author wangzhipei
 * @date 2016/6/14/0014.
 */

var AbstractVehicleFactory = (function(){
    // 存储车辆类型
    var types = {};

    return {
        getVehicle: function(type,customizations){
            var Vehicle = types[type];
            if(Vehicle){
                return new Vehicle(customizations);
            }else{
                return null;
            }
            //return (Vehicle) ? return new Vehicle(customizations); : null;
        },

        registerVehicle: function(type, Vehicle){
            var proto = Vehicle.prototype;

            // 只注册实现车辆契约的类
            if (proto.drive && proto.breakDown){
                types[type] = Vehicle;
            }

            return AbstractVehicleFactory;
        }
    }
})();

// 用法
AbstractVehicleFactory.registerVehicle("car", Car);
AbstractVehicleFactory.registerVehicle("truck", Truck);

// 基于抽象车辆类型实例化一个新car对象
var car = AbstractVehicleFactory.getVehicle("car", {
    color: "lime green",
    state: "like new"
});

// 同理实例化一个新truck对象
var truck = AbstractVehicleFactory.getVehicle("truck", {
    wheelSize: "medium",
    color: "neon yellow"
});

console.log(car);
console.log(truck);