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

  it('should return a string using the named structure', function() {
    var structure = ':basename/index.html';
    rte.set('pretty', structure);
    var actual = rte.get('pretty');
    expect(actual).to.eql(structure);
  });

  it('should return a string using the named structure', function() {
    var structure = 'blog/posts/:year/:month/:day/:basename/section/index.:ext';
    rte.set('blog', structure);
    var actual = rte.get('blog');
    expect(actual).to.eql(structure);
  });

  it('should return a string using the named structure', function() {
    var structure = ':num-basename.:ext';
    rte.set('numbered', structure);
    var actual = rte.get('numbered');
    expect(actual).to.eql(structure);
  });
});
