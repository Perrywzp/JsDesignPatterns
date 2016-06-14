/**
 * [command模式]
 * @author wangzhipei
 * @date 2016/6/14/0014.
 */

(function() {
    var CarManager = {
        // 请求信息
        requestInfo: function(model,id) {
            return "The information for "+model+" with ID " + id + " is foobar";
        },

        // 订购汽车
        buyVehicle: function(model, id) {
            return "You have successfully purchased Item " + id + ", a " + model;
        },

        // 组织一个view
        arrangeViewing: function(model, id) {
            return "You have successfully booked a viewing of " + model + "(" + id + ")";
        }
    };

    CarManager.execute = function(name) {
        return CarManager[name] && CarManager[name].apply(CarManager, [].slice.call(arguments, 1));
    };
    console.log(
        CarManager.execute("arrangeViewing", "Ferrari", "134234")
    );
})();

