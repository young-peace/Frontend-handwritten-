// 把多参数传入的函数拆成单参数函数，内部调用再返回调用下一个单参数
function currying(fn, ...args) { 
    console.log(fn)
    const length = fn.length;
    // 把参数攒起来
    let allArgs = [...args];
    // 之后调用执行函数
    const res = (...newArgs) => {
        // 攒够参数
        allArgs = [...allArgs, ...newArgs];
        // 如果参数和之前函数的参数相同，就直接执行函数
        if (allArgs.length === length) {
            return fn(...allArgs);
        } else {
            // 如果参数不够，就继续返回函数攒够参数再执行
            return res;
        }
    };
    // 第一次调用返回构造的函数
    return res;
}
const add = (a, b) => a + b ;
const a = currying(add, 1);
console.log(a(2,3))