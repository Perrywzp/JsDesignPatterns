/**
 * [desc]
 * @author wangzhipei
 * @date 2016/6/14/0014.
 */

// 定义Car构造函数
function Car(options){
    // 默认值
    this.doors = options.doors || 4;
    this.state = options.state || "brand new";
    this.color = options.color || "silver";
}

// 定义Truck构造函数
function Truck(options){
    this.state = options.state || "used";
    this.wheelSize = options.wheelSize || "large";
    this.color = options.color || "blue";
}

