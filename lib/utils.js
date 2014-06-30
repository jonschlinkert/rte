var utils = module.exports = {};

utils.join = function() {
  var filepath = path.join.apply(path, arguments);
  return normalize(filepath);
};

utils.arrayify = function(arr) {
  return !Array.isArray(arr) ? [arr] : arr;
};