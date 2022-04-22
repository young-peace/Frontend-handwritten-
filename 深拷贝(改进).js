// 对函数对象也兼容
const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && (obj !== null)
const deepClone = function (obj, hash = new WeakMap()) { 
    console.log('obj',obj,'hash',hash)
    if (obj.constructor === Date) return new Date(obj)
    if (obj.constructor === RegExp) return new RegExp(obj)
    // 如果循环引用了就用weakMap来解决
    if (hash.has(obj)) return hash.get(obj)
    // getOwnPropertyDescriptors获取一个对象的所有自身属性的描述符
    let allDesc = Object.getOwnPropertyDescriptors(obj)
    console.log('allDesc',allDesc)
    // 遍历传入参数所有键的属性
    // Object.create创建一个新对象，新对象的__proto__指向原对象
    // Object.create(作为新对象原型的对象，给新对象定义额外属性的对象)
    let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)
    console.log('cloneObj',cloneObj)
    // 继承原型链
    hash.set(obj, cloneObj)
    // Reflect.ownKeys()返回一个由目标对象自身的属性键组成的数组
    for (let key of Reflect.ownKeys(obj)) { 
        cloneObj[key] =
            (isComplexDataType(obj[key]) && typeof obj[key] !== 'function') ?
            deepClone(obj[key],hash):obj[key]
    }
    return cloneObj;
}
console.log(deepClone({ name: '我是一个对象', id: [1, 2, [3]] }))
debugger