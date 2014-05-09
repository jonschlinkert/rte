var permalinks = require('permalinks');
var parsePath = require('parse-filepath');
var _ = require('lodash');

var rename = require('./lib/rename');


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
  return permalinks(this._structure[name], context || this._config);
};


/**
 * .dest (filepath, options)
 *
 * Build a URL string from the properties on the
 * given object.
 *
 * @param {String} filepath
 * @param {Object} options
 */

Route.prototype.dest = function (filepath, options) {
  return rename(filepath, options);
};


/**
 * .parse (url, name)
 *
 * Build a URL string from the properties on the
 * given object.
 *
 * @param {String} filepath
 * @param {String} name     The structure to use
 * @param {Object} options
 */

Route.prototype.parse = function (filepath, name, options) {
  var parser = this.dest.bind(this);
  var structure = filepath;

  if (name && _.isObject(name)) {
    options = name;
    name = null;
  } else if (name && typeof name === 'string') {
    structure = name;
    parser = this.stringify.bind(this);
  }

  // parse the filepath into an object using the node.js path module
  var parsedPath = parsePath(filepath);

  // set `basename` to not include extension
  parsedPath.basename = parsedPath.name;

  // extend the context with config and additional options
  var context = _.extend(parsedPath, this._config, options);
  return _.extend(context, {dest: parser(structure, context)});
};



module.exports = Route;