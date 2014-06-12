/**
 * rte <https://github.com/jonschlinkert/rte>
 *
 * Copyright (c) 2014, Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT License
 *
 */

var expect = require('chai').expect;
var Route = require('../');




describe('rte.dest()', function() {
  describe('when a route is defined as a second parameter', function() {
    var rte = new Route();
    rte.set('dest', 'dist/:basename/index.html');


    it('should use the route to parse the filepath', function() {
      var actual = rte.dest('src/templates/about.hbs', 'dest');
      expect(actual).to.eql('dist/about/index.html');
    });
  });


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



  describe('when not enough information is passed to parse the file path', function() {
    var rte = new Route();
    it('should return the original path', function() {
      var actual = rte.dest('foo/index.html');
      expect(actual).to.eql('foo/index.html');
    });

    it('should return the original path', function() {
      var actual = rte.dest('foo');
      expect(actual).to.eql('foo');
    });

    it('should return the original path', function() {
      var actual = rte.dest('src/templates/about.hbs');
      expect(actual).to.eql('src/templates/about.hbs');
    });
  });
});
