function Promise(executor) { 
    var self = this;
    self.status = 'pending'; //Promise当前的状态
    self.data = undefined; //Promise的值
    self.onResolvedCallback = [] //Promise resolve时的回调函数集
    self.onRejectedCallback = [] //Promise reject时的回调函数集
    // 完善resolve和reject函数
    function resolve(value) { 
        if (self.status === 'pending') { 
            self.status = 'resolved';
            self.data = value;
            for (var i = 0; i < self.onResolvedCallback.length; i++) { 
                self.onResolvedCallback[i](value)
            }
        }
    }
    function reject(reason) { 
        if (self.status === 'pending') { 
            self.status = 'rejected';
            self.data = reason;
            for (var i = 0; i < self.onRejectedCallback.length; i++) { 
                self.onRejectedCallback[i](reason)
            }
            
        }
    }
    try { //考虑执行过程中有可能出错，所以我们用try/catch包起来
        executor(resolve, reject) //执行executor并传入相应的参数
    } catch (e) { 
        reject(e)
    }
}
// then方法接收两个参数onResolved和onRejected，分别为Promise成功或失败后的回调
Promise.prototype.then = function (onResolved, onRejected) { 
    var self = this;
    var promise2
    // 根据标准，如果then的参数不是function，则需要忽略它
    onResolved = typeof onResolved === 'function' ? onResolved : function (v) { }
    onRejected = typeof onRejected === 'function' ? onRejected : function (r) { }
    if (self.status === 'resolved') { 
        // 如果promise1的状态已经确定并且是resolved，我们调用onResolved，考虑到有可能throw，所以还需将其包在try/catch里
        return promise2 = new Promise(function (resolve, reject) { 
            try {
                var x = onResolved(self.data)
                if (x instanceof Promise) {
                    // 如果onResolved的返回值是一个Promise对象，直接取它的结果作为promise2的结果
                    x.then(resolve, reject)
                }
                resolve(x) //否则，以它的返回值作为promise2的结果
            } catch (e) { 
                reject(e) //如果出错，以捕获到的错误作为promise2的结果
            }
        })
    }
    // 此处与前一个if块的逻辑几乎相同，区别在于所调用的是onRejected函数
    if (self.status === 'rejected') { 
        return promise2 = new Promise(function (resolve, reject) { 
            try {
                var x = onRejected(self.data)
                if (x instanceof Promise) { 
                    x.then(resolve,reject)
                }
            } catch (e) { 
                reject(e)
            }
        })
    }
    if (self.status === 'pending') { 
        // 如果当前的Promise还处于pending状态，我们并不能确定调用onResolved还是onRejected，只能等到Promise确定状态后，才能确定如何处理
        return promise2 = new Promise(function (resolve, reject) { 
            self.onResolvedCallback.push(function (value) { 
                try {
                    var x = onResolved(self.data)
                    if (x instanceof Promise) { 
                        x.then(resolve,reject)
                    }
                } catch (e) { 
                    reject(e)
                }
            })
            self.onRejectedCallback.push(function (reason) { 
                try {
                    var x = onRejected(self.data)
                    if (x instanceof Promise) { 
                        x.then(resolve,reject)
                    }
                } catch (e) { 
                    reject(e)
                }
            })
        })
    }
}