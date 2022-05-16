// index.js用来编写官方的Promise
// promise.js用来编写自己的Promise
// test.js用来测试自己编写的Promise
// 开发过程结合promise/a+规范
/* console.log('1')
new Promise((resolve,reject) => { 
    setTimeout(() => { 
        resolve(1)
    })
    console.log('2')
}).then(value => {
    console.log('value', value)
    console.log('4')
    return new Promise((resolve, reject) => { 
        resolve('1');
    })
}, reason => {
    console.log('reason',reason)
})
console.log('3') */
// new Promise()
// 循环调用
let p1 = new Promise(resolve => { 
    resolve(1)
})
let p2 = p1.then(() => { 
    return p2;
})