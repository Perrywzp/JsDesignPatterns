/**
 * [Mediator 中介者模式的高级实现]
 * @author wangzhipei
 * @date 2016/6/8/0008.
 */

// 将context上下文传递给订阅者，默认上下文是window对象

(function (root) {
    function guidGenerator() {
        /**/
    }

    // 订阅者构造函数
    function Subscriber(fn, options, context) {

        if (!this instanceof Subscriber) {
            return new Subscriber(fn, context, options);
        } else {

            // guidGenerator()是一个函数，用于为订阅者生成guid，以便之后很方便的引用它们。
            // 为了简洁，跳过具体实现

            this.id = guidGenerator();
            this.fn = fn;
            this.options = options;
            this.context = context;
            this.topic = null;
        }
    }

    // 模拟Topic
    // JavaScript允许我们使用Function对象作为原型的结合与新对象和构造函数一起调用
    function Topic(namespace) {

        if (!this instanceof Topic) {
            return new Topic(namespace);
        } else {

            this.namespace = namespace || "";
            this._callbacks = [];
            this._topics = [];
            this.stopped = false;

        }

    }

    // 定义topic的prototype原型， 包括添加订阅者和获取订阅者的方式
    Topic.prototype = {

        // 添加新订阅者
        AddSubscribe: function (fn, options, context) {

            var callback = new Subscriber(fn, options, context);

            this._callbacks.push(callback);

            callback.topic = this;

            return callback;
        },
        StopPropagation: function () {
            this.stopped = true;
        },

        GetSubscriber: function (identifier) {

            for (var x = 0, y = this._callbacks.length; x < y; x++) {
                if (this._callbacks[x].id == identifier || this._callbacks[x].fn == identifier) {
                    return this._callbacks[x];
                }
            }

            for (var z in this._topics) {
                if (this._topics.hasOwnProperty(z)) {
                    var sub = this._topics[z].GetSubscriber(identifier);
                    if (sub !== undefined) {
                        return sub;
                    }
                }
            }
        },

        AddTopic: function (topic) {
            this._topics[topic] = new Topic((this.namespace ? this.namespace + ":" : "") + topic);
        },

        HasTopic: function (topic) {
            return this._topics.hasOwnProperty(topic);
        },

        ReturnTopic: function (topic) {
            return this._topics[topic];
        },

        RemoveSubscriber: function (identifier) {

            if (!identifier) {
                this._callbacks = [];

                for (var z in this._topics) {
                    if (this._topics.hasOwnProperty(z)) {
                        this._topics[z].RemoveSubscriber(identifier);
                    }
                }
            }

            for (var y = 0, x = this._callbacks.length; y < x; y++) {
                if (this._callbacks[y].fn == identifier || this._callbacks[y].id == identifier) {
                    this._callbacks[y].topic = null;
                    this._callbacks.splice(y, 1);
                    x--;
                    y--;
                }
            }
        },

        Publish: function (data) {

            for (var y = 0, x = this._callbacks.length; y < x; y++) {
                var callback = this._callbacks[y], l;
                callback.fn.apply(callback.context, data);
                l = this._callbacks.length;
                if (l < x) {
                    y--;
                    x = l;
                }
            }

            for (var x in this._topics) {
                if (!this.stopped) {
                    if (this._topics.hasOwnProperty(x)) {
                        this._topics[x].Publish(data);
                    }
                }
            }

            this.stopped = false;
        }
    };

    function Mediator() {

        if (!this instanceof Mediator) {
            return new Mediator();
        } else {
            this._topics = new Topic("");
        }
    }

    Mediator.prototype = {
        GetTopic: function (namespace) {
            var topic = this._topics,
                namespaceHierarchy = namespace.split(":");

            if (namespace === "") {
                return topic;
            }

            if (namespaceHierarchy.length > 0) {
                for (var i = 0, j = namespaceHierarchy.length; i < j; i++) {

                    if (!topic.HasTopic(namespaceHierarchy[i])) {
                        topic.AddTopic(namespaceHierarchy[i]);
                    }

                    topic = topic.ReturnTopic(namespaceHierarchy);

                }
            }
        },

        Subscribe: function (topicName, fn, otpions, context) {
            var options = options || {},
                context = context || {},
                topic = this.GetTopic(topicName),
                sub = topic.AddSubscribe(fn, options, context);

            return sub;
        },

        // 通过给定的订阅者ID/命名函数和topic 命名空间返回一个订阅者
        GetSubscriber: function(identifier, topic){
            return this.GetTopic(topic || "").GetSubscriber(identifier);
        },

        // 通过给定的订阅ID或命名函数，从给定的topic命名空间递归删除订阅者
        Remove: function(topicName, identifier) {
            this.GetTopic(topicName).RemoveSubscriber(identifier);
        },

        Publish: function(topicName) {
            var args = Array.prototype.slice.call(arguments,1),
                topic = this.GetTopic(topicName);

            args.push(topic);
            this.GetTopic(topicName).Publish(args);
        }
    };

    root.Mediator = Mediator;
    Mediator.Topic = Topic;
    Mediator.Subscribe = Subscriber;


    // 记住，这里可以传递任何内容，这里我传递了window对象作为Mediator的附加对象,但也可以随时附加到其他对象上。
})(window);


