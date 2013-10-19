var numerals = require('../numerals');

require('should');

describe('findNumeral', function(){
    it('should return I when passing 1', function(){
        numerals.findNumeral(1).should.equal('I');
    });

    it('should return V when passing 5', function(){
        numerals.findNumeral(5).should.equal('V');
    });

    it('should return XL when passing 40', function(){
        numerals.findNumeral(40).should.equal('XL');
    });

    it('should return MMXIII when passing 2013', function(){
        numerals.findNumeral(2013).should.equal('MMXIII');
    });
});