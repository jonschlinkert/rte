var permalinks = require('permalinks');
var parsePath = require('parse-filepath');
var _ = require('lodash');

var rename = require('./lib/rename');



/**
 * ## Route
 *
 * Simple-to-use module for managing server-side
 * routing to complement the node.js path module.
 *
 * **Example**
 *
 * Define a new instance of Route, optionally
 * specifying a default context object;
 *
 * ```js
 * var route = new Route({foo: 'bar'});
 * ```
 *
 * @class Route
 * @constructor
 * @extends EventEmitter
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
 * Sets a route by name.
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
 * Get the route that is stored in this model.
 *
 * ```js
 * route.get('dest');
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
 * ## .stringify (key, obj)
 *
 * Build a URL/filepath string from the properties on the given object.
 *
 * ```js
 * route.stringify (filepath, options)
 * ```
 *
 * @param {String} `key`
 * @param {Object} `context`
 * @api public
 */

Route.prototype.stringify = function (key, context) {
  return permalinks(this.rte[key], _.extend(this.config, context));
};


/**
 * ## .dest (filepath, options)
 *
 * Build a file path from the properties on the given object.
 *
 * ```js
 * route.dest (filepath, options)
 * ```
 *
 * @param {String} `filepath`
 * @param {Object} `options`
 * @api public
 */

Route.prototype.dest = function (filepath, options) {
  return rename(filepath, options);
};


/**
 * ## .parse
 *
 * Parse the filepath into an object using the node.js path module.
 *
 * ```js
 * route.parse (filepath, name, options)
 * ```
 *
 * @param {String} `filepath`
 * @param {String} `name`    The route to use
 * @param {Object} `options`
 * @api public
 */

Route.prototype.parse = function (filepath, name, options) {
  var parser = this.dest.bind(this);
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
  return _.extend(context, {dest: parser(rte, context)});
};


Route.prototype.Route = Route;