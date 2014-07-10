'use strict';

var expect = require('chai').expect;
var Route = require('..');
var route = new Route();


describe('route()', function() {
  it('should resolve template braces in routes.', function() {
    var context = {
      a: 'foo',
      b: 'bar',
      c: 'baz'
    };
    var str = '{ a }/{ b }/{ c }'
    expect(route.process(str, context)).to.equal('foo/bar/baz');
  });

  it('should resolve template `:propstrings` in routes.', function() {
    var context = {
      a: 'foo',
      b: 'bar',
      c: 'baz'
    };

    var str = ':a/:b/:c';
    expect(route.process(str, context)).to.equal('foo/bar/baz');
  });

  it('should resolve nested templates in routes.', function() {
    var context = {
      a: 'foo',
      bb: 'bar',
      b: '<%= bb %>',
      c: (function() {
        return 'blah'
      }())
    };

    var str = ':a/:b/:c';
    expect(route.process(str, context)).to.equal('foo/bar/blah');
  });

  it('should resolve either propstrings or braces in routes.', function() {
    var context = {
      a: 'foo',
      bb: 'bar',
      b: '<%= bb %>',
      c: (function() {
        return 'blah'
      }()),
      d: 'last'
    };

    var str = ':a/:b/:c/{d}';
    expect(route.process(str, context)).to.equal('foo/bar/blah/last');
  });

  it('should use functions defined on the context.', function() {
    var context = {
      a: 'foo',
      bb: 'bar',
      b: '<%= bb %>',
      c: '<%= d %>',
      d: 'baz',
      uppercase: function(str) {
        return str.toUpperCase();
      }
    };

    var str = ':a/:b/:c/{uppercase(d)}';
    expect(route.process(str, context)).to.equal('foo/bar/baz/BAZ');
  });
});
