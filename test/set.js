/**
 * rte <https://github.com/jonschlinkert/rte>
 *
 * Copyright (c) 2014, Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT License
 *
 */
'use strict';

var expect = require('chai').expect;
var Route = require('../');


describe('rte.parse()', function() {
  var rte = new Route();

  it('should return a string using the named route', function() {
    var route = ':basename/index.html';
    rte.set('pretty', route);
    var actual = rte.get('pretty');
    expect(actual).to.eql(route);
  });

  it('should return a string using the named route', function() {
    var route = 'blog/posts/:year/:month/:day/:basename/section/index.:ext';
    rte.set('blog', route);
    var actual = rte.get('blog');
    expect(actual).to.eql(route);
  });

  it('should return a string using the named route', function() {
    var route = ':num-basename.:ext';
    rte.set('numbered', route);
    var actual = rte.get('numbered');
    expect(actual).to.eql(route);
  });
});
