/**
 * rte <https://github.com/jonschlinkert/rte>
 *
 * Copyright (c) 2014, Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT License
 *
 */

var expect = require('chai').expect;
var rename = require('rename-path');

describe('rename()', function() {
  describe('when a path is passed:', function() {
    it('should return the extension from options.ext', function() {
      var actual = rename('foo/bar/baz.min.js', {ext: '.foo'});
      expect(actual).to.eql('foo/bar/baz.foo');
    });

  });
});

