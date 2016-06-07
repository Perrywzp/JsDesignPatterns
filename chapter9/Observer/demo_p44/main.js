/**
 * [观察者模式]
 * @author wangzhipei
 * @date 2016/6/7/0007.
 */

function ObserverList() {
    this.observerList = [];
}

ObserverList.prototype.Add = function (obj) {
    return this.observerList.push(obj);
};

ObserverList.prototype.Empty = function () {
    this.observerList = [];
};

ObserverList.prototype.Count = function () {
    return this.observerList.length;
};

ObserverList.prototype.Get = function (index) {
    if (index > -1 && index < this.observerList.length) {
        return this.observerList[index];
    }
};

ObserverList.prototype.Insert = function (obj, index) {
    var pointer = -1;

    if (index === 0) {
        this.observerList.unshift(obj);
        pointer = index;
    } else if (index === this.observerList.length) {
        this.observerList.push(obj);
        pointer = index;
    }

    return pointer;
};

ObserverList.prototype.IndexOf = function (obj, startIndex) {
    var i = startIndex, pointer = -1;

    while (i < this.observerList.length) {
        if (this.observerList[i] === obj) {
            pointer = i;
        }
        i++;
    }
    return pointer;
};

ObserverList.prototype.RemoveIndexAt = function (index) {
    if (index === 0) {
        this.observerList.shift();
    } else if (index === this.observerList.length - 1) {
        this.observerList.pop();
    }
};

// 使用extension 扩展对象
function extend(obj, extension) {
    for (var key in obj){
        extension[key] = obj[key];
    }
}


function Subject() {
    this.observers = new ObserverList();
}

Subject.prototype.AddObserver = function (observer) {
    this.observers.Add(observer);
};

Subject.prototype.RemoveObserver = function (observer) {
    this.observers.RemoveIndexAt(this.observers.IndexOf(observer, 0));
};

Subject.prototype.Notify = function (context) {
    var observerCount = this.observers.Count();
    for (var i = 0; i < observerCount; i++ ){
        this.observers.Get(i).Update(context);
    }
};


// The Observer
function Observer() {
    this.Update = function () {
        // ...
    };
}

// 应用dom元素
var controlCheckbox = document.getElementById("mainCheckbox"),
    addBtn = document.getElementById("addNewObserver"),
    container = document.getElementById("observersContainer");

// 具体目标 Concrete Subject

// 利用Subject扩展controlCheckbox
extend(new Subject(), controlCheckbox);

// 点击checkbox会触发通知到观察者上
controlCheckbox["onclick"] = new Function("controlCheckbox.Notify(controlCheckbox.checked)");

addBtn["onclick"] = AddNewObserver;

// 具体观察者 Concrete Observer
function AddNewObserver () {
    // 创建需要添加的新checkbox
    var check = document.createElement("input");
    check.type = "checkbox";

    // 利用Observer类扩展checkbox
    extend(new Observer(), check);

    // 重写自定义更新行为
    check.Update = function(value) {
        this.checked = value;
    };

    // 为主subject 的观察者列表添加新的观察者
    controlCheckbox.AddObserver(check);

    // 将观察者附件到容器上
    container.appendChild(check);
}
