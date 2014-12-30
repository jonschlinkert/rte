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
 * Stringify a file path by replacing `:properties` in a template
 * with values from the given context.
 *
 * **Examples:**
 *
 * ```js
 * rte(':a/:b:.c', { a: 'aaa', b: 'bbb', c: 'js' });
 * //=> 'aaa/bbb/c.js'
 * ```
 *
 * When a `source` file path is passed as the first argument, it will
 * be parsed and the resulting object will merged with the context
 * object (properties on the context object take precendence).
 *
 * ```js
 * rte('a/b/c.html', ':destbase/:basename', { destbase: 'foo' });
 * //=> 'foo/c.html'
 * ```
 *
 * @param {String} `src` Optionally pass a source file path to parse.
 * @param {String} `template` Template for the destination file path with `:properties` to replace.
 * @param {Object} `context` Object with values to pass to the template.
 * @api public
 */

function rte(src, template, context) {
  if (typeof template === 'object') {
    context = template;
    template = src;
    src = null;
  }
  var rte = new Rte(src, context);
  return rte.process(template);
}

/**
 * Create an instance of Rte with the `src` file path to re-write,
 * and the `context` object with values to be used for replacing
 * `:properties`
 *
 * ```js
 * var Rte = require('rte');
 * var rte = new Rte('foo/bar/baz.hbs');
 * ```
 *
 * @param {String} `src`
 * @param {Object} `context`
 * @api private
 */

function Rte(src, context) {
  this.context = context || {};
  this.src = src;
}

/**
 * Process `template` and interpolate `:properties` with values from
 * the given `context`.
 *
 * ```js
 * rte.process(':destbase/:name.html', { destbase: 'quux' });
 * //=> 'quux/baz.html'
 * ```
 *
 * @param {String} `template` String with properties to replace.
 * @param {Object} `context` Object with values to use.
 * @api private
 */

Rte.prototype.process = function (template) {
  var src = this.src ? parsePath(this.src) : {};
  var ctx = extend({}, src, this.context);
  var match;

  while (match = /:(\w+)/g.exec(template)) {
    if (ctx[match[1]]) {
      template = template.replace(match[0], ctx[match[1]]);
    } else {
      template = template.replace(match[0], '');
    }
  }

  return template;
};
