/**
 * Numerals -- Roman Numeral conversion library
 *
 * exposes:
 *     getNumeral(int)      - Takes a number and returns a numeral
 *     getNumeralParts(int) - Takes a number and returns a two element array
 *     getNumber(str)       - Takes a numeral and returns a number
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
        { number: 1, numeral: 'I' },
        { number: 4, numeral: 'IV' },
        { number: 5, numeral: 'V' },
        { number: 9, numeral: 'IX' },
        { number: 10, numeral: 'X' },
        { number: 40, numeral: 'XL' },
        { number: 50, numeral: 'L' },
        { number: 90, numeral: 'XC' },
        { number: 100, numeral: 'C' },
        { number: 400, numeral: 'CD' },
        { number: 500, numeral: 'D' },
        { number: 900, numeral: 'CM' },
        { number: 1000, numeral: 'M' },
        { number: 4000, numeral: 'iv' },
        { number: 5000, numeral: 'v' },
        { number: 9000, numeral: 'ix' },
        { number: 10000, numeral: 'x' },
        { number: 40000, numeral: 'xl' },
        { number: 50000, numeral: 'l' },
        { number: 90000, numeral: 'xc' },
        { number: 100000, numeral: 'c' },
        { number: 400000, numeral: 'cd'},
        { number: 500000, numeral: 'd' },
        { number: 900000, numeral: 'cm' },
        { number: 1000000, numeral: 'm' }
    ];

    /**
     * Check existence of value. Intentionally using != for the loose checking.
     * @param  {*} val
     * @return {Boolean}
     */
    var existy = function(val){
        return val != null;
    };

    /**
     * Sums up all values in the passed in array.
     * @param  {Array} arr Array of Integers
     * @return {Integer}
     */
    var sum = function(arr){
        return arr.reduce(function(prev, current){
            return prev + current;
        }, 0);
    };

    /**
     * Error throwing.
     * @param  {String} msg Message to alert
     */
    var complain = function(msg){
        throw new Error(msg);
    };

    /**
     * Takes a string and returns an array of characters.
     * @param  {String} string
     * @return {Array}
     */
    var stringToArray = function(string){
        return string.split('');
    };

    /**
     * Takes a native js arguments value and returns it in a real array.
     * @param  {arguments} args 
     * @return {Array}
     */
    var argumentsToArray = function(args){
        return [].slice.call(args);
    };

    /**
     * Returns all elements except the first for the passed in array.
     * @param  {Array} arr
     * @return {Array}
     */
    var rest = function(arr){
        return arr.slice(1);
    };

    /**
     * Combines an array of strings into one string.
     * @param  {Array} arr Array of strings
     * @return {String}
     */
    var combine = function(arr){
        return arr.join('');
    };

    /**
     * Pipeline that takes a seed value and any number of functions. Each
     * function's return will be passed as a parameter to the next, from left
     * to right.
     * @param  {*} seed
     * @return {*}
     */
    var pipeline = function(seed){
        return rest(argumentsToArray(arguments)).reduce(function(l, r){
            return r(l);
        }, seed);
    };

    /**
     * A validation function that takes a validation fail message, and a
     * function to check validation. A false value returned from the passed in
     * function will cause it to fail.
     * @param  {String} message
     * @param  {Function} fun
     * @return {Function}
     */
    var validator = function(message, fun){
        var f = function(){
            return fun.apply(fun, arguments);
        };

        f.message = message;
        return f;
    };

    /**
     * Validator that runs through all validator arguments. It complains if the
     * validator message if any of the validators fail. This function is
     * curried, and will take a value to test on the second call.
     * @return {*}
     */
    var validate = function(){
        var validators = argumentsToArray(arguments);

        return function(test){
            validators.reduce(function(errs, check){
                if(!check(test)){
                    complain(check.message);
                }
            }, []);

            return test;
        };
    };

    /**
     * Takes a string and returns the specified length of characters from the
     * beginning.
     * @param  {String} str
     * @param  {Integer} len Length of characters to return
     * @return {String}
     */
    var grabStringPart = function(str, len){
        return combine([].slice.apply(str, [0, len]));
    };

    /**
     * Takes a string and returns the string WITHOUT the characters of length
     * specified from beginning.
     * @param  {String} str
     * @param  {Integer} len Length of characters to remove
     * @return {String}
     */
    var chopStringPart = function(str, len){
        var arr = stringToArray(str);
        arr.splice(0, len);
        return combine(arr);
    };

    /**
     * Returns whether or not the passed in array has numbers ordered from
     * largest to smallest.
     * @param  {Array}  arr Array of integers
     * @return {Boolean}
     */
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

    /**
     * Returns the number from the nums array at the specified index or
     * complains if not found.
     * @param  {Integer} i Index
     * @return {Integer}
     */
    var getNumberFromIndex = function(i){
        if(existy(nums[i])){
            return nums[i].number;
        }

        complain('Invalid number');
    };

    /**
     * Returns the numeral from the nums array at the specified index or
     * complains if not found.
     * @param  {Integer} i Index
     * @return {String}
     */
    var getNumeralFromIndex = function(i){
        if(existy(nums[i])){
            return nums[i].numeral;
        }
        
        complain('Invalid numeral');
    };

    /**
     * Returns the first item in the nums array that matches the filter
     * conditions of the passed in function.
     * @param  {Function} fun Filter function
     * @return {object}
     */
    var firstNum = function(fun){
        return nums.filter(fun).shift();
    };

    /**
     * Returns the last item in the nums array that matches the filter
     * conditions of the passed in function
     * @param  {Function} fun Filter function
     * @return {object}
     */
    var lastNum = function(fun){
        return nums.filter(fun).pop();
    };

    /**
     * Returns the numeral version from the nums array of the passed in number
     * or returns undefined.
     * @param  {Integer} num
     * @return {String}
     */
    var findNumeralFromNumber = function(number){
        var obj = firstNum(function(n){
            return n.number === number;
        });

        return existy(obj) ? obj.numeral : undefined;
    };

    /**
     * Returns the number version from the nums array of the passed in numeral
     * or returns undefined.
     * @param  {String} numeral
     * @return {Integer}
     */
    var findNumberFromNumeral = function(numeral){
        var obj = firstNum(function(n){
            return n.numeral === numeral;
        });

        return existy(obj) ? obj.number : undefined;
    };

    /**
     * Takes a number and returns the highest number from the nums array that
     * can be taken from the passed in number.
     * @param  {Integer} x
     * @return {Integer}
     */
    var findNextNumberComponent = function(x){
        var obj = lastNum(function(n){
            return n.number <= x;
        });

        return existy(obj) ? obj.number : undefined;
    };

    /**
     * Returns whether or not the passed in numeral has a match in the nums
     * array.
     * @param  {String}  numeral
     * @return {Boolean}
     */
    var isValidNumeral = function(numeral){
        return findNumberFromNumeral(numeral) > 0;
    };

    /**
     * Breaks apart a passed in number into an array of smaller number
     * components that match numeral values.
     * E.g. 35 would break down into: [10,10,10,5]
     * This is a recursive function.
     * @param  {Integer} number
     * @param  {Integer} [current]
     * @param  {Array} [arr]
     * @return {Array}
     */
    var getNumberComponents = function(number, current, arr){
        arr = arr || [], current = current || number;
        var next = findNextNumberComponent(current);
        arr.push(next);

        if(sum(arr) < number){
            return getNumberComponents(number, current - next, arr);
        }

        return arr;
    };

    /**
     * Shifts off the first valid numeral from the left side of the passed in
     * numeral string based on the passed in length. If the numeral is not
     * valid, it recurses with one less length until a numeral match is found.
     * @param  {String} fullNumeral
     * @param  {Integer} len Max length of numeral
     * @return {String}
     */
    var shiftNumeral = function(fullNumeral, len){
        var numeral = grabStringPart(fullNumeral, len);

        if(len > 0){
            if(isValidNumeral(numeral)){
                return numeral;
            }
            else{
                return shiftNumeral(fullNumeral, --len);
            }
        }
        
        complain('Invalid numeral');
    };

    /**
     * Breaks apart a passed in numeral into a valid numeral component array.
     * E.g. XIV would break down into: ['X', 'IV']
     * This is a recursive function.
     * @param  {String} fullNumeral
     * @param  {Array} arr
     * @return {Array}
     */
    var getNumeralComponents = function(fullNumeral, arr){
        fullNumeral = fullNumeral || '', arr = arr || [];

        if(fullNumeral.length > 0){
            var numeral = shiftNumeral(fullNumeral, 2);
            var newFullNumeral = chopStringPart(fullNumeral, numeral.length);
            arr.push(numeral);

            return getNumeralComponents(newFullNumeral, arr);
        }

        return arr;
    };

    /**
     * Converts a passed in number to a numeral from the nums array.
     * @param  {Integer} number Number
     * @return {String}         Numeral
     */
    var convertNumberToNumeral = function(number){
        return findNumeralFromNumber(number);
    };

    /**
     * Converts an array of passed in numbers to an array of numerals.
     * @param  {Array} arr Array of numbers
     * @return {Array}     Array of numerals
     */
    var convertNumbersToNumerals = function(arr){
        return arr.map(convertNumberToNumeral);
    };

    /**
     * Converts a passed in numeral to a number from the nums array.
     * @param  {String}  numeral Numeral
     * @return {Integer}         Number
     */
    var convertNumeralToNumber = function(numeral){
        return findNumberFromNumeral(numeral);
    };

    /**
     * Converts an array of passed in numerals to an array of numbers.
     * @param  {Array} arr Array of numerals
     * @return {Array}     Array of numbers
     */
    var convertNumeralsToNumbers = function(arr){
        return arr.map(convertNumeralToNumber);
    };

    /**
     * Validation function to ensure that number is below 4 million.
     */
    var validateThatNumberIsBelowFourMillion = function(){
        return validate(validator('Max numeral exceeded', function(number){
            return number < 4000000;
        }));
    };

    /**
     * Validation function to ensure that passed in value is a number.
     */
    var validateThatNumberIsANumber = function(){
        return validate(validator('Invalid number', function(number){
            return !isNaN(number);
        }));
    };

    /**
     * Validation function to ensure that there will be no numerals with more
     * than 3 consecutive letters. E.g.: XXXX is invalid.
     */
    var validateThatNumeralHasNoMoreThanThreeConsecutiveLetters = function(){
        return validate(validator('Invalid numeral', function(numeral){
            return !(/(.)\1{3,}/).test(numeral);
        }));
    };

    /**
     * Validation function to ensure that numbers array is descending.
     */
    var validateThatNumbersAreDescending = function(){
        return validate(validator('Invalid numeral', function(numbers){
            return hasDescendingNumbers(numbers);
        }));
    };

    /**
     * Uses the pipeline to break down a number and return a numeral.
     * @param  {Integer} number
     * @return {String}
     */
    var processNumber = function(number){
        return pipeline(
            number,
            validateThatNumberIsANumber(),
            validateThatNumberIsBelowFourMillion(),
            getNumberComponents,
            convertNumbersToNumerals,
            combine
        );
    };

    /**
     * Uses the pipeline to break down a numeral and return a number.
     * @param  {String}  numeral
     * @return {Integer}
     */
    var processNumeral = function(numeral){
        return pipeline(
            numeral,
            validateThatNumeralHasNoMoreThanThreeConsecutiveLetters(),
            getNumeralComponents,
            convertNumeralsToNumbers,
            validateThatNumbersAreDescending(),
            sum
        );
    };

    /**
     * Takes a number and returns the equivalent numeral.
     * @param   {Integer} number Integer to be converted to a Roman Numeral.
     * @returns {String}  Roman Numeral string value for the passed in integer
     */
    var getNumeral = function(number){
        if(!existy(number) || number === ''){
            return '';
        }

        return processNumber(number);
    };

    /**
     * Takes a number and returns an array of two parts: the barred numerals
     * and the unbarred numerals.
     * @param  {Integer} number
     * @return {Array}
     */
    var getNumeralParts = function(number){
        var numeral = getNumeral(number);
        var parts = numeral.match(/([a-z]+)?([A-Z]+)?/);
        parts.shift();
        parts.map(function(n){
            return typeof n === 'undefined' ? n : n.toUpperCase();
        });

        return parts;
    };

    /**
     * Takes a numeral and returns the equavalent number.
     * @param   {String}  numeral Numeral to be converted to a number.
     * @returns {Integer} Integer value of the passed in Roman Numeral string
     */
    var getNumber = function(numeral){
        if(!existy(numeral) || numeral === ''){
            return '';
        }

        return processNumeral(numeral);
    };

    module.exports = {
        getNumeral: getNumeral,
        getNumeralParts: getNumeralParts,
        getNumber: getNumber
    };
}));