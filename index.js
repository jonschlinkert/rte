'use strict';

var parsePath = require('parse-filepath');
var rename = require('rename-path');
var isObject = require('isobject');
var extend = require('xtend');
var stringify = require('./lib/stringify');


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
 * ## .stringify (name, context)
 *
 * Build a URL/filepath string from the properties on the given object.
 *
 * ```js
 * route.set('dist', ':root/:basename/index.html');
 * route.stringify('dist', {root: '_gh_pages', basename: 'foo'});
 * //=> '_gh_pages/foo/index.html'
 * ```
 *
 * @param {String} `key`
 * @param {Object} `context`
 * @api public
 */

Route.prototype.stringify = function (name, options) {
  var ctx = extend({}, this.context, options);
  return stringify(this.rte[name], ctx);
};


/**
 * ## .rename (filepath, options)
 *
 * Generate a file path using the [rename](lib/rename.js) utility.
 *
 * ```js
 * route.rename ('a/b/c.hbs', {ext: '.html'})
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
 * Parse the filepath into an object using the named route and the node.js path module.
 *
 * ```js
 * rte.set('site', ':root/:basename/index:ext');
 *
 * // use the `site` route to parse the filepath
 * var obj = rte.parse('src/templates/about.hbs', 'site');
 * // =>
 * { basename: 'about',
 * dirname: 'src/templates',
 * extname: '.hbs',
 * name: 'about',
 * extSegments: [ '.hbs' ],
 * dest: 'root/about/index.hbs' }
 * ```
 *
 * @param {String} `filepath`
 * @param {String} `name`    The name of the route to use
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
    parser = this.stringify.bind(this);
  }

  // parse the filepath into an object using the node.js path module
  var parsedPath = parsePath(filepath);

  // set `basename` to not include extension
  parsedPath.basename = parsedPath.name;
  parsedPath.ext = parsedPath.extname;

  // extend the context with context and additional context
  var ctx = extend({}, parsedPath, this.context, context);
  return extend(ctx, {dest: parser(rte, ctx)});
};


/**
 * ## .dest (filepath, name, context)
 *
 * Facade for `.parse()`, returning only the `dest` value.
 *
 * ```js
 * rte.set('site', ':root/:basename/index:ext');
 *
 * // use the `site` route to create a dest filepath
 * var dest = rte.dest('src/templates/about.hbs', 'site');
 * // => '_gh_pages/about/index.html'
 * ```
 *
 * @param {String} `filepath`
 * @param {String} `name`    The name of the route to use
 * @param {Object} `context` Optionally pass a context with custom properties.
 * @api public
 */

Route.prototype.dest = function (filepath, name, context) {
  return this.parse(filepath, name, context).dest;
};


Route.prototype.Route = Route;