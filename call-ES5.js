// ES5
// 参数不对称，函数本身没有this，而call第一个参数是this，那么就需要把所有的参数
// 另外保存起来
function person(a, b, c) { 
    console.log(this.name,a,b,c)
    // return {
    //     name:this.name,
    //     a:a,b:b,c:c
    // }
}

Function.prototype.newCall = function (obj) { 
    var obj = obj || window;
    obj.p = this;
    var newArguments = [];
    // 获取函数的参数要用到arguments对象
    for (var i = 1; i < arguments.length; i++) { 
        // newArguments.push(arguments[i]);
        newArguments.push('arguments['+i+']')
    }
    // 数组相当于一个参数，因此需要将参数拆分开来显示
    // obj.p(newArguments);
    // eval()用来执行字符串表达式，并返回表达式的值
    var result=eval('obj.p('+newArguments+')')
    delete obj.p;
    return result;
}
var obj = { name: 'young' }
p=person.newCall(obj, '1', '2', '3')
// console.log(p)