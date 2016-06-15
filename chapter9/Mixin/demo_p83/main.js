/**
 * [mixin模式 子类化]
 * @author wangzhipei
 * @date 2016/6/14/0014.
 */
var Person = function (firstName, lastName) {

    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = "male";

};

// Person的新实例很容易像如下这样创建：
var clark = new Person("Clark", "Kent");

// 为Superhero定义一个子类构造函数
var Superhero = function (firstName, lastName, powers) {

    // 调用超类的构造函数，然后使用.call()方法进行调用从而进行初始化

    Person.call(this, firstName, lastName);

    // 最后，保存powers, 在正常Person里找不到的特性数组
    this.powers = powers;
};

Superhero.prototype = Object.create(Person.prototype);
var superman = new Superhero("Clark", "Kent", ["flight", "heat-vision"]);
console.log(superman);
