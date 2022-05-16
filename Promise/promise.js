class Promise { 
    constructor(executor) { 
// 参数校验
        if (typeof executor !== 'function') { 
            throw new TypeError(`Promise resolver ${executor} is not a function`)
        }
        this.initialValue()
        this.initBind()
        // 处理在Promise内抛出的异常
        try { 
            executor(this.resolve,this.reject)
        } catch (e) { 
            this.reject(e)
        }
    }
    // 代码优化
    // 绑定this
    initBind() { 
        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);
    }
    // 初始化值
    initialValue() { 
        this.value = null; //终值
        this.reason = null; //拒因
        this.state = Promise.PENDING //状态
        // 用数组先保留回调函数执行的结果
        this.onFulfilledCallbacks = [] //成功回调
        this.onRejectedCallbacks=[] //失败回调
    }
    resolve(value) { 
        if (this.state === Promise.PENDING) { 
            this.state = Promise.FULFILLED
            // 执行了成功的回调
            this.value = value
            // 执行
            this.onFulfilledCallbacks.forEach(fn=>fn(this.value))
        }
    }
    reject(reason) { 
        if (this.state = Promise.PENDING) { 
            this.state = Promise.REJECTED
            // 执行了失败的回调
            this.reason = reason
            // 执行
            this.onRejectedCallbacks.forEach(fn=>fn(this.reason))
        }
    }
    // 要实现链式调用，then方法的返回值必须是一个新的实例
    then(onFulfilled, onRejected) {
         // 参数校验
         if (typeof onFulfilled !== 'function') { 
            onFulfilled = function (value) { 
                return value
            }
        }
        if (typeof onRejected !== 'function') { 
            onRejected = function (reason) { 
                throw reason
            }
        }
        // 实现链式调用，且改变了后面then方法的值，必须通过返回新的实例
        let promise2 = new Promise((resolve,reject) => { 
            // 在实际编程中尽量避免魔法字符串
        if (this.state === Promise.FULFILLED) { 
            // 这里是延迟执行的
            setTimeout(() => { 
                try { 
                    const x = onFulfilled(value)
                    resolve(x)                       
                } catch (e) {
                    reject(e)
                }
            })          
        }
        if (this.state === Promise.REJECTED) { 
            setTimeout(() => { 
                try { 
                    const x = onRejected(this.reason)
                    resolve(x)
                } catch (e) { 
                    reject(e)
                }               
            })
        }
        // Promise里执行setTimeout时，state还是pending，执行这一步
        if (this.state === Promise.PENDING) { 
            this.onFulfilledCallbacks.push(value => { 
                // 执行当state为fulfilled时的情况
                setTimeout(() => { 
                    try { 
                        const x = onFulfilled(value)
                        resolve(x)                       
                    } catch (e) {
                        reject(e)
                    }            
                })
            })
            this.onRejectedCallbacks.push(reason => { 
                setTimeout(() => { 
                // 执行当state为rejected时的情况
                    try { 
                        const x = onRejected(this.reason)
                        resolve(x)                       
                    } catch (e) { 
                        reject(e)
                    }
                })
            })
        }
        })
       return promise2    
     }
}
Promise.PENDING = 'pending'
Promise.FULFILLED = 'fulfilled'
Promise.REJECTED = 'rejected'
Promise.resolvePromise = function (promise2, x, resolve, reject) { 
    // x与promise相等,避免循环调用
    if (promise2 === x) { 
        reject(new TypeError('Chaining cycle detected for promise'))
    }
    // 定义一个变量，来标明它是否被调用过
    let called = false;
    if (x instanceof Promise) {
        // 判断x是否为Promise
        x.then(value => {
            Promise.resolvePromise(promise2,value,resolve,reject)
        }, reason => { 
            reject(reason)
        })
    } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        // x为对象或函数
        try { 
            if (typeof x.then === 'function') {
                x.then((value) => { 
                    if (called) return called = true;
                    Promise.resolvePromise(promise2,value,resolve,reject)
                }, reason => {
                    if (called) return called = true;
                    reject(reason)
                })
            } else { 
                if (called) return called = true;
                resolve(x)
            }
        } catch (e) { 
            if (called) return called = true;
            reject(e)
        }   
    } else { 
        if (called) return called = true;
        resolve(x)
    }
}
Promise.defer = Promise.deferred = function () { 
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => { 
        dfd.resolve = resolve
        dfd.reject=reject
    })
    return dfd
}
module.exports=Promise