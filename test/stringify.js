/**
 * rte <https://github.com/jonschlinkert/rte>
 *
 * Copyright (c) 2014, Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT License
 *
 */

var expect = require('chai').expect;
var Route = require('../');


/**
 * These should pass
 */

describe('rte.stringify()', function() {
  describe('rte.stringify()', function() {
    var route = new Route();
    route.set('one', ':dirname/:basename:ext');
    route.set('two', ':dirname/foo/bar/baz/:basename:ext');

    it('should return a string using the named route', function() {
      var actual = route.stringify('one', {
        dirname: 'foo',
        basename: 'index',
        ext: '.html'
      });
      expect(actual).to.eql('foo/index.html');
    });

    it('should return a string using the named route', function() {
      var actual = route.stringify('two', {
        dirname: 'foo',
        basename: 'index',
        ext: '.html'
      });
      expect(actual).to.eql('foo/foo/bar/baz/index.html');
    });
  });


  describe('rte.stringify()', function() {
    var rte = new Route({
      dirname: 'foo',
      basename: 'index',
      ext: '.html'
    });

    rte.set('one', ':dirname/:basename:ext');
    rte.set('two', ':dirname/foo/bar/baz/:basename:ext');

    it('should return a string using the named route', function() {
      var actual = rte.stringify('one');
      expect(actual).to.eql('foo/index.html');
    });

    it('should return a string using the named route', function() {
      var actual = rte.stringify('two');
      expect(actual).to.eql('foo/foo/bar/baz/index.html');
    });
  });
});

