function deepClone(obj) { 
    // 在堆内存中重新开辟一块内存空间
    let cloneObj = {};
    for (let key in obj) { 
        // 拷贝对象深层的嵌套对象
        if (typeof obj[key] === 'object') {
            // 是对象就再次递归调用该函数
            cloneObj[key] = deepClone(obj[key])
        } else { 
            // 基本类型的话直接复制值
            cloneObj[key]=obj[key]
        }
    }
    return cloneObj
}
let obj1 = { a: { b: 1 } };
let obj2 = deepClone(obj1);
obj1.a.b = 2;
console.log(obj1,obj2);
debugger;