var path = require('path');
var permalinks = require('permalinks');
var parsePath = require('parse-filepath');
var _ = require('lodash');



/**
 * Route
 *
 * Constructor for a simple prop-string data
 * model object.
 *
 * @param {String} type
 */

function Route(config) {
  this._config = _.extend(config || {});
  this._structure = {};
}

/**
 * .set (key, value)
 *
 * Set a prop-string to be stored by name.
 *
 * @param {String} name
 * @param {String} str
 */

Route.prototype.set = function (name, str) {
  this._structure[name] = str;
};


/**
 * .get (key)
 *
 * Get the structure that is stored in this model.
 *
 * @param {String} key
 */

Route.prototype.get = function (name) {
  return this._structure[name];
};


/**
 * .build (key, obj)
 *
 * Build a URL string from the properties on the
 * given object.
 *
 * @param {String} name
 * @param {Object} context
 */

Route.prototype.stringify = function (name, context) {
  return permalinks(this._structure[name], context || this._context);
};


function rename(dest, options) {
  options = options || {};
  var cwd = options.cwd || options.srcBase || process.cwd();

  var pathSeparatorRe = /[\/\\]/g;
  var re = {
    first: /(\.[^\/]*)?$/,
    last: /(\.[^\/\.]*)?$/
  };

  // Flatten path?
  if (options.flatten) {
    dest = path.basename(dest);
  }

  // Change the extension?
  if (options.ext) {
    dest = dest.replace(re[options.extDot], options.ext);
  }

  // If cwd and prefixBase were specified, prefix cwd to dest
  if (cwd && options.prefixBase) {
    dest = path.join(cwd, dest);
  }

  // Join dest and destBase?
  if (options.destBase) {
    dest = path.join(options.destBase, dest);
  }

  return dest.replace(/\\/g, '/');
}



Route.prototype._calculateDest = function (filepath) {
  return _.extend(this._config, {dest: rename(filepath, this._config)});
};


/**
 * .parse (url, name)
 *
 * Build a URL string from the properties on the
 * given object.
 *
 * @param {String} url
 * @param {String} name  The structure to use
 */

Route.prototype.parse = function (filepath, options) {
  _.extend(this._config, options, parsePath(filepath));
  return this._calculateDest(filepath);
};

module.exports = Route;


var config = {
  flatten: true,
  prefixBase: false,
  cwd: 'blog/posts',
  extDot: 'last',
  destBase: '_gh_pages'
};

var route = new Route(config);

// // Route some routes (structures)
// route.set('default', ':base([^:year])/:year/:month/:day/:basename/index.html');
// route.set('date', 'blog/posts/:year/:month/:day/:basename/index.html');
// route.set('dateUrl', 'blog/posts/:year/:month/:day/:basename/section/index.:ext');
// route.set('pretty', ':basename/index.html');
// route.set('numbered', ':num-basename.:ext');

var result = route.parse('blog/posts/2014/05/04/foo/bar/baz/index.md.html');
console.log(route);

