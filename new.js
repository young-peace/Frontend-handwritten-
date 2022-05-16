function myNew(fn, ...args) { 
    if (typeof fn !== 'function') { 
        throw 'fn must be a function'
    } 
    // 将实例对象的__proto__指向构造函数的原型对象
    obj = Object.create(fn.prototype)
    // 构造函数的this指向实例对象
    let res = fn.call(obj, args);
    if (res && (typeof res === 'object' || typeof res === 'function')) { 
        return res;
    }
    return obj;
}
// function Person(name, age) {
//     this.name = name;
//     this.age = age;
// }
// Person.prototype.say = function() {
//   console.log(this.age);
// };
function Person() { 
    // this.a = 1;
    // return { b: 3 }
    this.a = 1;
    // return { a: 3 };
    return 3;
}
let p1 = myNew(Person);
console.log(p1.a);
console.log(p1);
// p1.say();
debugger

    
    