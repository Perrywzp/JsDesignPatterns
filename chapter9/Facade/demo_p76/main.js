/**
 * [外观模式]
 * @author wangzhipei
 * @date 2016/6/14/0014.
 */

var addMyEvent = function(el, ev, fn) {
    if(el.addEventListener){
        el.addEventListener(ev, fn, false);
    } else if (el.attachEvent){
        el.attachEvent("on" + ev, fn);
    } else {
        el["on" + ev] = fn;
    }
};

