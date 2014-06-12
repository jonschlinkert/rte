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
rte.set('site', ':root/:basename/index:ext');
var obj = rte.parse('src/templates/about.hbs', 'site');

console.log(obj)

describe('rte.parse()', function() {
  it('should parse a file path into an object', function() {
    var actual = rte.parse('foo/index.html');
    expect(actual.dirname).to.eql('foo');
    expect(actual.basename).to.eql('index');
    expect(actual.extname).to.eql('.html');
  });

  it('should parse a file path into an object', function() {
    var actual = rte.parse('foo/index.html');
    expect(actual.dirname).to.eql('foo');
    expect(actual.basename).to.eql('index');
    expect(actual.extname).to.eql('.html');
  });

  it('should parse a file path into an object', function() {
    var actual = rte.parse('foo');
    expect(actual.dirname).to.eql('.');
    expect(actual.basename).to.eql('foo');
  });

  it('should parse a file path into an object', function() {
    var actual = rte.parse('src/templates/about.hbs');
    expect(actual.dirname).to.eql('src/templates');
    expect(actual.basename).to.eql('about');
    expect(actual.extname).to.eql('.hbs');
  });
});


describe('when a route is defined as a second parameter', function() {
  rte.set('dest', 'dist/:basename/index.html');

  it('should use the route to parse the filepath', function() {
    var actual = rte.parse('src/templates/about.hbs', 'dest');
    expect(actual.dest).to.eql('dist/about/index.html');
    expect(actual.dirname).to.eql('src/templates');
    expect(actual.basename).to.eql('about');
    expect(actual.extname).to.eql('.hbs');
  });
});