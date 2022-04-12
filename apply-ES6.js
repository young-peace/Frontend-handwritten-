function foo(a) { 
    console.log(this.name,a)
}
Function.prototype.myApply = function (thisArgs, ...args) { 
    const fn = Symbol('fn');
    thisArgs = thisArgs || window;
    thisArgs[fn] = this;
    result = thisArgs[fn](...args);
    delete thisArgs[fn];
    return result;
}
obj = { name: 'young' }
foo.myApply(obj,[1,2,3])