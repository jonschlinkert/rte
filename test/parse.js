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


describe('rte.parse()', function() {
  describe('when a filepath, route and context are passed', function() {
    rte.set('dest', 'dist/:basename/index.html');

    it('should use the route to parse the filepath', function() {
      rte.set('foo', ':a/:b/:basename/index:ext');
      var actual = rte.parse('src/templates/about.hbs', 'foo', {
        a: 'one',
        b: 'two',
        ext: '.html'
      });

      expect(actual.dirname).to.equal('src/templates');
      expect(actual.basename).to.equal('about');
      expect(actual.name).to.equal('about');
      expect(actual.extname).to.equal('.hbs');
      expect(actual.extSegments).to.eql(['.hbs']);
      expect(actual.ext).to.equal('.html');
      expect(actual.a).to.equal('one');
      expect(actual.b).to.equal('two');
      expect(actual.dest).to.equal('one/two/about/index.html');
    });
  });


  describe('when a filepath and route are passed', function() {
    rte.set('dest', 'dist/:basename/index.html');

    it('should use the route to parse the filepath', function() {
      var actual = rte.parse('src/templates/about.hbs', 'dest');
      expect(actual.dest).to.equal('dist/about/index.html');
      expect(actual.dirname).to.equal('src/templates');
      expect(actual.basename).to.equal('about');
      expect(actual.extname).to.equal('.hbs');
    });
  });

  describe('when a filepath is passed', function() {
    it('should parse the file path into an object', function() {
      var actual = rte.parse('foo/index.html');
      expect(actual.dirname).to.equal('foo');
      expect(actual.basename).to.equal('index');
      expect(actual.extname).to.equal('.html');
    });

    it('should parse the file path into an object', function() {
      var actual = rte.parse('foo');
      expect(actual.dirname).to.equal('.');
      expect(actual.basename).to.equal('foo');
    });

    it('should parse the file path into an object', function() {
      var actual = rte.parse('src/templates/about.hbs');
      expect(actual.dirname).to.equal('src/templates');
      expect(actual.basename).to.equal('about');
      expect(actual.extname).to.equal('.hbs');
    });
  });
});
