'use strict';

var parsePath = require('parse-filepath');
var rename = require('rename-path');
var isObject = require('isobject');
var template = require('template');
var extend = require('xtend');


/**
 * ## Route
 *
 * Define a new instance of Route, optionally passing a default context object.
 *
 * **Example**
 *
 * ```js
 * var route = new Route({base: 'dist'});
 * ```
 *
 * @class Route
 * @constructor
 * @param {String} `type`
 * @api public
 */

var Route = module.exports = function Route(context) {
  if (!(this instanceof Route)) {
    return new Route(context);
  }
  this.context = extend(context || {});
  this.rte = {};
};


/**
 * ## .set (name, route)
 *
 * Set or get a route by name.
 *
 * ```js
 * route.set('dest', ':base/:dirname/:basename/index.html');
 * ```
 *
 * @method set
 * @param {String} `name`
 * @param {String} `route`
 * @api public
 */

Route.prototype.set = function (name, route) {
  if (!route) return this.rte[name];
  this.rte[name] = route;
  return this;
};


/**
 * ## .get (name)
 *
 * Get a route by name.
 *
 * ```js
 * route.get('dest');
 * // ':base/:dirname/:basename/index.html'
 * ```
 *
 * @method get
 * @param {String} `name`
 * @api public
 */

Route.prototype.get = function (name) {
  return this.rte[name];
};


/**
 * ## .rename (filepath, options)
 *
 * Rename parts of a file path using [rename-path](https://github.com/jonschlinkert/rename-path).
 *
 * ```js
 * route.rename ('a/b/c.hbs', {ext: '.html'});
 * //=> 'a/b/c.html'
 * ```
 *
 * @param {String} `filepath`
 * @param {Object} `options`
 * @api public
 */

Route.prototype.rename = function (filepath, options) {
  return rename(filepath, options);
};


/**
 * ## .parse (filepath, name, context)
 *
 * Parse the filepath into an object using the named route and the methods
 * on the node.js path module. The purpose of this method is to simplify
 * the process of renaming parts of file paths.
 *
 * **Example:**
 *
 * {%= docs("parse") %}
 *
 * @param {String} `filepath`
 * @param {String} `name` The name of the route to use
 * @param {Object} `context` Optionally pass a context with custom properties.
 * @api public
 */

Route.prototype.parse = function (filepath, name, context) {
  var parser = this.rename.bind(this);
  var rte = filepath;

  if (name && isObject(name)) {
    context = name;
    name = null;
  } else if (name && typeof name === 'string') {
    rte = name;
    // build the stored (named) route
    parser = this.resolve.bind(this);
  }

  // parse the filepath into an object using the node.js path module
  var parsedPath = parsePath(filepath);

  // set `basename` to not include extension
  parsedPath.basename = parsedPath.name;
  parsedPath.ext = parsedPath.extname;

  var ctx = extend({}, parsedPath, this.context, context);
  return extend(ctx, {dest: parser(rte, ctx)});
};


/**
 * ## .dest (filepath, name, context)
 *
 * Facade for `.parse()`, returning only the `dest` value.
 *
 * **Example:**
 *
 * ```js
 * rte.set('blog', ':foo/:basename/index:ext');
 *
 * // use the `blog` route to create a dest filepath
 * var dest = rte.dest('src/templates/about.hbs', 'blog');
 * // => '_gh_pages/about/index.html'
 * ```
 *
 * @param {String} `filepath`
 * @param {String} `name`    The name of the route to use
 * @param {Object} `context` Optionally pass a context with custom properties.
 * @api public
 */

Route.prototype.dest = function (filepath, name, context) {
  var ctx = extend({}, this.context, context);
  return this.parse(filepath, name, ctx).dest;
};


/**
 * ## .process (name, context)
 *
 * Resolve a named route using the properties on the given object.
 *
 * ```js
 * route.process (name, context)
 * ```
 * **Example:**
 *
 * ```js
 * route.process(':a/:b/:c', {a: 'one', b: 'two', c: 'three'});
 * //=> 'one/two/three'
 * ```
 *
 * @param {String} `key`
 * @param {Object} `context`
 * @api public
 */

Route.prototype.process = function (str, context) {
  var ctx = extend({}, this.context, context);
  return template(this._convertRe(str), ctx);
};


/**
 * ## .resolve
 *
 * Resolve a named route using the properties on the given object.
 *
 * ```js
 * route.resolve (name, context)
 * ```
 *
 * **Example:**
 *
 * ```js
 * route.set('dist', ':foo/:basename/index.html');
 * route.resolve('dist', {foo: '_gh_pages', basename: 'foo'});
 * //=> '_gh_pages/foo/index.html'
 * ```
 *
 * @param {String} `key`
 * @param {Object} `context`
 * @api public
 */

Route.prototype.resolve = function (name, context) {
  var ctx = extend({}, this.context, context);
  return this.process(this.rte[name], ctx);
};


/**
 * ## ._convertRe
 *
 * Convert propstring delimiters into valid Lo-Dash template
 * delimiters.
 *
 * @param  {String} `str`
 * @return {String}
 */

Route.prototype._convertRe = function(str) {
  // convert `{a}` to es6 valid templates: `${a}`
  var brace = /\{([^\}]*(?:\.[^\}]*)*)\}/g;
  // convert `:a` to es6 valid templates: `${a}`
  var props = /:([^\\\/:${}]+)/g;
  return str
    .replace(brace, '<%= $1 %>')
    .replace(props, '<%= $1 %>')
    .replace('$', '');
};


/**
 * Expose `Route`
 */

Route.prototype.Route = Route;