function foo() { 
    console.log(this.name)
}
Function.prototype.myCall = function (thisArgs, ...args) { 
    // 声明一个独有的Symbol属性，防止fn覆盖已有属性
    const fn = Symbol('fn')
    // 若没有传入this，默认绑定window对象
    thisArg = thisArgs || window;
    // myCall内部的this指向调用者foo
    // thisArgs[fn]就是foo函数，
    // thisArgs对象调用了foo函数，因此foo函数内部的this指向thisArgs
    thisArgs[fn] = this;
    // 执行当前函数
    const result = thisArg[fn](...args)
    // 删除多余临时属性fn
    delete thisArgs[fn]
    return result 
}
obj = {name:'young'}
foo.myCall(obj)