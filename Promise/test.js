const Promise = require('./promise')
console.log('1')
new Promise((resolve,reject) => { 
    // 严格模式下this为undefined，把声明函数改为箭头函数即可
    setTimeout(() => { 
        resolve(1)
    })
    
    console.log('2')
}).then(
    value => { 
        // 为了防止这里抛出错误，所以函数里使用try catch包裹
        // throw new Error('then error')
        console.log('4')
        // console.log('value', value)
        return new Promise((resolve, reject) => { 
            resolve('1');
        })
    },
    reason => { 
        console.log('reason',reason)
    }
    // 链式调用
).then(
    value => { 
        console.log('5')
        console.log('value',value)
    },
    reason => { 
        console.log('reason',reason)
    }
)
console.log('3')