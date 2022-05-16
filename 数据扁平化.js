// 递归
function flatter(arr) { 
    if (!arr.length) return;
    return arr.reduce(
        (pre, cur) => { 
            Array.isArray(cur)?[...pre,...flatter(cur)]:[...pre,cur],[]
        }
    )
}
// 迭代
function flatter(arr) { 
    if (!arr.length) return;
    while (arr.some((item) => Array.isArray(item))) { 
        arr = [].concat(...arr);
    }
    return arr;
}