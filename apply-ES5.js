function foo(a,b,c){ 
    console.log(this.name,a,b,c)
}
Function.prototype.myApply = function (obj, arr) {
    var obj = obj || window,result;
    obj.p = this;
    if (!arr) {
        return result = obj.p();
    } else {
        var newArguments = [];
        for (var i = 0; i < arr.length; i++) {
            newArguments.push('arr[' + i + ']');
        }
        result = eval('obj.p(' + newArguments + ')');
    }
    delete obj.p;
    return result;
};
var obj = {name:'young'}
foo.myApply(obj,['1','2','3'])