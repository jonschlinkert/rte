/**
 * rte <https://github.com/jonschlinkert/rte>
 *
 * Copyright (c) 2014, Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT License
 *
 */

var expect = require('chai').expect;
var Route = require('../');
var rte = new Route();

describe('rte:', function() {
  describe('paths', function() {
    it('should replace :basename', function() {
      var structure = ':dirname/:basename.:ext';
      var expected = {
        dirname: 'foo',
        basename: 'index',
        ext: '.html'
      };
      var actual = rte.parse('foo/index.html');
      expect(actual.dir).to.eql('foo');
    });
  });

  describe('when a configuration is passed in', function () {
    var config = {
      flatten: false,
      prefixBase: false,
      srcBase: 'vendor/bootstrap/dist',
      destBase: '_gh_pages/public',
      ext: '.min.js',

      year: 2014,
      months: 05,
      day: 08
    };

    var route = new Route(config);
    var src = 'vendor/bootstrap/dist/js/bootstrap.js';
    route.set('date', ':destBase/:year/:month/:day/js/:basename:ext');


    describe('when only src is passed in', function () {
      it('should return a basic dest', function() {
        var actual = route.parse(src).dest;
        var expected = '_gh_pages/public/js/bootstrap.min.js';
        expect(actual).to.eql(expected);
      });
    });


    describe('when src with options is passed in', function () {
      it('should return a dest with the prefixBase', function() {
        var actual = route.parse(src, {prefixBase: true}).dest;
        var expected = '_gh_pages/public/vendor/bootstrap/dist/js/bootstrap.min.js';
        expect(actual).to.eql(expected);
      });
    });


    describe('when src with a specified structure key is passed in', function () {
      it('should return a dest formated based on the structure', function() {
        var actual = route.parse(src, 'date').dest;
        var expected = '_gh_pages/public/2014/05/08/js/bootstrap.min.js';
        expect(actual).to.eql(expected);
      });
    });
  });
});
