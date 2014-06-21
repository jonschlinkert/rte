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
      expect(actual.basename).to.eql('index');
      expect(actual.dirname).to.eql('foo');
    });

    it('should replace :basename', function() {
      var route = ':dirname/:basename.:ext';
      var expected = {
        dirname: 'foo',
        basename: 'index',
        ext: '.html'
      };
      var context = {first: "brian", last: "woodward"};
      var actual = rte.parse('people/:last/:first/index.html', context);

      // results in:
      // => 'people/woodward/brian/index.html'
      var actual = rte.parse('foo/index.html');
      expect(actual.dirname).to.eql('foo');
    });
  });

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
        expect(actual).to.eql('_gh_pages/public/js/bootstrap.min.js');
      });
    });

    describe('and only src is passed in', function () {
      it('should return a basic dest', function() {
        var actual = route.parse(src, {extDot: 'last'});
        expect(actual.dest).to.eql('_gh_pages/public/js/bootstrap.min.js');
      });
    });

    describe('and a src string and options are passed', function () {
      it('should return a dest with the prefixBase', function() {
        var actual = route.parse(src, {prefixBase: true});
        expect(actual.dest).to.eql('_gh_pages/public/vendor/bootstrap/dist/js/bootstrap.min.js');
      });
    });


    describe('and a src string and options are passed', function () {
      it('should return a dest with the prefixBase', function() {
        var actual = route.parse(src, {flatten: true}).dest;

        expect(actual).to.eql('_gh_pages/public/bootstrap.min.js');
      });
    });


    describe('and src is passed with a specified `route` key:', function () {
      it('should return a dest formatted based on the route', function() {
        route.set('date', ':destBase/:year/:month/:day/js/:basename:ext');

        var actual = route.parse(src, 'date');
        //=> _gh_pages/public/2014/06/12/js/bootstrap.min.js

        var foo = 'vendor/bootstrap/dist/js/bootstrap.min.js';
        var bar = route.parse(foo);

        var year = new Date().getFullYear();
        expect(new RegExp(year).test(actual.dest)).to.eql(true);
      });
    });
  });
});
