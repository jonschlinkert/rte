/*!
 * strings <https://github.com/assemble/strings>
 *
 * Copyright (c) 2014, Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT License
 *
 */

var path = require('path');
var Strings = require('strings');
var normalize = require('normalize-path');
var _ = require('lodash');

function join() {
  var filepath = path.join.apply(path, arguments);
  return normalize(filepath);
}

function arrayify(arr) {
  return !Array.isArray(arr) ? [arr] : arr;
}

module.exports = function strings(structure, context, options) {
  var args = arguments;
  if (_.isObject(structure) && args.length === 2) {
    options = context;
    context = structure;
    structure = options.structure || '';
  } else if (_.isObject(structure) && args.length === 1) {
    options = structure;
    context = options.context || {};
    structure = options.structure || '';
  }
  options = options || {};

  var strings = new Strings(context);
  strings.parser('path', [
    {
      pattern: /:dirname/,
      replacement: function() {
        return this.dirname;
      }
    },
    {
      pattern: /:basename/,
      replacement: function() {
        return this.basename;
      }
    },
    {
      pattern: /:extname/,
      replacement: function(pattern) {
        return this.extname;
      }
    },
    {
      pattern: /:ext/,
      replacement: function(pattern) {
        return this.ext;
      }
    },
    {
      pattern: /:(\w+)/g,
      replacement: function(match, prop) {
        return this[prop] || prop;
      }
    }
  ]);

  strings.parser('custom', options.parsers);

  // Process replacement patterns
  return strings.process(structure, ['path', 'custom'], context);
};
