/**
 * rte <https://github.com/jonschlinkert/rte>
 *
 * Copyright (c) 2014, Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT License
 *
 */

var expect = require('chai').expect;
var Route = require('../');


describe('rte.resolve()', function() {
  describe('rte.resolve()', function() {
    var route = new Route();
    route.set('one', ':dirname/:basename:ext');
    route.set('two', ':dirname/foo/bar/baz/:basename:ext');

    it('should return a string using the named route', function() {
      var actual = route.resolve('one', {
        dirname: 'foo',
        basename: 'index',
        ext: '.html'
      });
      expect(actual).to.equal('foo/index.html');
    });

    it('should return a string using the named route', function() {
      var actual = route.resolve('two', {
        dirname: 'foo',
        basename: 'index',
        ext: '.html'
      });
      expect(actual).to.equal('foo/foo/bar/baz/index.html');
    });
  });


  describe('rte.resolve()', function() {
    var rte = new Route({
      dirname: 'foo',
      basename: 'index',
      ext: '.html'
    });

    rte.set('one', ':dirname/:basename:ext');
    rte.set('two', ':dirname/foo/bar/baz/:basename:ext');

    it('should return a string using the named route', function() {
      var actual = rte.resolve('one');
      expect(actual).to.equal('foo/index.html');
    });

    it('should return a string using the named route', function() {
      var actual = rte.resolve('two');
      expect(actual).to.equal('foo/foo/bar/baz/index.html');
    });
  });
});

