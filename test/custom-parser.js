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
var dates = require('strings-parser-date');


describe('rte:', function() {
  describe('when a route is defined as a second parameter', function() {
    var rte = new Route();
    rte.set('dest', 'dist/:basename/index.html');

    it('should use the route to parse the filepath', function() {
      var actual = rte.dest('src/templates/about.hbs', 'dest');
      expect(actual).to.eql('dist/about/index.html');
    });

    describe('when a context is passed', function() {
      rte.set('foo', ':dist/:basename/index.html');

      it('should use the context to construct the filepath', function() {
        var actual = rte.dest('src/templates/about.hbs', 'foo', {dist: '_gh_pages'});
        expect(actual).to.eql('_gh_pages/about/index.html');
      });
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

    var route = new Route();

    xdescribe('and src is passed with a specified `route` key:', function () {
      it('should return a dest formatted based on the route', function() {
        route.set('date', ':year/:month/:day/js/:basename:ext');
        var actual = route.dest('vendor/bootstrap/dist/js/bootstrap.js', 'date', {parsers: dates()});
        //=> _gh_pages/public/2014/06/12/js/bootstrap.min.js

        var dest = 'vendor/bootstrap/dist/js/bootstrap.min.js';
        var bar = route.parse(dest);

        var year = new Date().getFullYear();
        expect(new RegExp(year).test(actual.dest)).to.eql(true);
      });
    });
  });
});
