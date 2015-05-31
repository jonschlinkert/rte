/*!
 * rte <https://github.com/jonschlinkert/rte>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

require('should');
var rte = require('./');

describe('rte:', function() {
  describe('context object:', function() {
    it('should use values from the context to replace `:properties`', function() {
      rte('a/b/c/d/e.hbs', ':a/:name.:ext', { a: 'bar', ext: 'html' }).should.equal('bar/e.html');
    });
  });

  describe('no `src` path:', function() {
    it('should use values from the context to replace `:properties`', function() {
      rte(':a/:b/:c.:ext', { a: 'aaa', b: 'bbb', c: 'ccc', ext: 'js' }).should.equal('aaa/bbb/ccc.js');
    });
  });

  describe('helpers', function() {
    it('should use helpers on the context to replace values:', function() {
      var ctx = {
        a: function (path, context) {
          return 'aaa';
        },
        b: function (path, context) {
          return 'bbb';
        },
        c: function (path, context) {
          return 'ccc';
        },
        ext: 'js'
      };

      rte(':a/:b/:c.:ext', ctx).should.equal('aaa/bbb/ccc.js');
    });
  });

  describe('no `context` object:', function() {
    it('should use `:dirname`', function() {
      rte('a/b/c/d/e.hbs', ':dirname/foo.js').should.equal('a/b/c/d/foo.js');
    });
    it('should use `:basename`', function() {
      rte('a/b/c/d/e.hbs', ':basename').should.equal('e.hbs');
    });
    it('should use `:extname`', function() {
      rte('a/b/c/d/e.hbs', ':extname').should.equal('.hbs');
    });
    it('should use `:name`', function() {
      rte('a/b/c/d/e.hbs', ':name').should.equal('e');
    });
    it('should use `:name`', function() {
      rte('a/b/c/d/e.hbs', ':name').should.equal('e');
    });
  });
});
