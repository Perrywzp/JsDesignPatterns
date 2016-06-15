/**
 * [desc]
 * @author wangzhipei
 * @date 2016/6/15/0015.
 */
// 用事先定义好的接口构造函数创建接口，该函数将接口名称和方法称作为参数
// 在reminder示例中，summary()和placeOrder()描绘的功能，接口应该支持
var reminder = new Interface("List", ["summary", "placeOrder"]); // 暂无该Interface的代码内容支持

var properties = {
    name: "Remember to buy the milk",
    date: "05/06/2016",
    actions: {
        summary: function() {
            return "Remember to buy the milk, we are almost out!";
        },
        placeOrder: function() {
            return "Ordering milk from your local grocery store";
        }
    }
};

// 创建构造函数实现上述属性和方法
function Todo(config){
    // 为了支持这些功能，接口示例需要检查这些功能
    Interface.ensureImplements(config.actions, reminder);

    this.name = config.name;
    this.methods = config.actions;
}

// 创建Todo构造函数的新实例
var todoItem = new Todo(properties);

// 最后测试确保新增加的功能可用

console.log(todoItem.methods.summary());
console.log(todoItem.methods.placeOrder());

