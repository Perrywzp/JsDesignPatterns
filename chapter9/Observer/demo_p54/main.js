/**
 * [实现用户界面通知]
 * @author wangzhipei
 * @date 2016/6/8/0008.
 */



// 返回稍后界面上要用到的当前本地时间
getCurrentTime = function () {
    var date = new Date(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        y = date.getFullYear(),
        t = date.toLocaleTimeString().toLowerCase();
    return (m + "/" + d + "/" + y + " " + t);
};

// 向网格组件上添加新数据行
function addGridRow(data) {
    // ui.grid.addRow(data);
    console.log("update grid component with: " + data);
}

// 更新网格上的最新更新时间
function updateCounter(data) {
    // ui.grid.updateLastChanged( getCurrentTime());
    console.log(" data last update at: " + getCurrentTime() + " with " + data);
}

// 使用传递给订阅者的数据data更新网格
gridUpdate = function (topic, data) {
    if (data != "undefined") {
        addGridRow(data);
        updateCounter(data);
    }
};

// 在newDataAvailable上创建一个订阅
var subscriber = pubsub.subscribe("newDataAvailable", gridUpdate);

// 下面的代码描绘了数据层，一般应该使用ajax 请求获取最新的数据后，告知程序有最新数据
// 发布者更新gridUpdate topic 来展示新数据项
pubsub.publish("newDataAvailable", {
    summary: "Apple made $5 billion",
    identifier: "APPL",
    stockPrice: 570.91
});

pubsub.publish("newDataAvailable", {
    summary: "Microsoft made $20 million",
    identifier: "MSFT",
    stockPrice: 30.85
});