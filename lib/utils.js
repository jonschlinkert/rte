var url = require('url');
var path = require('path');
var _ = require('lodash');
var utils = module.exports = {};

var stripDelims = utils.stripDelims = function(str) {
  return str.replace(/^:|\/$/, '');
};

var propify = utils.propify = function(str) {
  return str.replace(/\//g, '|');
};

var propifyKeys = utils.propifyKeys = function(keys) {
  return keys.map(utils.propify);
};

var chopFirstSegment = utils.chopFirstSegment = function(url, arr) {
  var str = url.replace(/^\//, '');
  var len = arr.length;
  var segments = [url];
  arr.map(function(key, i) {
    if (new RegExp('^'+key).test(str)) {
      segments = [key];
      segments = segments.concat(_.compact(str.replace(key, '').split('/')));
    }
  });
  return segments;
};

function joinKeys(k, v) {
  var i = 0;
  return k.map(function(item) {
    var len = item.split('/').length;
    return v.splice(i, len).join('/')
    i++;
  });
}

// utils.parseUrl = function(str, pattern) {
//   var parsed = url.parse(str);
//   var pathname = parsed.pathname;

//   var ext = path.extname(pathname);
//   var base = path.basename(pathname, ext);

//   pathname = pathname.replace(ext, '').replace(base, '');

//   var values = _.compact(pathname.split('/'));
//   var keys = pattern.split('/').map(utils.stripDelims);
//   var joinedValues = joinKeys(keys, values);
//   // console.log(base)

//   // var props = utils.propifyKeys(keys);

//   // var len = values.length - keys.length + 1;

//   // if (len > 0) {
//   //   var end = _.last(values, len).join('/');
//   //   values = _.initial(values, len);
//   //   values = values.concat(end);
//   // }

//   var params = _.zipObject(keys, joinedValues);
//   return {
//     url: parsed,
//     params: params
//   };
// };


utils.parseUrl = function(str, pattern) {
  var parsed = url.parse(str);
  var pathname = parsed.pathname;

  var base = /[^\d]+/;
  var date = /\d{4}\D\d{2}\D\d{2}/;
  var d = pathname.match(date)[0].split(/\D/)

  return {
    base: base.exec(pathname)[0],
    year: d[0],
    month: d[1],
    date: d[2],
  };
};

