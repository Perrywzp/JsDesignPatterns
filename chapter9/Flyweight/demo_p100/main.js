/**
 * [desc]
 * @author wangzhipei
 * @date 2016/6/15/0015.
 */

// 在JS里模拟纯虚拟继承 implement
Function.prototype.implementsFor = function (parentClassOrObject) {
    if (parentClassOrObject.constructor === Function) {
        // 正常继承
        this.prototype = new parentClassOrObject();
        this.prototype.constructor = this;
        this.prototype.parent = parentClassOrObject.prototype;
    } else {
        // 纯虚拟继承
        this.prototype = parentClassOrObject;
        this.prototype.constructor = this;
        this.prototype.parent = parentClassOrObject;
    }
    return this;
};

// 享元对象
var CoffeeOrder = {
    // 接口
    serveCoffee: function (context) {
    },
    getFlavor: function () {
    }
};

// 实现CoffeeOrder的具体享元对象
function CoffeeFlavor(newFlavor) {
    var flavor = newFlavor;

    // 如果已经为某一功能定义了接口，则实现该功能
    if (typeof this.getFlavor === "function") {
        this.getFlavor = function () {
            return flavor;
        };
    }

    if (typeof this.serveCoffee === "function") {
        this.serveCoffee = function (context) {
            console.log("Serving Coffee flavor "
                + flavor
                + " to table number "
                + context.getTable()
            );
        };
    }
}

// 为CoffeeOrder实现接口
CoffeeFlavor.implementsFor(CoffeeOrder);

// 处理coffee订单的table数

function CoffeeOrderContext(tableNumber) {
    return {
        getTable: function () {
            return tableNumber;
        }
    }
}

// 享元工厂对象
function CoffeeFlavorFactory() {
    var flavors = [];
    return {
        getCoffeeFlavor: function (flavorName) {
            var flavor = flavors[flavorName];
            if (flavor === undefined) {
                flavor = new CoffeeFlavor(flavorName);
                flavors.push([flavorName,flavor]); // 此处push应该是有问题的，后期再针对处理掉
            }
            return flavor;
        },

        getTotalCoffeeFlavorsMade: function () {
            return flavors.length;
        }
    }

}

testFlyweight();

// 样例用法：
function testFlyweight() {
    // 已订购的flavor.
    var flavors = new CoffeeFlavor(),

        // 订单table
        tables = new CoffeeOrderContext(),

        // 订单数量
        ordersMade = 0,

        // TheCoffeeFlavorFactory实例
        flavorFactory;

    function takeOrders(flavorIn, table){
        flavors[ordersMade]= flavorFactory.getCoffeeFlavor(flavorIn);
        tables[ordersMade++] = new CoffeeOrderContext(table);
    }

    flavorFactory = new CoffeeFlavorFactory();

    takeOrders("Cappuccino", 2);
    takeOrders("Cappuccino", 2);
    takeOrders("Frappe", 1);
    takeOrders("Frappe", 1);
    takeOrders("Xpresso", 1);
    takeOrders("Frappe", 897);
    takeOrders("Cappuccino", 897);
    takeOrders("Cappuccino", 897);
    takeOrders("Frappe", 3);
    takeOrders("Xpresso", 3);
    takeOrders("Cappuccino", 3);
    takeOrders("Xpresso", 96);
    takeOrders("Frappe", 552);
    takeOrders("Cappuccino", 121);
    takeOrders("Xpresso", 121);


    for(var i = 0; i<ordersMade; ++i){
        flavors[i].serveCoffee(tables[i]);
    }
    console.log(" ");
    console.log("total CoffeeFlavor objects made: " + flavorFactory.getTotalCoffeeFlavorsMade());
}