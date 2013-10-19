var nums = [1,4,5,9,10,40,50];
var findNextIndex = function(x, inc){
    var i = inc || 0;
    if(nums[i] <= x){
        return findNextIndex(x, i+1);
    }

    return inc - 1;
};

var sum = function(arr){
    return arr.reduce(function(prev, curr){
        return prev + curr;
    }, 0);
};

var getIntegerArray = function(x){
    var f = [];
    var next = x;
    var current = nums[findNextIndex(x)];
    f.push(current);

    while(sum(f) < x){
        next -= current;
        current = nums[findNextIndex(next)];
        f.push(current);
    }

    return f;
};

exports.findNumeral = function(x){
    return getIntegerArray(x);
};