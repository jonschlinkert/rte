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
  var rte = new Route();

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
});