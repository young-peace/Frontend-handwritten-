function search(nums, target) { 
    const n = nums.length;
    let left = 0, right = n - 1;
    while (left <= right) { 
        let mid = Math.floor((right - left) / 2) + left;
        if (target < nums[mid]) {
            right = mid - 1;
        } else if (target > nums[mid]) {
            left = mid + 1;
        } else { 
            return mid;
        }
    }
    return -1;
}