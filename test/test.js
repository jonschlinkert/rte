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
      var expected = {
        dirname: 'foo',
        basename: 'index',
        ext: '.html'
      };
      var actual = rte.parse('foo/index.html');
      expect(actual.dir).to.eql('foo');
    });
  });

  // describe('paths', function() {
  //   it('should replace :basename', function() {
  //     var structure = ':dirname/:basename.:ext';
  //     var expected = {
  //       dirname: 'foo',
  //       basename: 'index',
  //       ext: '.html'
  //     };

  //     var context = {first: "brian", last: "woodward"};
  //     rte('people/:last/:first/index.html', context);

  //     // results in:
  //     // => 'people/woodward/brian/index.html'
  //     var actual = rte.parse('foo/index.html');
  //     expect(actual.dir).to.eql('foo');
  //   });
  // });

  describe('when a configuration is passed:', function () {
    var config = {
      flatten: false,
      prefixBase: false,
      srcBase: 'vendor/bootstrap/dist',
      destBase: '_gh_pages/public',
      ext: '.min.js'
    };

    var route = new Route(config);
    var src = 'vendor/bootstrap/dist/js/bootstrap.js';

    describe('and only src is passed in', function () {
      it('should return a basic dest', function() {
        var actual = route.parse(src).dest;
        var expected = '_gh_pages/public/js/bootstrap.min.js';
        expect(actual).to.eql(expected);
      });
    });

    describe('and only src is passed in', function () {
      it('should return a basic dest', function() {
        var actual = route.parse(src, {extDot: 'last'}).dest;
        var expected = '_gh_pages/public/js/bootstrap.min.js';
        expect(actual).to.eql(expected);
      });
    });

    describe('and a src string and options are passed', function () {
      it('should return a dest with the prefixBase', function() {
        var actual = route.parse(src, {prefixBase: true}).dest;
        var expected = '_gh_pages/public/vendor/bootstrap/dist/js/bootstrap.min.js';
        expect(actual).to.eql(expected);
      });
    });


    describe('and a src string and options are passed', function () {
      it('should return a dest with the prefixBase', function() {
        var actual = route.parse(src, {flatten: true}).dest;
        var expected = '_gh_pages/public/bootstrap.min.js';
        expect(actual).to.eql(expected);
      });
    });


    describe('and src is passed with a specified `structure` key:', function () {
      it('should return a dest formatted based on the structure', function() {
        route.set('date', ':destBase/:year/:month/:day/js/:basename:ext');
        var actual = route.parse(src, 'date').dest;
        var year = new Date().getFullYear();
        var expected = new RegExp(year).test(actual);
        expect(expected).to.eql(true);
      });
    });
  });
});
