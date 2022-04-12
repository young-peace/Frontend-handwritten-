function person(a, b, c) { 
    console.log(this.name);
    console.log(a, b, c);
}
// 为person对象的原型对象添加属性
person.prototype.collection = '收藏';
var egg = { name: 'young' };

Function.prototype.myBind = function (obj) { 
    // 检测数据类型
    if (typeof this !== 'function') { 
        throw new TypeError('错误');
    }
    // 函数里返回函数，在执行过程中很容易造成this的丢失，所以这里先保存this
    var that = this;
    // myBind截取函数参数部分，这个arguments对象里面包含newBind第一个括号的参数
    // arguments是对象不是数组，因此不能直接使用数组的切割方法
    // 需要利用call方法把slice切割方法赋给arguments对象
    arr = Array.prototype.slice.call(arguments, 1);
    o = function () { }
    // 把返回函数设置为具名函数，因为有了名字的函数才能进行关系的确认
    newf = function () {
        // 截取
        // 第二个arguments对象包含newBind第二个括号的参数
        var arr2 = Array.prototype.slice.call(arguments);
        // 合并两个arguments参数，顺序不能反
        arrSum = arr.concat(arr2)
        // 判断this是否为函数o的实例
        if (this instanceof o) {
            // apply接受数组对象，直接用apply
            // 如果是，把apply的this绑定到新实例上
            // 如果输入是null，apply会自动解决这个问题
            that.apply(this, arrSum)
        } else {
            that.apply(obj, arrSum)
        }
    };
    // 用原型链把他们串联起来，简单来说就说把person的原型对象赋值给bibi这个函数的原型对象
    // 使person和bibi串联起来，使bibi这个函数的实例可以用到person原型对象的属性
    // 把空函数o的原型对象修改为函数person的原型对象
    // 再把新函数newf的原型对象作为空函数o的实例进行串联（也就说把函数bibi的原型对象作为空函数o的实例进行串联）
    // 利用空函数作为一个桥
    o.prototype = that.prototype;
    newf.prototype = new o;
    return newf;
}
var bibi = person.bind(egg, '1', '2');
// 如果使用new来调用函数，那么bind第一个参数this会指向实例对象
var b = new bibi('充电');
console.log(b.collection)