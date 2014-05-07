var permalinks = require('permalinks');
var _ = require('lodash');

var utils = require('./lib/utils');



/**
 * Store
 *
 * Constructor for a simple prop-string data
 * model object.
 *
 * @param {String} type
 */

function Store(config) {
  this._config = _.extend(config || {});
  this._structure = {};
}


/**
 * .context (obj)
 *
 * Extend the context with the given object.
 *
 * @param {String} name
 * @param {String} str
 */

Store.prototype.context = function (obj) {
  this._context = _.extend(this._config, obj);
};


/**
 * .set (key, value)
 *
 * Set a prop-string to be stored by name.
 *
 * @param {String} name
 * @param {String} str
 */

Store.prototype.set = function (name, str) {
  this._structure[name] = str;
};


/**
 * .get (key)
 *
 * Get the structure that is stored in this model.
 *
 * @param {String} key
 */

Store.prototype.get = function (name) {
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

Store.prototype.stringify = function (name, context) {
  return permalinks(this._structure[name], context || this._context);
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

Store.prototype.parse = function (url, name) {
  return utils.parseUrl(url, this._structure[name]);
};



var route = new Store();

// Store some routes (structures)
route.set('default', ':base([^:year])/:year/:month/:day/:basename/index.html');
route.set('date', 'blog/posts/:year/:month/:day/:basename/index.html');
route.set('dateUrl', 'blog/posts/:year/:month/:day/:basename/section/index.:ext');
route.set('pretty', ':basename/index.html');
route.set('numbered', ':num-basename.:ext');

var result = route.parse('https://assemble.io/blog/posts/2014/05/04/foo/bar/baz/index.html?=foo', 'dateUrl');
var result = route.parse('https://assemble.io/blog/posts/2014-05-04/foo/bar/baz/index.html?=foo', 'dateUrl');
console.log(result);
