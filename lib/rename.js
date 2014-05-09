var path = require('path');

module.exports = function rename(dest, options) {
  options = options || {};
  var cwd = options.cwd || options.srcBase || process.cwd();

  var re = {
    first: /(\.[^\/]*)?$/,
    last: /(\.[^\/\.]*)?$/
  };

  dest = dest.replace(cwd, '');

  // Flatten path?
  if (options.flatten) {
    dest = options.basename;
  }

  // Change the extension?
  if (options.extDot) {
    dest = dest.replace(re[options.extDot], options.ext);
  }

  if (options.ext) {
    dest = dest.replace(options.filename, options.basename + options.ext);
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
};