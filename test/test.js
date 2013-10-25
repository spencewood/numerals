var numerals = require('../numerals');

require('should');

describe('numerals', function(){
    describe('getNumeral', function(){
        it('should throw if passing an invalid number', function(){
            (function(){
                numerals.getNumeral('fail');
            }).should.throw(/Invalid/);
        });

        it('should throw if passing nothing', function(){
            (function(){
                numerals.getNumeral();
            }).should.throw(/Invalid/);
        });

        it('should throw if passing a number larger than 3999999', function(){
            (function(){
                numerals.getNumeral(4000000);
            }).should.throw(/max/i);
        });

        describe('basic', function(){
            it('should return I when passing 1', function(){
                numerals.getNumeral(1).should.equal('I');
            });

            it('should return IV when passing 4', function(){
                numerals.getNumeral(4).should.equal('IV');
            });

            it('should return V when passing 5', function(){
                numerals.getNumeral(5).should.equal('V');
            });

            it('should return IX when passing 9', function(){
                numerals.getNumeral(9).should.equal('IX');
            });

            it('should return X when passing 10', function(){
                numerals.getNumeral(10).should.equal('X');
            });

            it('should return XL when passing 40', function(){
                numerals.getNumeral(40).should.equal('XL');
            });

            it('should return L when passing 50', function(){
                numerals.getNumeral(50).should.equal('L');
            });

            it('should return XC when passing 90', function(){
                numerals.getNumeral(90).should.equal('XC');
            });

            it('should return C when passing 100', function(){
                numerals.getNumeral(100).should.equal('C');
            });

            it('should return CD when passing 400', function(){
                numerals.getNumeral(400).should.equal('CD');
            });

            it('should return D when passing 500', function(){
                numerals.getNumeral(500).should.equal('D');
            });

            it('should return CM when passing 900', function(){
                numerals.getNumeral(900).should.equal('CM');
            });

            it('should return M when passing 1000', function(){
                numerals.getNumeral(1000).should.equal('M');
            });
        });
        
        describe('mixed', function(){
            it('should return III when passing 3', function(){
                numerals.getNumeral(3).should.equal('III');
            });

            it('should return MMXIII when passing 2013', function(){
                numerals.getNumeral(2013).should.equal('MMXIII');
            });

            it('should return MCMLIV when passing 1954', function(){
                numerals.getNumeral(1954).should.equal('MCMLIV');
            });

            it('should return MLXVI when passing 1066', function(){
                numerals.getNumeral(1066).should.equal('MLXVI');
            });

            it('should return mmmdccclxxxvMMMDCCCLXXXVIII when passing 3888888', function(){
                numerals.getNumeral(3888888).should.equal('mmmdccclxxxvMMMDCCCLXXXVIII');
            });

            it('should return mmmcmxcixCMXCIX when passing 3999999', function(){
                numerals.getNumeral(3999999).should.equal('mmmcmxcixCMXCIX');
            });
        });
    });
    
    describe('getNumber', function(){
        it('should throw if passing an invalid numeral', function(){
            (function(){
                numerals.getNumber('fail');
            }).should.throw(/Invalid/);
        });

        it('should throw if passing nothing', function(){
            (function(){
                numerals.getNumber();
            }).should.throw(/Invalid/);
        });

        describe('basic', function(){
            it('should return 1 when passing I', function(){
                numerals.getNumber('I').should.equal(1);
            });

            it('should return 4 when passing IV', function(){
                numerals.getNumber('IV').should.equal(4);
            });

            it('should return 5 when passing V', function(){
                numerals.getNumber('V').should.equal(5);
            });

            it('should return 9 when passing IX', function(){
                numerals.getNumber('IX').should.equal(9);
            });

            it('should return 10 when passing X', function(){
                numerals.getNumber('X').should.equal(10);
            });

            it('should return 40 when passing XL', function(){
                numerals.getNumber('XL').should.equal(40);
            });

            it('should return 50 when passing L', function(){
                numerals.getNumber('L').should.equal(50);
            });

            it('should return 90 when passing XC', function(){
                numerals.getNumber('XC').should.equal(90);
            });

            it('should return 100 when passing C', function(){
                numerals.getNumber('C').should.equal(100);
            });

            it('should return 400 when passing CD', function(){
                numerals.getNumber('CD').should.equal(400);
            });

            it('should return 500 when passing D', function(){
                numerals.getNumber('D').should.equal(500);
            });

            it('should return 900 when passing CM', function(){
                numerals.getNumber('CM').should.equal(900);
            });

            it('should return 1000 when passing M', function(){
                numerals.getNumber('M').should.equal(1000);
            });
        });

        describe('mixed', function(){
            it('should return 3 when passing III', function(){
                numerals.getNumber('III').should.equal(3);
            });

            it('should return 2013 when passing MMXIII', function(){
                numerals.getNumber('MMXIII').should.equal(2013);
            });

            it('should return 1954 when passing MCMLIV', function(){
                numerals.getNumber('MCMLIV').should.equal(1954);
            });

            it('should return 1066 when passing MLXVI', function(){
                numerals.getNumber('MLXVI').should.equal(1066);
            });

            it('should return 3888888 when passing mmmdccclxxxvMMMDCCCLXXXVIII', function(){
                numerals.getNumber('mmmdccclxxxvMMMDCCCLXXXVIII').should.equal(3888888);
            });

            it('should return 3999999 when passing mmmcmxcixCMXCIX ', function(){
                numerals.getNumber('mmmcmxcixCMXCIX').should.equal(3999999);
            });
        });
    });
});