/**
 * [desc]
 * @author wangzhipei
 * @date 2016/6/15/0015.
 */

var Macbook = new Interface("Macbook", ["addEngraving",
    "addParallels",
    "add4GBRam",
    "add8GBRam",
    "addCase"]);
// Macbook Pro 可能需要如下这样的描述
var MacbookPro = function() {
    // 实现Macbook
};

MacbookPro.prototype = {
    addEngraving: function(){},
    addParallels: function(){},
    add4GBRam: function(){},
    add8GBRam: function(){},
    addCase: function(){},
    getPrice: function(){
        // 基本价格
        return 900.00;
    }
};


// Macbook装饰者抽象装饰者类
var MacbookDecorator = function(macbook){
    Interface.ensureImplements(macbook,Macbook);
    this.macbook = macbook
};

MacbookDecorator.prototype = {
    addEngraving: function(){
        return this.macbook.addEngraving();
    },
    addParallels: function(){
        return this.macbook.addParallels();
    },
    add4GBRam: function(){
        return this.macbook.add4GBRam();
    },
    add8GBRam: function(){
        return this.macbook.add8GBRam();
    },
    addCase: function(){
        return this.macbook.addCase();
    },
    getPrice: function(){
        // 基本价格
        return this.macbook.getPrice();
    }
};

var CaseDecorator = function (macbook) {
    // 接下来调用超类的构造函数
    this.superclass.constructor(macbook);
};

// 扩展超类
extend(CaseDecorator, MacbookDecorator);

CaseDecorator.prototype.addCase = function(){
    return this.macbook.addCase() + "Adding case to macbook";
};

CaseDecorator.prototype.getPrice = function() {
    return this.macbook.getPrice() + 45.00;
};
//实例化macbook
var myMacbookPro = new MacbookPro();
console.log(myMacbookPro.getPrice());


// 装饰macbook
myMacbookPro = new CaseDecorator(myMacbookPro);
console.log(myMacbookPro.getPrice());

