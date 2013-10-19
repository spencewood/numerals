var nums = [
    { num: 1, numeral: 'I' },
    { num: 4, numeral: 'IV' },
    { num: 5, numeral: 'V' },
    { num: 9, numeral: 'IX' },
    { num: 10, numeral: 'X' },
    { num: 40, numeral: 'XL' },
    { num: 50, numeral: 'L' },
    { num: 90, numeral: 'XC' },
    { num: 100, numeral: 'C' },
    { num: 400, numeral: 'CD' },
    { num: 500, numeral: 'D' },
    { num: 900, numeral: 'CM' },
    { num: 1000, numeral: 'M' }
];

var findNextIndex = function(x, inc){
    var i = inc || 0;
    if(i < nums.length && getNumberFromIndex(i) <= x){
        return findNextIndex(x, i + 1);
    }

    return i - 1;
};

var sum = function(arr){
    return arr.reduce(function(prev, curr){
        return prev + curr;
    }, 0);
};

var getNumberFromIndex = function(x){
    return nums[x].num;
};

var getNumeralFromIndex = function(x){
    return nums[x].numeral;
};

var getNumeralFromNumber = function(x){
    for(var i = 0; i < nums.length; i++){
        if(nums[i].num === x){
            return nums[i].numeral;
        }
    }
};

var getComponentArray = function(x){
    var arr = [];
    var next = x;
    var current = getNumberFromIndex(findNextIndex(x));
    arr.push(current);

    while(sum(arr) < x){
        next -= current;
        current = getNumberFromIndex(findNextIndex(next));
        arr.push(current);
    }

    return arr;
};

exports.getNumeral = function(number){
    return getComponentArray(number).map(function(i){
        return getNumeralFromNumber(i);
    }).join('');
};

exports.getNumber = function(numeral){
    //return numeral
};