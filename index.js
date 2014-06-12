'use strict';

var permalinks = require('permalinks');
var parsePath = require('parse-filepath');
var _ = require('lodash');
var generate = require('./lib/generate');


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

var Route = module.exports = function Route(config) {
  if (!(this instanceof Route)) {
    return new Route(config);
  }
  this.config = _.extend(config || {});
  this.rte = {};
};


/**
 * ## .set (key, value)
 *
 * Set or get a route by name.
 *
 * ```js
 * route.set('dest', ':base/:dirname/:basename/index.html');
 * ```
 *
 * @method set
 * @param {String} `name`
 * @param {String} `value`
 * @api public
 */

Route.prototype.set = function (key, value) {
  if (_.isUndefined(value)) return this.rte[key];
  this.rte[key] = value;
  return this;
};


/**
 * ## .get (key)
 *
 * Get a route by name.
 *
 * ```js
 * route.get('dest');
 * // ':base/:dirname/:basename/index.html'
 * ```
 *
 * @method get
 * @param {String} `key`
 * @api public
 */

Route.prototype.get = function (key) {
  return this.rte[key];
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

Route.prototype.stringify = function (name, context) {
  return permalinks(this.rte[name], _.extend({}, this.config, context));
};


/**
 * ## .generate (filepath, options)
 *
 * Generate a file path using the [generate](lib/generate.js) utility.
 *
 * ```js
 * route.generate ('a/b/c.hbs', {ext: '.html'})
 * //=> 'a/b/c.html'
 * ```
 *
 * @param {String} `filepath`
 * @param {Object} `options`
 * @api public
 */

Route.prototype.generate = function (filepath, options) {
  return generate(filepath, options);
};


/**
 * ## .parse
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
 * @param {Object} `options`
 * @api public
 */

Route.prototype.parse = function (filepath, name, options) {
  var parser = this.generate.bind(this);
  var rte = filepath;

  if (name && _.isObject(name)) {
    options = name;
    name = null;
  } else if (name && typeof name === 'string') {
    rte = name;
    parser = this.stringify.bind(this);
  }

  // parse the filepath into an object using the node.js path module
  var parsedPath = parsePath(filepath);

  // set `basename` to not include extension
  parsedPath.basename = parsedPath.name;

  // extend the context with config and additional options
  var context = _.extend(parsedPath, this.config, options);

  return _.extend(context, {
    dest: parser(rte, context)
  });
};


/**
 * ## .dest (filepath, options)
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
 * @param {Object} `options`
 * @api public
 */

Route.prototype.dest = function (filepath, name, options) {
  return this.parse(filepath, name, options).dest;
};


Route.prototype.Route = Route;