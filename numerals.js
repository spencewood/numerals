/**
 * Numerals-- Roman Numeral conversion library
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(exports);
    } else {
        // Browser globals
        factory((root.commonJsStrict = {}));
    }
}(this, function (exports) {
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

    var grabStringPart = function(str, len){
        return [].slice.apply(str, [0, len]).join('');
    };

    var chopStringPart = function(str, len){
        var arr = stringToArray(str);
        arr.splice(0, len);
        return arr.join('');
    };

    var hasDescendingNumerals = function(arr){
        var isSorted = true;
        arr.reduce(function(a, b){
            if(a < b){
                isSorted = false;
            }
            return a;
        });

        return isSorted;
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

    var firstNum = function(fun){
        return nums.filter(fun).shift();
    };

    var findNumeralFromNumber = function(num){
        var obj = firstNum(function(n){
            return n.num === num;
        });

        return existy(obj) ? obj.numeral : undefined;
    };

    var findNumberFromNumeral = function(numeral){
        var obj = firstNum(function(n){
            return n.numeral === numeral;
        });

        return existy(obj) ? obj.num : undefined;
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

    var shiftNumeral = function(fullNumeral, len){
        var numeral = grabStringPart(fullNumeral, len);

        if(len-- > 0){
            if(isValidNumeral(numeral)){
                return numeral;
            }
            else{
                return shiftNumeral(fullNumeral, len);
            }
        }
        
        complain('Invalid numeral');
    };

    var getSplitNumeralArray = function(fullNumeral, arr){
        fullNumeral = fullNumeral || '', arr = arr || [];

        if(fullNumeral.length > 0){
            var numeral = shiftNumeral(fullNumeral, 2);
            var newFullNumeral = chopStringPart(fullNumeral, numeral.length);
            arr.push(numeral);

            return getSplitNumeralArray(newFullNumeral, arr);
        }

        return arr;
    };

    var getNumberComponentArray = function(numeral){
        return getSplitNumeralArray(numeral).map(function(i){
            return findNumberFromNumeral(i);
        });
    };

    /**
     * @param { Integer } num An integer to be converted to a Roman Numeral
     * @returns { String } The Roman Numeral string value for the passed in integer
     */
    exports.getNumeral = function(num){
        if(!existy(num) || num === ''){
            return '';
        }
        if(num > 3999999){
            complain('Max numeral exceeded');
        }
        
        return getNumeralComponentArray(num).map(function(i){
            return findNumeralFromNumber(i);
        }).join('');
    };

    /**
     * @param { String } numeral A Roman Numeral
     * @returns { Integer } The integer value of the Roman Numeral string
     */
    exports.getNumber = function(numeral){
        if(!existy(numeral) || numeral === ''){
            return '';
        }
        if(/(.)\1{3,}/.test(numeral)){
            complain('Invalid numeral');
        }

        var numerals = getNumberComponentArray(numeral);

        if(hasDescendingNumerals(numerals)){
            return sum(numerals);
        }

        throw new Error('Invalid');
    };
}));