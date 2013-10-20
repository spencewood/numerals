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

var getNumberFromIndex = function(i){
    //error checking
    return nums[i].num;
};

var getNumeralFromIndex = function(i){
    //error checking
    return nums[i].numeral;
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

var getNumeralComponentArray = function(target, current, arr){
    arr = arr || [], current = current || target;
    var next = getNumberFromIndex(findNextIndex(current));
    arr.push(next);

    if(sum(arr) < target){
        return getNumeralComponentArray(target, current - next, arr);
    }

    return arr;
};

var getNumberComponentArray = function(target, arr){
    arr = arr || [];
    var targetArr = target.split('');
    var numeralComp = targetArr.splice(0, 2);
    var num = findNumberFromNumeral(numeralComp.join(''));
    
    if(num > 0){
        arr.push(num);
    }
    else{
        targetArr.unshift(numeralComp.splice(1, 1));
        arr.push(findNumberFromNumeral(numeralComp.join('')));
    }

    if(targetArr.length > 0){
        return getNumberComponentArray(targetArr.join(''), arr);
    }

    return arr;
};

exports.getNumeral = function(number){
    return getNumeralComponentArray(number).map(function(i){
        return findNumeralFromNumber(i);
    }).join('');
};

exports.getNumber = function(numeral){
    return sum.call(null, getNumberComponentArray(numeral));
};