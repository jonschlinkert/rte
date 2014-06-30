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
var isObject = require('isobject');


module.exports = function strings(structure, options) {
  if (isObject(structure) && arguments.length === 1) {
    options = structure;
    structure = options.structure || '';
  }
  options = options || {};

  var strings = new Strings(options);
  strings.parser('custom', options.parsers);
  strings.parser('path', [
    {
      pattern: /:\bdirname\b/,
      replacement: function() {
        return this.dirname;
      }
    },
    {
      pattern: /:\bbasename\b/,
      replacement: function() {
        return this.basename;
      }
    },
    {
      pattern: /:\bextname\b/,
      replacement: function() {
        return this.extname;
      }
    },
    {
      pattern: /:\bext\b/,
      replacement: function() {
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

  // Process replacement patterns
  return strings.process(structure, ['path', 'custom'], options);
};
