var numerals = require('../numerals');

require('should');

describe('numerals', function(){
    describe('getNumeral', function(){
        it.skip('should throw if passing an invalid string', function(){
            (function(){
                numerals.getNumeral('fail');
            }).should.throw();
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
            it('should return MMXIII when passing 2013', function(){
                numerals.getNumeral(2013).should.equal('MMXIII');
            });

            it('should return MCMLIV when passing 1954', function(){
                numerals.getNumeral(1954).should.equal('MCMLIV');
            });

            it('should return MLXVI when passing 1066', function(){
                numerals.getNumeral(1066).should.equal('MLXVI');
            });
        });
    });
    
    /*describe('getNumber', function(){
        it('should return 1 when passing I', function(){
            numerals.getNumber('I').should.equal(1);
        });
    });*/
});