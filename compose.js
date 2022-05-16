import compose from 'lodash/fp/compose.js';
/* function myCompose(...fn) { 
    if (!fn.length) return (v) => v;
    if (fn.length === 1) return fn[0];
    return fn.reduce(
        (pre, cur) => (...args) => pre(cur(...args))
    );
} */
function myCompose(...fn) { 
    let length = fn.length;
    let count = length - 1;
    let result;
    return function f1(...args) {
        result = fn[count].apply(this, args);
        // result = fn[count](args);
        
        if (count <= 0) { 
            count = length - 1;
            return result;
        }
        count--;
        // return f1.call(null,result);
        return f1(result);
    }
}
// 用法如下:
function fn1(x) {
    return x + 1;
  }
  function fn2(x) {
    return x + 2;
  }
  function fn3(x) {
    return x + 3;
  }
  function fn4(x) {
    return x + 4;
  }
//   const a = compose(fn1, fn2, fn3, fn4);
//   console.log(a(1)); // 1+4+3+2+1=11
  
const b = myCompose(fn1, fn2, fn3, fn4);
console.log(b(1))
