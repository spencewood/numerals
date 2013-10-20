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

var existy = function(val){
    return val != null;
};

var sum = function(arr){
    return arr.reduce(function(prev, current){
        return prev + current;
    }, 0);
};

var getNumberFromIndex = function(i){
    if(existy(nums[i])){
        return nums[i].num;
    }

    throw new Error('Invalid number');
};

var getNumeralFromIndex = function(i){
    if(existy(nums[i])){
        return nums[i].numeral;
    }
    
    throw new Error('Invalid numeral');
};

var findNumeralFromNumber = function(x){
    for(var i = 0; i < nums.length; i++){
        if(getNumberFromIndex(i) === x){
            return getNumeralFromIndex(i);
        }
    }

    return -1;
};

var findNumberFromNumeral = function(x){
    for(var i = 0; i < nums.length; i++){
        if(getNumeralFromIndex(i) === x){
            return getNumberFromIndex(i);
        }
    }

    return -1;
};

var findNextIndex = function(x, inc){
    inc = inc || 0;
    if(inc < nums.length && getNumberFromIndex(inc) <= x){
        return findNextIndex(x, inc + 1);
    }

    return inc - 1;
};

var getNumeralComponentArray = function(num, current, arr){
    arr = arr || [], current = current || num;
    var next = getNumberFromIndex(findNextIndex(current));
    arr.push(next);

    if(sum(arr) < num){
        return getNumeralComponentArray(num, current - next, arr);
    }

    return arr;
};

var getNumberComponentArray = function(numeral, arr){
    arr = arr || [];
    numeral = numeral || '';
    var numeralArr = numeral.split('');
    var numeralComp = numeralArr.splice(0, 2);
    var num = findNumberFromNumeral(numeralComp.join(''));

    if(num > 0){
        arr.push(num);
    }
    else if(numeral.length <= 1){
        throw new Error('Invalid numeral');
    }
    else{
        numeralArr.unshift(numeralComp.splice(1, 1));
        arr.push(findNumberFromNumeral(numeralComp.join('')));
    }

    if(numeralArr.length > 0){
        return getNumberComponentArray(numeralArr.join(''), arr);
    }

    return arr;
};

exports.getNumeral = function(num){
    return getNumeralComponentArray(num).map(function(i){
        return findNumeralFromNumber(i);
    }).join('');
};

exports.getNumber = function(numeral){
    return sum.call(null, getNumberComponentArray(numeral));
};