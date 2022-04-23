function myInstanceof(left, right) { 
    //这里先用typeof来判断基础数据类型，如果是，直接返回false
    if (typeof left !== 'object' || left === null) return false;
    // 获取对象的原型
    let proto = Object.getPrototypeOf(left)
    // 获取构造函数的prototype对象
    let prototype = right.prototype
    
    // 判断构造函数的prototype对象是否在对象的原型链上
    while (true) { 
        if (!proto) return false;
        if (proto === prototype) return true;
        // 如果没有找到，就继续在其原型上找，Object.getPrototypeOf方法用来获取指定对象的原型
        proto = Object.getPrototypeOf(proto);
    }
}