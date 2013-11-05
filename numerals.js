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

    var argumentsToArray = function(args){
        return [].slice.call(args);
    };

    var rest = function(arr){
        return arr.slice(1);
    };

    var combine = function(arr){
        return arr.join('');
    };

    var pipeline = function(seed){
        return rest(argumentsToArray(arguments)).reduce(function(l, r){
            return r(l);
        }, seed);
    };

    var validator = function(message, fun){
        var f = function(){
            return fun.apply(fun, arguments);
        };

        f.message = message;
        return f;
    };

    var validate = function(){
        var validators = argumentsToArray(arguments);

        return function(test){
            return validators.reduce(function(errs, check){
                if(!check(test)){
                    complain(check.message);
                }
                return errs;
            }, []);
        };
    };

    var hasDescendingNumbers = function(arr){
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

    var getNumberComponents = function(num, current, arr){
        arr = arr || [], current = current || num;
        var next = getNumberFromIndex(findNextIndex(current));
        arr.push(next);

        if(sum(arr) < num){
            return getNumberComponents(num, current - next, arr);
        }

        return arr;
    };

    var convertNumberToNumeral = function(number){
        return findNumeralFromNumber(number);
    };

    var convertNumbersToNumerals = function(arr){
        return arr.map(convertNumberToNumeral);
    };

    var getNumeralComponents = function(numeral, arr){
        numeral = numeral || '', arr = arr || [];

        if(numeral.length > 0){
            // take off the first two characters of the numeral string
            var numeralArr = stringToArray(numeral);
            var numeralComp = numeralArr.splice(0, 2);
            var meral = numeralComp.join('');

            // test if those two characters are a numeral
            if(isValidNumeral(meral)){
                arr.push(meral);
            }
            else{
                // if not, put the right character back onto the numeral string 
                numeralArr.unshift(numeralComp.pop());
                meral = numeralComp.pop();
                // test if just the first character is a valid numeral
                if(isValidNumeral(meral)){
                    arr.push(meral);
                }
                else{
                    complain('Invalid numeral');
                }
            }
            return getNumeralComponents(numeralArr.join(''), arr);
        }

        return arr;
    };

    var convertNumeralToNumber = function(numeral){
        return findNumberFromNumeral(numeral);
    };

    var convertNumeralsToNumbers = function(arr){
        return arr.map(convertNumeralToNumber);
    };

    var numberBelowFourMillionValidator = function(number){
        return validator('Max numeral exceeded', function(){
            return number < 4000000;
        });
    };

    var validNumberValidator = function(number){
        return validator('Invalid number', function(){
            return !isNaN(number);
        });
    };

    var validateNumberIsBelowFourMillion = function(number){
        return validate(numberBelowFourMillionValidator(number));
    };

    var validateThatNumberIsANumber = function(number){
        return validate(validNumberValidator(number));
    };

    var getNumeral = function(number){
        if(!existy(number) || number === ''){
            return '';
        }
        validateThatNumberIsANumber(number)();
        validateNumberIsBelowFourMillion(number)();

        return pipeline(
            number,
            //validateNumberIsBelowFourMillion,
            getNumberComponents,
            convertNumbersToNumerals,
            combine
        );
    };

    var getNumber = function(numeral){
        if(!existy(numeral) || numeral === ''){
            return '';
        }
        if(/(.)\1{3,}/.test(numeral)){
            complain('Invalid numeral');
        }

        var numbers = pipeline(numeral, getNumeralComponents, convertNumeralsToNumbers);

        if(!hasDescendingNumbers(numbers)){
            throw new Error('Invalid numeral');
        }

        return pipeline(numbers, sum);
    };

    /**
     * @param { Integer } number An integer to be converted to a Roman Numeral
     * @returns { String } The Roman Numeral string value for the passed in integer
     */
    exports.getNumeral = getNumeral;

    /**
     * @param { String } numeral A Roman Numeral
     * @returns { Integer } The integer value of the Roman Numeral string
     */
    exports.getNumber = getNumber;
}));