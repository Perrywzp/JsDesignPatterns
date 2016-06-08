/**
 * [发布/订阅]
 * @author wangzhipei
 * @date 2016/6/8/0008.
 */
// 以下程序是建立在Publish/Subscribe已经实现的基础上，来演示如何使用（调用）的。

// 非常简单的mail处理程序

// 接收到的消息数量
var mailCounter = 0;

// 初始化订阅，名称是 inbox/newMessage

// 呈现消息预览
var subscriber1 = subscribe("inbox/newMessage", function(topic, data) {

    // debug模式记录topic
    console.log("A new message was received: ", topic);

    // 使用从目标subject传递过来的data， 一般呈现消息预览
    $(".messageSender").html(data.sender);
    $(".messagePreview").html(data.body);
});

// 另外一个订阅， 使用同样的data数据用于不同的任务

// 通过发布者更新所接收消息的数量

var subscriber2 = subscribe("inbox/newMessage", function(topic, data) {
   $(".newMessageCounter").html(mailCounter++);
});

publish("inbox/newMessage", [{
    sender: "hello@google.com",
    body: "Hey there! How are you doing today?"
}]);

// 之后可以通过unsubscribe取消订阅
// unsubsribe(subscriber1);
// unsubsribe(subscriber2);