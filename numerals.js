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
    inc = inc || 0;
    if(inc < nums.length && getNumberFromIndex(inc) <= x){
        return findNextIndex(x, inc + 1);
    }

    return inc - 1;
};

var sum = function(arr){
    return arr.reduce(function(prev, current){
        return prev + current;
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

var getComponentArray = function(target, current, arr){
    arr = arr || [], current = current || target;
    var next = getNumberFromIndex(findNextIndex(current));
    arr.push(next);

    if(sum(arr) < target){
        return getComponentArray(target, current - next, arr);
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