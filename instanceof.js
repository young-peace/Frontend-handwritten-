function myInstanceof(left, right) {
    if (typeof left === null) return false;
    //这里先用typeof来判断基础数据类型，如果是，直接返回false
    if (typeof left !== 'object' && typeof left !== 'function') return false;
    // 获取对象的原型 Object.getPrototypeOf(left)等于left.__proto__
    let proto = Object.getPrototypeOf(left)
    // let proto=left.__proto__
    
    // 获取构造函数的prototype对象
    let prototype = right.prototype
    
    // 判断构造函数的prototype对象是否在对象的原型链上
    while (true) {
        if (!proto) return false;
        // 一般对象到这一步就能结束，自定义函数判断其原生构造函数的话需要再找一层
        if (proto === prototype) return true;
        // if (left.__proto === right.prototypr) return true;
        // 如果没有找到，就继续在其原型上找
        proto = Object.getPrototypeOf(proto);
    }
}

let arr=function () { 
    console.log("function")
}
let arrs = new Array();
console.log(myInstanceof(arrs, Array))
console.log(myInstanceof(arr, Function))
// 自定义构造函数
function Person() { 
    console.log("Person")
} 
let person = new Person();

console.log(myInstanceof(person, Person))
console.log(myInstanceof(person, Object))

