var path = require('path');
var extname = require('./ext');


module.exports = function generate(dest, options) {
  options = options || {};
  options.extDot = options.extDot || 'first';
  var cwd = options.cwd || options.srcBase || process.cwd();

  var dirname = path.dirname(dest);
  var filename = path.basename(dest);
  var basename = path.basename(dest, path.extname(dest));
  var ext = extname(dest, options);
  dest = dest.replace(cwd, '');

  if (options.flatten) {
    dest = filename;
  }

  dest = dest.replace(filename, basename + ext);

  if (cwd && options.prefixBase) {
    dest = path.join(cwd, dest);
  }

  if (options.destBase) {
    dest = path.join(options.destBase, dest);
  }

  return dest.replace(/\\/g, '/');
};