/**
 * [用中介模式实现一个简单的聊天记录系统]
 * @author wangzhipei
 * @date 2016/6/8/0008.
 */


$("#chatForm").on("submit", function(e) {
    e.preventDefault();

    // 从UI上获取chat数据
    var text = $("#chatBox").val(),
        from = $("#fromBxo").val(),
        to = $("#toBox").val();

    // 将数据发布到newMessage主题上
    Mediator.Publish("newMessage", {message: text,from: from, to: to});
});

// 将新消息附加到聊天结果记录上
function displayChat(data) {
    var date = new Date(),
        msg = data.from + "said \"" + data.message + "\"to" + data.to;

    $("#chatResult")
        .prepend("" + msg + " (" + date.toLocaleTimeString() + ")");
}

// 记录消息日志
function logChat(data){
    if (window.console) {
        console.log(data);
    }
}

// 通过mediator 订阅新提交的newMessage主题
Mediator.Subscribe("newMessage", displayChat);
Mediator.Subscribe('newMessage', logChat);

// 如下代码仅在高级代码实现上可以使用
function amItalkToMyself(data) {
    return data.from === data.to;
}

function iAmClearlyCrazy(data) {
    $("#chatResult")
        .prepend("" + data.from + " is talking to himself.");
}

Mediator.Subscribe(amItalkToMyself,iAmClearlyCrazy);