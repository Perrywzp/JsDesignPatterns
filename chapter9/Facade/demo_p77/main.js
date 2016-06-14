/**
 * [facade与module模式集成使用]
 * @author wangzhipei
 * @date 2016/6/14/0014.
 */

var module = (function(){
    var _private = {
        i: 5,
        get: function() {
            console.log("current value: " + this.i);
        },
        set: function(val) {
            this.i = val;
        },
        run: function() {
            console.log("running");
        },
        jump: function() {
            console.log("jumping");
        }
    };

    return {

        facade: function(args) {
            _private.set(args.val);
            _private.get();
            if (args.run) {
                _private.run();
            }
        }
    };
}());

// 输出
module.facade({run:true,val: 10});