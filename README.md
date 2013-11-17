# Numerals

Numerals converts from number to Roman Numeral and from Roman Numeral to a number. It is compatible with CommonJS (node) and AMD.

## Examples
```javascript
var n = require('numerals');

n.getNumber('XXXV');
// 35

n.getNumeral(35);
// 'XXXV'

n.getNumeral(3888888);
// 'mmmdccclxxxvMMMDCCCLXXXVIII'

n.getNumeralParts(3888888);
// ['MMMDCCCLXXXV', 'MMMDCCCLXXXVIII']
```

## The Case for Lowercase
The largest number that can be represented with a single standard character numeral is 1000 (M). To represent very large numbers, sometimes a bar over the numeral is used to indicate that numeral times 1000. So, V with a bar over it would be 5000 and M with a bar over it would be 1000000. Since there is no easy way to represent this with a standard characters, lowercase is used to instead for these.

Very large Roman Numerals are rare in the wild. If special formatting is needed for the barred numerals, it may be easier to use getNumeralParts(). With this function, the first element of the array will be the barred numerals and the second set will be without.

## Max Numeral
The max numeral that this library supports is 3999999. 

## Tests
```bash
$ npm install --dev
$ make test
```