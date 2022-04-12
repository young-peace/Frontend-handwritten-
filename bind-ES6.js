Function.prototype.myBind = function (thisArg, ...args) {
    var self = this
    // new优先级
    var fbound = function () {
        self.apply(this instanceof self ? this : thisArg, args.concat(Array.prototype.slice.call(arguments)))
    }
    // 继承原型上的属性和方法
    fbound.prototype = Object.create(self.prototype);
    return fbound;
}

//测试
const obj = { name: '写代码像蔡徐抻' }
function foo() {
    console.log(this.name)
    console.log(arguments)
}

foo.myBind(obj, 'a', 'b', 'c')()    //输出写代码像蔡徐抻 ['a', 'b', 'c']
