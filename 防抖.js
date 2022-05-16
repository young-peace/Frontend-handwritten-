/* 
防抖或节流：限制函数的执行次数
防抖：通过setTomeout的方式，在一定的时间间隔内，将多次触发变成一次触发
应用场景：限制用户提交表单的次数，监听滚动条
节流：减少一段时间的触发频率
*/
// 节流
function debounce(fn, delay = 300) { 
    let timer;
    return function () { 
        const args = arguments;
        if (timer) { 
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    }
}
// 监听滚动条
window.addEventListener(
    "scroll",
    debounce(() => { 
        console.log(111);
    },1000)
)
// 防抖
function throttle(fn, delay) {
    let flag = true;
    return (() => { 
        if (!flag) return;
        timer = setTimeout(() => {
            fn();
            flag = true;
        }, delay);
    })
}
window.addEventListener(
    "scroll",
    throttle(() => {
        console.log(111);
    }, 1000)
);