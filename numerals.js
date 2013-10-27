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
    { num: 1000, numeral: 'M' },
    { num: 4000, numeral: 'iv' },
    { num: 5000, numeral: 'v' },
    { num: 9000, numeral: 'ix' },
    { num: 10000, numeral: 'x' },
    { num: 40000, numeral: 'xl' },
    { num: 50000, numeral: 'l' },
    { num: 90000, numeral: 'xc' },
    { num: 100000, numeral: 'c' },
    { num: 400000, numeral: 'cd'},
    { num: 500000, numeral: 'd' },
    { num: 900000, numeral: 'cm' },
    { num: 1000000, numeral: 'm' }
];

var existy = function(val){
    return val != null;
};

var sum = function(arr){
    return arr.reduce(function(prev, current){
        return prev + current;
    }, 0);
};

var complain = function(msg){
    throw new Error(msg);
};

var stringToArray = function(string){
    return string.split('');
};

var getNumberFromIndex = function(i){
    if(existy(nums[i])){
        return nums[i].num;
    }

    complain('Invalid number');
};

var getNumeralFromIndex = function(i){
    if(existy(nums[i])){
        return nums[i].numeral;
    }
    
    complain('Invalid numeral');
};

var findNumeralFromNumber = function(x){
    for(var i = 0; i < nums.length; i++){
        if(getNumberFromIndex(i) === x){
            return getNumeralFromIndex(i);
        }
    }

    return undefined;
};

var findNumberFromNumeral = function(x){
    for(var i = 0; i < nums.length; i++){
        if(getNumeralFromIndex(i) === x){
            return getNumberFromIndex(i);
        }
    }

    return undefined;
};

var findNextIndex = function(x, inc){
    inc = inc || 0;
    if(inc < nums.length && getNumberFromIndex(inc) <= x){
        return findNextIndex(x, inc + 1);
    }

    return inc - 1;
};

var isValidNumeral = function(numeral){
    return findNumberFromNumeral(numeral) > 0;
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

var getSplitNumeralArray = function(numeral, arr){
    numeral = numeral || '', arr = arr || [];

    if(numeral.length > 0){
        var numeralArr = stringToArray(numeral);
        var numeralComp = numeralArr.splice(0, 2);
        var meral = numeralComp.join('');

        if(isValidNumeral(meral)){
            arr.push(meral);
        }
        else{
            numeralArr.unshift(numeralComp.pop());
            meral = numeralComp.pop();
            if(isValidNumeral(meral)){
                arr.push(meral);
            }
            else{
                complain('Invalid numeral');
            }
        }
        return getSplitNumeralArray(numeralArr.join(''), arr);
    }

    return arr;
};

var getNumberComponentArray = function(numeral){
    return getSplitNumeralArray(numeral).map(function(i){
        return findNumberFromNumeral(i);
    });
};

exports.getNumeral = function(num){
    if(!existy(num)){
        complain('Invalid number');
    }
    if(num > 3999999){
        complain('Max numeral exceeded');
    }
    
    return getNumeralComponentArray(num).map(function(i){
        return findNumeralFromNumber(i);
    }).join('');
};

exports.getNumber = function(numeral){
    if(!existy(numeral)){
        complain('Invalid numeral');
    }
    if(/(.)\1{3,}/.test(numeral)){
        complain('Invalid numeral');
    }

    return sum(getNumberComponentArray(numeral));
};