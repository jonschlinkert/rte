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


  describe('when a route is passed as a second parameter', function() {

    it('should use the route to parse the filepath', function() {
      // example parser to use with the `dest` route
      var rte = new Route({parsers: [{
        '{dirname}': function() {return this.dirname;},
        '{basename}': function() {return this.basename; },
        '{extname}': function() {return this.extname; },
        '{ext}': function() {return this.ext; }
      }]});

      rte.set('dest', 'dist/a/{dirname}/b/{basename}.min.js');
      var actual = rte.dest('src/templates/about.hbs', 'dest');
      expect(actual).to.eql('dist/a/src/templates/b/about.min.js');
    });

    describe('when a context is passed', function() {
      it('should use the context to construct the filepath', function() {
        rte.set('foo', ':dist/:basename/index.html');
        var actual = rte.dest('src/templates/about.hbs', 'foo', {dist: '_gh_pages'});
        expect(actual).to.eql('_gh_pages/about/index.html');
      });
    });
  });
});
