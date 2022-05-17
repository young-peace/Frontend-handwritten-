function insertSort(arr) { 
    for (let i = 1; i < arr.length; i++) { 
        let j = i;
        let target = arr[j];
        // 将target看作要插入的元素，对当前到i的元素和target进行比较
        // 如果小于target，就用前一个元素覆盖当前元素(target)，给target腾位置，一直覆盖直到挪到合适的位置
        // 当前元素被target记录了下来，所以不会丢失
        while (j > 0 && arr[j - 1] > target) { 
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = target;
    }
    return arr;
}
console.log(insertSort([4,3,1,6,5,2]))