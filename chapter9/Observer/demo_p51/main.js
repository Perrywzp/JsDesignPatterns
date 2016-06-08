/**
 * [实现一个消息订阅]
 * @author wangzhipei
 * @date 2016/6/8/0008.
 */

// 另一个简单的消息处理程序

// 简单的消息记录器记录所有通过订阅者接收到的主题(topic) 和数据

var messageLoger = function (topics, data) {
    console.log("Logging: " + topics + ": " + data);
};

// 订阅者监听订阅的topic, 一旦该topic广播一个通知， 订阅者就调用回调函数
var subscription = pubsub.subscribe("inbox/newMessage", messageLoger);

// 发布者负责发布程序感兴趣的topic或通知，例如：

pubsub.publish("inbox/newMessage", "hello world!");

// 或者
pubsub.publish("inbox/newMessage", ["test", "a", "b", "c"]);

// 或者
pubsub.publish("inbox/newMessage", {
    sender: "hello@google.com",
    body: "Hey again!"
});


// 如果订阅者不想被通知了，也可以取消订阅
// 一旦取消订阅，下面的代码执行后将不会记录消息，因为订阅者不在进行监听了

pubsub.unsubscribe(subscription);

pubsub.publish("inbox/newMessage", "Hello! ara you still there?");

