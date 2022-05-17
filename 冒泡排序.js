function bubbleSort(arr) { 
    const len = arr.length;
    for (let i = 0; i < len; i++) { 
        for (let j = 1; j < len-1; j++) { 
            if (arr[j] > arr[j + 1]) { 
                [arr[j],arr[j+1]]=[arr[j+1],arr[j]]
            }
        }
    }
    return arr;
}
console.log(bubbleSort([4,3,1,6,5,2]))
