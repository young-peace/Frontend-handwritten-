function selectSort(arr) { 
    const len = arr.length;
    let minIndex;
    for (let i = 0; i < len - 1; i++) { 
        minIndex = i;
        // 每次都从数组中选取最小的数字（之前排过序的忽略）
        for (let j = i; j < len; j++) { 
            if (arr[j] < arr[minIndex]) { 
                minIndex = j;
            }
        }
        // 当前元素和最小元素位置互换
        if (minIndex !== i) { 
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    return arr;
}
console.log(selectSort([4,3,1,6,5,2]))