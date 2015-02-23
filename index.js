'use strict';

/**
 * Module dependencies.
 */

var extend = require('extend-shallow');
var parsePath = require('parse-filepath');

/**
 * Expose `rte`
 */

module.exports = rte;

/**
 * Expose `rte.Rte`
 */

module.exports.Rte = Rte;

/**
 * Generate a file path from properties on the given object.
 *
 * **Examples:**
 *
 * ```js
 * rte(':a/:b:.c', { a: 'aaa', b: 'bbb', c: 'js' });
 * //=> 'aaa/bbb/c.js'
 * ```
 *
 * When a `source` file path is passed as the first argument, it will
 * be parsed and the resulting object will merged with the data
 * object (properties on the data object take precendence).
 *
 * ```js
 * rte('a/b/c.html', ':destbase/:basename', { destbase: 'foo' });
 * //=> 'foo/c.html'
 * ```
 *
 * @param {String} `src` Optionally pass a source file path to parse.
 * @param {String} `dest` Template for the destination file path with `:properties` to replace.
 * @param {Object} `data` Object with values to pass to the dest.
 * @api public
 */

function rte(src, dest, data) {
  if (typeof dest === 'object') {
    data = dest; dest = src;
  }
  var rte = new Rte(src, data);
  return rte.stringify(dest);
}

/**
 * Create an instance of Rte with the `src` file path to re-write,
 * and the `data` object with values to be used for replacing
 * `:properties`
 *
 * ```js
 * var Rte = require('rte');
 * var rte = new Rte('foo/bar/baz.hbs');
 * ```
 *
 * @param {String} `src`
 * @param {Object} `data`
 * @api private
 */

function Rte(path, data) {
  this.data = data || {};
  this.path = path;
  this.data.path = this.path;
}

/**
 * Parse a file path into an object.
 *
 * ```js
 * var parse = new rte.Rte().parse;
 * parse('a/b.html');
 *
 * // Results in:
 * // { dirname: 'a/b',
 * //   basename: 'c.coffee',
 * //   name: 'c',
 * //   extname: '.coffee',
 * //   extSegments: [ '.coffee' ] }
 * ```
 *
 * @param {String} `path` Path to parse.
 * @api private
 */

Rte.prototype.parse = function (path) {
  return parsePath(path || this.path);
};

/**
 * Process `path` and resolve template variables using values from the
 * given `data`.
 *
 * ```js
 * rte.stringify(':foo/:name.html', { foo: 'quux' });
 * //=> 'quux/baz.html'
 * ```
 *
 * @param {String} `path` Dest path with variables to replace.
 * @param {Object} `data` Object with properties used to replace variables in the path.
 * @api private
 */

Rte.prototype.stringify = function (path, data) {
  if (typeof path !== 'string') {
    data = path; path = this.path;
  }

  var ctx = extend({}, this.parse(), this.data, data);

  return path.replace(/:(\w+)/g, function (_, prop) {
    var val = ctx[prop] || '';
    if (typeof val === 'function') {
      return val.call(this, prop, ctx);
    }
    return val;
  }.bind(this));
};
