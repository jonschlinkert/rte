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


describe('rte.stringify()', function() {
  var rte = new Route({
    dirname: 'foo',
    basename: 'index',
    ext: '.html'
  });
  rte.set('one', ':dirname/:basename:ext');
  rte.set('two', ':dirname/foo/bar/baz/:basename:ext');

  it('should return a string using the named structure', function() {
    var actual = rte.stringify('one');
    expect(actual).to.eql('foo/index.html');
  });

  it('should return a string using the named structure', function() {
    var actual = rte.stringify('two');
    expect(actual).to.eql('foo/foo/bar/baz/index.html');
  });
});