const shallowClone = (target) => { 
    if (typeof target === 'object' && target !== null) {
        // 判断这个对象是数组还是普通对象
        const cloneTarget = Array.isArray(target) ? [] : {};
        for (let prop in target) {
            // hasOwnProperty()返回一个布尔值，指示这个对象是否拥有这个属性
            // 遍历target身上的属性并复制
            if (target.hasOwnProperty(prop)) {
                cloneTarget[prop] = target[prop];
            }
        }
        return cloneTarget;
    //如果是基本类型，直接返回 
    } else { 
        return target;
    }
}
let source=[1,[2,[3,4]]]
// let source=[1, 2, {val: 4}]
console.log(shallowClone(source))
debugger;