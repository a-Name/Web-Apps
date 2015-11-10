var expect = require('chai').expect;
var is = require('../lib/is/index');

describe('is micro-checking library', function() {
  describe('is.arguments', function () {
    it('should return true if passed parameter type is arguments', function () {
      var getArguments = function () {
          return arguments;
      };
      var arguments = getArguments('test');
      expect(is.arguments(arguments)).to.be.true;
    });
    it("should return false if passed parameter type is not arguments", function () {
      var notArguments = ['test'];
      expect(is.arguments(notArguments)).to.be.false;
    });
  });

  describe('is.array', function () {
    it('should return true if passed parameter type is array', function () {
      expect(is.array(['value'])).to.be.true;
    });
    it("should return false if passed parameter type is not array", function () {
      expect(is.array('value')).to.be.false;
    });
  });

  describe('is.boolean', function () {
    it('should return true if passed parameter type is boolean', function () {
      expect(is.boolean(true)).to.be.true;
    });
    it("should return false if passed parameter type is not boolean", function () {
      expect(is.boolean('a')).to.be.false;
    });
  });

  describe('is.date', function () {
    it('should return true if passed parameter type is date', function () {
      expect(is.date(new Date)).to.be.true;
    });
    it("should return false if passed parameter type is not date", function () {
      expect(is.date('a')).to.be.false;
    });
  });

  describe('is.error', function () {
    it('should return true if passed parameter type is error', function () {
      expect(is.error(new Error)).to.be.true;
    });
    it("should return false if passed parameter type is not error", function () {
      expect(is.error('a')).to.be.false;
    });
  });

  describe('is.nan', function () {
    it('should return true if passed parameter type is nan', function () {
      expect(is.nan(Number.NaN)).to.be.true;
    });
    it("should return false if passed parameter type is not nan", function () {
      expect(is.nan('a')).to.be.false;
    });
  });

  describe('is.number', function () {
    it('should return true if passed parameter type is number', function () {
      expect(is.number(1)).to.be.true;
    });
    it("should return false if passed parameter type is not number", function () {
      expect(is.number('a')).to.be.false;
    });
  });

  describe('is.object', function () {
    it('should return true if passed parameter type is object', function () {
      expect(is.object(Object)).to.be.true;
    });
    it("should return false if passed parameter type is not object", function () {
      expect(is.object('a')).to.be.false;
    });
  });

  describe('is.json', function () {
    it('should return true if passed parameter type is json', function () {
      expect(is.json({"a":[{"b":"c"}]})).to.be.true;
    });
    it("should return false if passed parameter type is not json", function () {
      expect(is.json('a')).to.be.false;
    });
  });

  describe('is.regexp', function () {
    it('should return true if passed parameter type is regexp', function () {
      expect(is.regexp(new RegExp)).to.be.true;
    });
    it("should return false if passed parameter type is not regexp", function () {
      expect(is.regexp('a')).to.be.false;
    });
  });

  describe('is.sameType', function () {
    it('should return true if passed parameter type is sameType', function () {
      expect(is.sameType(1,11)).to.be.true;
    });
    it("should return false if passed parameter type is not sameType", function () {
      expect(is.sameType('a',1)).to.be.false;
    });
  });

  describe('is.string', function () {
    it('should return true if passed parameter type is string', function () {
      expect(is.string('a')).to.be.true;
    });
    it("should return false if passed parameter type is not string", function () {
      expect(is.string(1)).to.be.false;
    });
  });

  describe('is.char', function () {
    it('should return true if passed parameter type is char', function () {
      expect(is.char('a')).to.be.true;
    });
    it("should return false if passed parameter type is not char", function () {
      expect(is.char('nochar')).to.be.false;
    });
  });

  describe('is.undefined', function () {
    it('should return true if passed parameter type is undefined', function () {
      expect(is.undefined(undefined)).to.be.true;
    });
    it("should return false if passed parameter type is not undefined", function () {
      expect(is.undefined('a')).to.be.false;
    });
  });

  describe('is.empty', function () {
    it('should return true if passed parameter type is empty', function () {
      expect(is.empty('')).to.be.true;
    });
    it("should return false if passed parameter type is not empty", function () {
      expect(is.empty('a')).to.be.false;
    });
  });

  describe('is.existy', function () {
    it('should return true if passed parameter type is existy', function () {
      expect(is.existy('a')).to.be.true;
    });
    it("should return false if passed parameter type is not existy", function () {
      expect(is.existy(null)).to.be.false;
      expect(is.existy(undefined)).to.be.false;
    });
  });

  describe('is.truthy', function () {
    it('should return true if passed parameter type is truthy', function () {
      expect(is.truthy('a')).to.be.true;
    });
    it("should return false if passed parameter type is not truthy", function () {
      expect(is.truthy(null)).to.be.false;
      expect(is.truthy(undefined)).to.be.false;
      expect(is.truthy('')).to.be.false;
      expect(is.truthy(0)).to.be.false;
      expect(is.truthy(false)).to.be.false;
    });
  });

  describe('is.space', function () {
    it('should return true if passed parameter type is space', function () {
      expect(is.space(' ')).to.be.true;
    });
    it("should return false if passed parameter type is not space", function () {
      expect(is.space('test')).to.be.false;
    });
  });

  describe('is.equal', function () {
    it('should return true if passed parameter type is equal', function () {
      expect(is.equal('a','a')).to.be.true;
      expect(is.equal(true,true)).to.be.true;
      expect(is.equal(1,1)).to.be.true;
    });
    it("should return false if passed parameter type is not equal", function () {
      expect(is.equal('a',false)).to.be.false;
    });
  });

  describe('is.even', function () {
    it('should return true if passed parameter type is even', function () {
      expect(is.even(2)).to.be.true;
    });
    it("should return false if passed parameter type is not even", function () {
      expect(is.even('a')).to.be.false;
    });
  });

  describe('is.odd', function () {
    it('should return true if passed parameter type is odd', function () {
      expect(is.odd(1)).to.be.true;
    });
    it("should return false if passed parameter type is not odd", function () {
      expect(is.odd('a')).to.be.false;
    });
  });

  describe('is.positive', function () {
    it('should return true if passed parameter type is positive', function () {
      expect(is.positive(1)).to.be.true;
    });
    it("should return false if passed parameter type is not positive", function () {
      expect(is.positive('a')).to.be.false;
    });
  });

  describe('is.negative', function () {
    it('should return true if passed parameter type is negative', function () {
      expect(is.negative(-1)).to.be.true;
    });
    it("should return false if passed parameter type is not negative", function () {
      expect(is.negative('a')).to.be.false;
    });
  });

  describe('is.above', function () {
    it('should return true if passed parameter type is above', function () {
      expect(is.above(1,0)).to.be.true;
    });
    it("should return false if passed parameter type is not above", function () {
      expect(is.above(0,1)).to.be.false;
    });
  });

  describe('is.under', function () {
    it('should return true if passed parameter type is under', function () {
      expect(is.under(0,1)).to.be.true;
    });
    it("should return false if passed parameter type is not under", function () {
      expect(is.under(1,0)).to.be.false;
    });
  });

  describe('is.within', function () {
    it('should return true if passed parameter type is within', function () {
      expect(is.within(1,0,2)).to.be.true;
    });
    it("should return false if passed parameter type is not within", function () {
      expect(is.within(0,1,2)).to.be.false;
    });
  });

  describe('is.decimal', function () {
    it('should return true if passed parameter type is decimal', function () {
      expect(is.decimal(0.1)).to.be.true;
    });
    it("should return false if passed parameter type is not decimal", function () {
      expect(is.decimal(1)).to.be.false;
    });
  });

  describe('is.integer', function () {
    it('should return true if passed parameter type is integer', function () {
      expect(is.integer(1)).to.be.true;
    });
    it("should return false if passed parameter type is not integer", function () {
      expect(is.integer(0.1)).to.be.false;
    });
  });

  describe('is.finite', function () {
    it('should return true if passed parameter type is finite', function () {
      expect(is.finite(1)).to.be.true;
    });
    it("should return false if passed parameter type is not finite", function () {
      expect(is.finite(Infinity)).to.be.false;
      expect(is.finite(-Infinity)).to.be.false;
    });
  });

  describe('is.include', function () {
    it('should return true if passed parameter type is include', function () {
      expect(is.include('hello','el')).to.be.true;
    });
    it("should return false if passed parameter type is not include", function () {
      expect(is.include('hello','hi')).to.be.false;
    });
  });

  describe('is.upperCase', function () {
    it('should return true if passed parameter type is upperCase', function () {
      expect(is.upperCase('A')).to.be.true;
    });
    it("should return false if passed parameter type is not upperCase", function () {
      expect(is.upperCase('a')).to.be.false;
    });
  });

  describe('is.lowerCase', function () {
    it('should return true if passed parameter type is lowerCase', function () {
      expect(is.lowerCase('a')).to.be.true;
    });
    it("should return false if passed parameter type is not lowerCase", function () {
      expect(is.lowerCase('A')).to.be.false;
    });
  });

  describe('is.startWith', function () {
    it('should return true if passed parameter type is startWith', function () {
      expect(is.startWith('hello','he')).to.be.true;
    });
    it("should return false if passed parameter type is not startWith", function () {
      expect(is.startWith('hello','lo')).to.be.false;
    });
  });

  describe('is.endWith', function () {
    it('should return true if passed parameter type is endWith', function () {
      expect(is.endWith('hello','lo')).to.be.true;
    });
    it("should return false if passed parameter type is not endWith", function () {
      expect(is.endWith('hello','he')).to.be.false;
    });
  });

  describe('is.capitalized', function () {
    it('should return true if passed parameter type is capitalized', function () {
      expect(is.capitalized('HELLO WORLD')).to.be.true;
    });
    it("should return false if passed parameter type is not capitalized", function () {
      expect(is.capitalized('hello world')).to.be.false;
      expect(is.capitalized(1)).to.be.false;
    });
  });

  describe('is.palindrome', function () {
    it('should return true if passed parameter type is palindrome', function () {
      expect(is.palindrome('azertyuiopoiuytreza')).to.be.true;
    });
    it("should return false if passed parameter type is not palindrome", function () {
      expect(is.palindrome('azertyuiop')).to.be.false;
    });
  });

  describe('is.today', function () {
    it('should return true if passed parameter type is today', function () {
      expect(is.today(new Date)).to.be.true;
    });
    it("should return false if passed parameter type is not today", function () {
      expect(is.today(new Date(86400000))).to.be.false;
    });
  });

  describe('is.yesterday', function () {
    it('should return true if passed parameter type is yesterday', function () {  // DOES NOT PASS
      var now = new Date();
      var yesterdayString = new Date(now.setDate(now.getDate() - 1)).toDateString();
      expect(is.yesterday(yesterdayString)).to.be.true;
    });
    it("should return false if passed parameter type is not yesterday", function () {
      expect(is.yesterday(new Date)).to.be.false;
    });
  });

  describe('is.tomorrow', function () {
    it('should return true if passed parameter type is tomorrow', function () { // DOES NOT PASS
      var now = new Date();
      var tomorrowString = new Date(now.setDate(now.getDate() + 1)).toDateString();
      expect(is.tomorrow(tomorrowString)).to.be.true;
    });
    it("should return false if passed parameter type is not tomorrow", function () {
      expect(is.tomorrow(new Date)).to.be.false;
    });
  });

  describe('is.past', function () {
    it('should return true if passed parameter type is past', function () {
      expect(is.past(new Date(86400000))).to.be.true;
    });
    it("should return false if passed parameter type is not past", function () {
      expect(is.past(new Date)).to.be.false;
    });
  });

  describe('is.day', function () {
    it('should return true if passed parameter type is day', function () {
      expect(is.day(new Date("November 9, 2015 11:13:00"), "monday")).to.be.true;
    });
    it("should return false if passed parameter type is not day", function () {
      expect(is.day(new Date(86400000), "sunday")).to.be.false;
    });
  });

  describe('is.month', function () {
    it('should return true if passed parameter type is month', function () {
      expect(is.month(new Date("November 9, 2015 11:13:00"), "november")).to.be.true;
    });
    it("should return false if passed parameter type is not month", function () {
      expect(is.month(new Date(86400000), "december")).to.be.false;
    });
  });

  describe('is.year', function () {
    it('should return true if passed parameter type is year', function () {
      expect(is.year(new Date("November 9, 2015 11:13:00"), 2015)).to.be.true;
    });
    it("should return false if passed parameter type is not year", function () {
      expect(is.year(new Date(86400000), 2000)).to.be.false;
    });
  });

  describe('is.leapYear', function () {
    it('should return true if passed parameter type is leapYear', function () {
      expect(is.leapYear(2000)).to.be.true;
    });
    it("should return false if passed parameter type is not leapYear", function () {
      expect(is.leapYear(2001)).to.be.false;
    });
  });

  describe('is.weekend', function () {
    it('should return true if passed parameter type is weekend', function () {
      expect(is.weekend(new Date("November 8, 2015 11:13:00"))).to.be.true;
    });
    it("should return false if passed parameter type is not weekend", function () {
      expect(is.weekend(new Date(86400000))).to.be.false;
    });
  });

  describe('is.inDateRange', function () {
    it('should return true if passed parameter type is inDateRange', function () {
      expect(is.inDateRange(new Date(86400000), new Date(86399999), new Date(86400001))).to.be.true;
    });
    it("should return false if passed parameter type is not inDateRange", function () {
      expect(is.inDateRange(new Date(86300000), new Date(86400000), new Date(86500000))).to.be.false;
      expect(is.inDateRange('a')).to.be.false;
    });
  });

  describe('is.inLastWeek', function () {
    it('should return true if passed parameter type is inLastWeek', function () {
      expect(is.inLastWeek(new Date(new Date().setDate(new Date().getDate() - 3)))).to.be.true;
    });
    it("should return false if passed parameter type is not inLastWeek", function () {
      expect(is.inLastWeek(new Date(86400000))).to.be.false;
    });
  });

  describe('is.inLastMonth', function () {
    it('should return true if passed parameter type is inLastMonth', function () {
      expect(is.inLastMonth(new Date(new Date().setDate(new Date().getDate() - 3)))).to.be.true;
    });
    it("should return false if passed parameter type is not inLastMonth", function () {
      expect(is.inLastMonth(new Date(86400000))).to.be.false;
    });
  });

  describe('is.inLastYear', function () {
    it('should return true if passed parameter type is inLastYear', function () {
      expect(is.inLastYear(new Date(new Date().setMonth(new Date().getMonth() - 3)))).to.be.true;
    });
    it("should return false if passed parameter type is not inLastYear", function () {
      expect(is.inLastYear(new Date(86400000))).to.be.false;
    });
  });

});
